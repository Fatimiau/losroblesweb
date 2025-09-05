import { NavLink } from "react-router-dom";

const linkStyle = ({ isActive }) => ({
  padding: "8px 12px",
  borderRadius: 8,
  textDecoration: "none",
  color: isActive ? "#fff" : "#cbd5e1",
  background: isActive ? "#0b5ed7" : "transparent",
  fontWeight: 600
});

export default function NavBar() {
  return (
    <nav style={{display:"flex", gap:12, margin:"16px 0"}}>
      <NavLink to="/" style={linkStyle} end>Inicio</NavLink>
      <NavLink to="/incidencias" style={linkStyle}>Incidencias</NavLink>
      <NavLink to="/pagos" style={linkStyle}>Pagos</NavLink>
      <NavLink to="/avisos" style={linkStyle}>Avisos</NavLink>
    </nav>
  );
}
