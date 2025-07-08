import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginForm from './pages/LoginForm/LoginForm';
import RegisterForm from './pages/RegisterForm/RegisterForm';
import Dashboard from './pages/Dashboard/Dashboard';



function App() {
  return (
    // Configura el enrutador 
    <Router>
      {/* Define las rutas*/}
      <Routes>
        {/* Ruta para la página de inicio login*/}
        <Route path="/" element={<LoginForm />} />
        {/* Ruta para Registrarse */}
        <Route path='/register' element={<RegisterForm />} />
        {/* Ruta para el dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Ruta para el chatbot */}
      </Routes>     
    </Router>

    
  );
}

export default App;

