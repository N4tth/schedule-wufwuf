import React from 'react';
import './App.css';
import logoG from './App.css'
import logo from './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>W u f  W u f</h1>
        </div>
        <div className='logo-container'>
          <img src={process.env.PUBLIC_URL + '/logo.jpeg'} className='logo' alt='logo'/>
        </div>
      </header>

      <div className='button-container'>
        <nav>
          <ul className='nav-links'>
            <li><a href='#'>Inicio</a></li> 
            <li><a href='#'>Catálogo</a></li> 
            <li><a href='#'>Tus citas</a></li> 
          </ul>
        </nav>
      </div>
      

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
      
      <footer className="footer">
        <p>Contacto: contact@wufwuf.com</p>
      </footer>
    </div>
  );
}

export default App;

