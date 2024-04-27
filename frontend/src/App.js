import React from 'react';
import logo from './logo.png'; 
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Cabecera */}
      <header className="App-header">
        <div>
          <h1>WufWuf</h1>
        </div>
        <img src={logo} className="logo" alt="logo" />
      </header>
      
      {/* Mensaje de inicio */}
      <p className="intro-message">¡Agenda tu cita y adopta tu peludito!</p>
      
      {/* Formulario */}
      <div className="form-container">
        {/* Campos de entrada */}
        <input type="date" className="input-field" placeholder="Fecha de la cita" />
        <input type="time" className="input-field" placeholder="Hora" />
        <input type="text" className="input-field" placeholder="ID de usuario" />
        <input type="tel" className="input-field" placeholder="Número de teléfono" />
        <input type="text" className="input-field" placeholder="Nombre" />
        <input type="text" className="input-field" placeholder="Apellido" />
        <input type="email" className="input-field" placeholder="Email" />
      </div>
      
      {/* Pie de página */}
      <footer className="footer">
        {/* Datos de contacto */}
        <p>Contacto: contact@wufwuf.com</p>
        {/* logo */}
        <img src={logo} className="logo" alt="logo" />
      </footer>
    </div>
  );
}

export default App;

