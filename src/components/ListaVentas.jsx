import React, { useEffect, useState } from 'react';
import { api } from '../api';
import EditarVenta from './EditarVenta';

function ListaVentas({ onAgregar }) {
  const [ventas, setVentas] = useState([]);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
  const [cargando, setCargando] = useState(true);

  const cargarVentas = () => {
    setCargando(true);
    api.get('/ventas').then(res => setVentas(res.data)).finally(() => setCargando(false));
  };

  useEffect(() => { cargarVentas(); }, []);

  const eliminarVenta = (id) => {
    if (window.confirm('¿Eliminar esta venta?')) {
      api.delete(`/ventas/${id}`).then(() => cargarVentas());
    }
  };

  if (ventaSeleccionada) {
    return <EditarVenta venta={ventaSeleccionada} onUpdate={() => { cargarVentas(); setVentaSeleccionada(null); }} onCancel={() => setVentaSeleccionada(null)} />;
  }

  return (
    <div className="container">
      <div className="header-actions">
        <h2>Ventas Registradas</h2>
        <button className="btn-primary" onClick={onAgregar}>+ Nueva Venta</button>
      </div>
      {cargando ? <p>Cargando...</p> : (
        <table className="tabla-simple">
          <thead>
            <tr>
              <th>ID</th><th>Estudiante</th><th>Producto</th><th>Cant.</th><th>Total</th><th>Fecha</th><th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map(v => (
              <tr key={v.id}>
                <td>#{v.id}</td>
                <td>{v.estudiante}</td>
                <td>{v.producto}</td>
                <td>{v.cantidad}</td>
                <td>${Number(v.total).toFixed(2)}</td>
                <td>{new Date(v.fecha).toLocaleDateString()}</td>
                <td>
                  <button className="btn-small" onClick={() => setVentaSeleccionada(v)}>Editar</button>
                  <button className="btn-small danger" onClick={() => eliminarVenta(v.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
export default ListaVentas;