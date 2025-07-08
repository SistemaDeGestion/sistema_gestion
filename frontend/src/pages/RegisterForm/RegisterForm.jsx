import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registro } from '../../api.js'; // Importa funciones del api.js

function RegisterForm() {

  const [open, setOpen] = useState(true)  // Controla si el modal está abierto
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Almacena mensajes de error
  const navigate = useNavigate();

  const formRegistro = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    setErrorMessage(''); // Limpia cualquier mensaje de error previo
    try {
      // Intenta registrar al usuario con las credenciales proporcionadas
      const data = await registro(username, password);

      if (data.message === 'Usuario registrado exitosamente') {
        // Si el registro es exitoso, guarda los datos del usuario y navega al dashboard
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/dashboard');
      } else {
        // Si hay algún problema con el registro, muestra un mensaje de error
        setErrorMessage('Error en el registro');
      }
    } catch (error) {
      // Maneja cualquier error durante el proceso de registro
      console.error('Error en el registro:', error);
      setErrorMessage(error.response?.data?.message || 'Error al registrar el usuario');
    }
  };

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => { // <--- Nueva función
    setShowPassword(!showPassword);
  };

  return (
    <>
      {/* Modal de inicio de sesión */}
      <div open={open} onClose={setOpen} className="relative z-10">
        {/* Fondo del modal con imagen de fondo */}
        <div
          transition
          className="bg-[url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply')] 
               fixed inset-0 bg-cover transition-opacity duration-500 ease-in-out data-closed:opacity-0"
        />
        {/* Título del portal web*/}
        <div className="absolute ml-0 mt-20 text-4xl border-[#5bd6d6] border-t-8 
            sm:border-t-0 sm:border-l-90 sm:text-5xl sm:tracking-tight font-bold text-white text-center [writing-mode:vertical-lr] sm:[writing-mode:horizontal-tb] 
            sm:fixed sm:mt-90">¡Bienvenido!</div>

        {/* Contenedor principal del formulario */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              {/* Panel del formulario con animación de entrada/salida */}
              <div
                transition
                className="pointer-events-auto relative w-screen max-w-2xl transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
              >
                {/* Contenido del formulario */}
                <div className="p-5 flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                  <div className="relative mt-20  flex-1 px-4 sm:px-6">
                    {/* Logo de la empresa */}
                    <img
                      alt="Your Company"
                      src="../src/assets/react.svg"
                      className="mx-auto h-10 w-auto"
                    />
                    {/* Título del formulario */}
                    <h2 className="mt-10 mb-10 text-center text-2xl font-bold tracking-tight text-black">
                      Crear una cuenta
                    </h2>
                    {/* Formulario de inicio de sesión */}
                    <form /* onSubmit={formLogin} */>
                      {/* Campo de usuario */}
                      <label htmlFor="username" className="block text-lg font-medium text-gray-900">
                        Nombre de Usuario
                      </label>
                      <div className="mt-2">
                        <input
                          type="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                          autoComplete="username"
                          className="mb-5 block w-full rounded-md px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#5bd6d6] sm:text-sm/6"
                        />
                      </div>
                      {/* Campo de contraseña */}
                      <label htmlFor="password" className="block text-lg font-medium text-gray-900">
                        Contraseña
                      </label>
                       <div className="mt-2 relative"> {/* Añadido 'relative' para posicionar el icono */}
                        <input
                          type={showPassword ? 'text' : 'password'} // <--- Tipo de input dinámico
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          autoComplete="current-password"
                          className="mb-10 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#5bd6d6] sm:text-sm/6 pr-10" // Añadido padding a la derecha para el icono
                        />
                        {/* Icono de ojo */}
                        <button
                          type="button" // Importante: para evitar que el botón envíe el formulario
                          onClick={togglePasswordVisibility} // <--- Llama a la función al hacer clic
                          className="absolute inset-y-0 right-0 pr-3 flex items-center mb-10 text-gray-500 hover:text-gray-700"
                          style={{ top: '50%', transform: 'translateY(-50%)' }} // Centra verticalmente el icono
                        >
                          {showPassword ? (
                            // Icono de ojo abierto (visible)
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 hover:text-gray-900 cursor-pointer">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>

                          ) : (
                            // Icono de ojo cerrado (oculto)
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 hover:text-gray-900 cursor-pointer">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>
                          )}
                        </button>
                      </div>
                      {/* Botón de inicio de sesión */}
                      <button
                        type="submit"
                         onClick={formRegistro} 
                        className="cursor-pointer mt-8 flex w-full justify-center rounded-md  px-3 py-1.5 text-lg  font-semibold ">
                        Registrar
                      </button>
                      {/* Mensaje de error si existe */}
                       {errorMessage && <p className="error-message text-red-600 mt-1">{errorMessage}</p>} 
                    </form>
                    <p className="mt-10 text-center text-sm text-gray-500">
                      ¿Ya tienes una cuenta?{' '}
                      <a href="/" className="font-semibold text-[#5bd6d6] hover:text-[#1e2939]">
                        Iniciar sesión
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default RegisterForm;