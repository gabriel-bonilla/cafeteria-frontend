import { useState } from 'react';
import ListaVentas from './components/ListaVentas';
import FormularioVenta from './components/FormularioVenta';
import './App.css';

function App() {
  const [vista, setVista] = useState('lista');

  return (
    <div className="app">
      <header className="header">
        <h1> Cafetería Escolar</h1>
      </header>
      <main className="main">
        {vista === 'lista' && <ListaVentas onAgregar={() => setVista('formulario')} />}
        {vista === 'formulario' && <FormularioVenta onSaved={() => setVista('lista')} onCancel={() => setVista('lista')} />}
      </main>
      <footer className="footer">
        <p>© 2026 INFRAMEN - Proyecto Final</p>
      </footer>
    </div>
  );
}
export default App;