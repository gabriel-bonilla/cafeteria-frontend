import React, { useState, useEffect } from 'react';
import { api } from '../api';

function FormularioVenta({ onSaved, onCancel }) {
  const [formData, setFormData] = useState({ estudiante_id: '', producto_id: '', cantidad: 1, fecha: new Date().toISOString().split('T')[0] });
  const [estudiantes, setEstudiantes] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    api.get('/estudiantes').then(res => setEstudiantes(res.data));
    api.get('/productos').then(res => setProductos(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/ventas', {
      estudiante_id: Number(formData.estudiante_id), producto_id: Number(formData.producto_id),
      cantidad: Number(formData.cantidad), fecha: formData.fecha
    }).then(() => { alert('✅ Venta registrada'); onSaved(); });
  };

  return (
    <div className="card">
      <h2>Nueva Venta</h2>
      <form onSubmit={handleSubmit} className="form-simple">
        <label>Estudiante:
          <select value={formData.estudiante_id} onChange={(e) => setFormData({...formData, estudiante_id: e.target.value})} required>
            <option value="">Seleccione</option>
            {estudiantes.map(e => <option key={e.id} value={e.id}>{e.nombre} ({e.grupo})</option>)}
          </select>
        </label>
        <label>Producto:
          <select value={formData.producto_id} onChange={(e) => setFormData({...formData, producto_id: e.target.value})} required>
            <option value="">Seleccione</option>
            {productos.map(p => <option key={p.id} value={p.id}>{p.nombre} - ${p.precio}</option>)}
          </select>
        </label>
        <label>Cantidad: <input type="number" min="1" value={formData.cantidad} onChange={(e) => setFormData({...formData, cantidad: e.target.value})} required /></label>
        <label>Fecha: <input type="date" value={formData.fecha} onChange={(e) => setFormData({...formData, fecha: e.target.value})} required /></label>
        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={onCancel}>Cancelar</button>
          <button type="submit" className="btn-primary">Guardar</button>
        </div>
      </form>
    </div>
  );
}
export default FormularioVenta;