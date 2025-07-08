
import React, { useState } from 'react'; // Importa React y lo necesario
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react' // Importa componentes de diálogo de Tailwind
import { useNavigate } from 'react-router-dom'; // Importa la función para manejar redirecciones y navegación dinámica
import { login } from '../../api.js'; // Importa funciones del api.js

function LoginForm() {

  const [open, setOpen] = useState(true)  // Controla si el modal está abierto
  const [username, setUsername] = useState(''); // Almacena el nombre de usuario
  const [password, setPassword] = useState(''); // Almacena la contraseña
  const navigate = useNavigate(); // Permite cambiar de página dinámicamente
  const [errorMessage, setErrorMessage] = useState(''); // Almacena mensajes de error

  // Función para manejar el envío del formulario
  const formLogin = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    setErrorMessage(''); // Limpia cualquier mensaje de error previo
    try {
      // Intenta iniciar sesión con las credenciales proporcionadas
      const data = await login(username, password);

      if (data.message === 'Inicio de sesión exitoso') {
        // Si el inicio de sesión es exitoso, guarda los datos del 
        // usuario y navega al dashboard
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/dashboard');
      } else {
        // Si las credenciales son inválidas, muestra un mensaje de error
        setErrorMessage('Credenciales inválidas');
      }
    } catch (error) {
      // Maneja cualquier error durante el proceso de inicio de sesión
      console.error('Error en el inicio de sesión:', error);
      setErrorMessage('Usuario o contraseña incorrectos');
    }
  };

  return (
    <>
      {/* Modal de inicio de sesión */}
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        {/* Fondo del modal con imagen de fondo */}
        <DialogBackdrop
          transition
          className="bg-[url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply')] 
           fixed inset-0 bg-cover transition-opacity duration-500 ease-in-out data-closed:opacity-0"
        />
        {/* Título del portal web*/}
        <DialogTitle className="absolute ml-0 mt-20 text-3xl border-[#5bd6d6] border-t-8 
        sm:border-t-0 sm:border-l-90 sm:text-5xl sm:tracking-tight font-bold text-white text-center [writing-mode:vertical-lr] sm:[writing-mode:horizontal-tb] 
        sm:fixed sm:mt-90">¡Bienvenido!</DialogTitle>

        {/* Contenedor principal del formulario */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              {/* Panel del formulario con animación de entrada/salida */}
              <DialogPanel
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
                      Inicia sesión en tu cuenta
                    </h2>
                    {/* Formulario de inicio de sesión */}
                    <form onSubmit={formLogin}>
                      {/* Campo de usuario */}
                      <label htmlFor="username" className="block text-lg font-medium text-gray-900">
                        Usuario
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
                      <div className="mt-2">
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          autoComplete="current-password"
                          className="mb-10 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#5bd6d6] sm:text-sm/6"
                        />
                      </div>
                      {/* Botón de inicio de sesión */}
                      <button
                        type="submit"
                        onClick={formLogin}
                        className="cursor-pointer mt-8 flex w-full justify-center rounded-md  px-3 py-1.5 text-lg  font-semibold ">
                        Ingresar
                      </button>
                      {/* Mensaje de error si existe */}
                      {errorMessage && <p className="error-message text-red-600 mt-1">{errorMessage}</p>}
                    </form>
                    <p className="mt-10 text-center text-sm text-gray-500">
                    ¿Eres nuevo?{' '}
                      <a href="/register" className="font-semibold text-[#5bd6d6] hover:text-[#1e2939]">
                      Regístrate ahora y obtén una prueba gratuita de 14 días
                      </a>
                    </p>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
export default LoginForm;