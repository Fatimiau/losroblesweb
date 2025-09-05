// src/pages/Incidencias.jsx
import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "lr_incidencias";
const categorias = ["Agua","Electricidad","Seguridad","Áreas comunes","Otros"];
const estados = ["Nueva","En progreso","Cerrada"];

function load(){ try{ return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }catch{ return []; } }
function save(list){ localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); }

export default function Incidencias(){
  const [form, setForm] = useState({ titulo:"", categoria:"", detalle:"" });
  const [items, setItems] = useState(load());
  const [filtro, setFiltro] = useState({ estado:"", categoria:"" });

  useEffect(()=>{ save(items); }, [items]);
  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    if(!form.titulo.trim()) return;
    const nuevo = {
      id: crypto.randomUUID(),
      titulo: form.titulo.trim(),
      categoria: form.categoria || "Otros",
      detalle: form.detalle.trim(),
      estado: "Nueva",
      creado: Date.now()
    };
    setItems([nuevo, ...items]);
    setForm({ titulo:"", categoria:"", detalle:"" });
  };
  const cambiarEstado = (id) => {
    setItems(prev => prev.map(it => it.id===id
      ? { ...it, estado: it.estado==="Nueva" ? "En progreso" : it.estado==="En progreso" ? "Cerrada" : "Nueva" }
      : it
    ));
  };
  const filtrados = useMemo(()=>(
    items.filter(it =>
      (!filtro.estado || it.estado===filtro.estado) &&
      (!filtro.categoria || it.categoria===filtro.categoria)
    )
  ), [items, filtro]);

  return (
    <div className="grid grid-2">
      <section className="card">
        <h2 className="section">Registrar incidencia</h2>
        <form onSubmit={onSubmit} className="row">
          <input className="input" name="titulo" placeholder="Título (ej. Fuga de agua)" value={form.titulo} onChange={onChange} />
          <select className="select" name="categoria" value={form.categoria} onChange={onChange}>
            <option value="">Categoría</option>
            {categorias.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <textarea name="detalle" rows={4} placeholder="Describe brevemente la incidencia…" value={form.detalle} onChange={onChange} />
          <button className="btn" type="submit">Guardar incidencia</button>
        </form>
      </section>

      <section className="card">
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <h2 className="section" style={{margin:0}}>Incidencias registradas</h2>
          <div style={{display:"flex", gap:8}}>
            <select className="select" value={filtro.estado} onChange={e=>setFiltro({...filtro, estado:e.target.value})}>
              <option value="">Estado: Todos</option>
              {estados.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select className="select" value={filtro.categoria} onChange={e=>setFiltro({...filtro, categoria:e.target.value})}>
              <option value="">Categoría: Todas</option>
              {categorias.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {filtrados.length===0 && <p style={{color:"var(--muted)"}}>No hay incidencias aún.</p>}

        <ul className="list">
          {filtrados.map(it=>(
            <li key={it.id} className="item">
              <h4>{it.titulo}</h4>
              <div className="meta">
                <span className="badge">{it.categoria}</span>
                <span className={`badge ${it.estado==="Nueva" ? "warn" : it.estado==="Cerrada" ? "ok" : ""}`}>{it.estado}</span>
                <span>{new Date(it.creado).toLocaleString()}</span>
              </div>
              {it.detalle && <p style={{marginTop:8}}>{it.detalle}</p>}
              <div style={{marginTop:10}}>
                <button className="btn" onClick={()=>cambiarEstado(it.id)}>Cambiar estado</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
