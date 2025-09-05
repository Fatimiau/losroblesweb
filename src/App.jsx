import { Routes, Route, NavLink } from "react-router-dom";
import Incidencias from "./pages/Incidencias";

function Home(){
  return (
    <div className="card">
      <h2 className="section">Bienvenido</h2>
      <p>Esta es la plataforma de gestión para <strong>Residencial Los Robles</strong>. Desde aquí podrás registrar incidencias, consultar pagos y revisar avisos.</p>
      <div className="meta" style={{marginTop:12}}>
        <span className="badge ok">Sprint 1 activo</span>
        <span className="badge">MVP</span>
      </div>
    </div>
  );
}
function Pagos(){
  return (
    <div className="card">
      <h2 className="section">Pagos</h2>
      <p>Próximamente: consulta de saldos y estatus de pago por vivienda.</p>
    </div>
  );
}
function Avisos(){
  return (
    <div className="card">
      <h2 className="section">Avisos</h2>
      <ul className="list">
        <li className="item">
          <h4>Mantenimiento de bombas</h4>
          <p>Lunes 10:00–12:00 — Podrían presentarse bajas de presión.</p>
          <div className="meta"><span className="badge warn">Aviso</span><span>Comité</span></div>
        </li>
        <li className="item">
          <h4>Junta de comité</h4>
          <p>Viernes 19:00 — Salón de usos múltiples.</p>
          <div className="meta"><span className="badge">Comunidad</span><span>Presencial</span></div>
        </li>
      </ul>
    </div>
  );
}

export default function App(){
  return (
    <div className="container">
      <header className="header">
        <h1>Residencial Los Robles</h1>
        <p>Plataforma de Gestión Comunitaria</p>

        <nav className="nav">
          <NavLink to="/" className={({isActive})=> isActive ? "active" : undefined} end>Inicio</NavLink>
          <NavLink to="/incidencias" className={({isActive})=> isActive ? "active" : undefined}>Incidencias</NavLink>
          <NavLink to="/pagos" className={({isActive})=> isActive ? "active" : undefined}>Pagos</NavLink>
          <NavLink to="/avisos" className={({isActive})=> isActive ? "active" : undefined}>Avisos</NavLink>
        </nav>
      </header>

      <main style={{marginTop:16}} className="grid">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/incidencias" element={<Incidencias />} />
          <Route path="/pagos" element={<Pagos />} />
          <Route path="/avisos" element={<Avisos />} />
        </Routes>
      </main>

      <footer style={{marginTop:24, color:"var(--muted)", fontSize:13}}>
        © 2025 Residencial Los Robles · Sprint 1
      </footer>
    </div>
  );
}
