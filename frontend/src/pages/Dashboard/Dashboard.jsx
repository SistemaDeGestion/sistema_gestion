import React, { useState, useEffect } from 'react'; // Importa React y lo necesario
import Swal from 'sweetalert2' // Importa SweetAlert2 para mostrar alertas
import { TrashIcon, EyeIcon, PencilIcon } from '@heroicons/react/24/outline'; // Importa iconos de Heroicons
import { ArrowRightStartOnRectangleIcon, XMarkIcon } from '@heroicons/react/20/solid'; // Importa más iconos
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react' // Importa componentes de diálogo de Tailwind
import { getProyectos, agregarProyecto, editarProyecto, eliminarProyecto } from '../../api.js'; // Importa funciones del api.js
import ChatBotButton from '../ChatBotButton/ChatBotButton.jsx';
import ChatBotModal from '../ChatbotModal/ChatbotModal.jsx';

function Dashboard() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const DataUsuario = JSON.parse(localStorage.getItem('user')) // Obtiene datos del usuario del localStorage
  const [modalAbierto, modalAbriendo] = useState(false); // Para controlar la apertura del modal de agregar y editar un proyecto
  const [proyectoEditando, setProyectoEditando] = useState(null); // Para el proyecto que se está editando
  const [titulo, setTitulo] = useState(''); // Para el título del proyecto
  const [descripcion, setDescripcion] = useState(''); // Para la descripción del proyecto
  const [estatus, setEstatus] = useState('activo'); // Para el estatus del proyecto
  const [proyectos, setProyectos] = useState([]); // Para almacenar la lista de proyectos
  const [openModal, setOpenModal] = useState(false); // Controla la apertura del modal que visualiza cada proyecto
  const [loading, setLoading] = useState(true); // Indica si está cargando la pagina
  const [error, setError] = useState(null); // Para manejar errores

  function BotonAgregar() {
    // Muestra el botón "Agregar" solo si el usuario es administrador
    if (DataUsuario.rol === 'admin') {
      return <button onClick={() => abrirModal()}
        type="button"
        className='flex space-x-6 rounded-md  px-3 py-2 text-sm font-semibold shadow-xs cursor-pointer'>
        Agregar
      </button>;
    }
  };

  function Optiones({ proyecto }) {
    // Muestra las opciones de cada proyecto según el rol del usuario
    if (DataUsuario.rol === 'admin') {
      return <div className="flex items-center">
        { /* Botones para editar el proyecto */}
        <span className="ml-2 sm:block">
          <a
            onClick={() => abrirModal(proyecto)}
            type="button"
            className="">
            <PencilIcon aria-hidden="true" className=" -ml-0.5 size-5 text-[#5bd6d6] hover:text-gray-900 cursor-pointer" />
          </a>
        </span>
        {/* Botones para ver */}
        <span className="ml-2 sm:block">
          <a
            type="button"
            onClick={() => abrirModalVista(proyecto)}
            className="">
            <EyeIcon aria-hidden="true" className="-ml-0.5 size-5 text-[#5bd6d6] hover:text-gray-900 cursor-pointer" />
          </a>
        </span>
        {/* Botones para eliminar */}
        <span className="ml-2 sm:block">
          <a
            type="button"
            onClick={() => proyectEliminar(proyecto.ID)}
            className="">
            <TrashIcon aria-hidden="true" className=" -ml-0.5 size-5 text-[#5bd6d6] hover:text-gray-900 cursor-pointer" />
          </a>
        </span>
      </div>
    } else {
      return <div className="flex items-center">
        {/* Solo botón para ver proyectos para usuarios no administrador */}
        <span className="mr-3 sm:block">
          <a
            type="button"
            onClick={() => abrirModalVista(proyecto)}
            className="">
            <EyeIcon aria-hidden="true" className="-ml-0.5 size-5 text-[#5bd6d6] hover:text-gray-900 cursor-pointer" />
          </a>
        </span>
      </div>
    }
  };

  const abrirModal = (proyecto = null) => {
    // Abre el modal para agregar o editar un proyecto
    if (proyecto) {
      // Si se pasa un proyecto, se está editando
      setProyectoEditando(proyecto);
      setTitulo(proyecto.titulo);
      setDescripcion(proyecto.descripcion);
      setEstatus(proyecto.estatus);
    } else {
      // Si no se pasa un proyecto, se está agregando uno nuevo
      setProyectoEditando(null);
      setTitulo('');
      setDescripcion('');
      setEstatus('activo');
    }
    modalAbriendo(true);
  };

  const formModal = async (e) => {
    e.preventDefault();
    // Maneja el envío del formulario para agregar o editar un proyecto
    try {
      let proyectoActualizado;

      if (proyectoEditando && proyectoEditando.ID) {
        // Si hay un proyecto editándose, actualiza el proyecto existente
        proyectoActualizado = await editarProyecto(proyectoEditando.ID,
          { titulo, descripcion, estatus })
      } else {
        // Si no, agrega un nuevo proyecto
        proyectoActualizado = await agregarProyecto(titulo, descripcion, estatus)
      }

      console.log("Proyecto actualizado")
      console.log(proyectoActualizado)
      if (proyectoActualizado && proyectoActualizado.message) {
        // Actualiza el proyecto en la lista de proyectos
        const IndexProyecto = proyectos.findIndex(e => e.ID === proyectoEditando.ID)
        proyectos[IndexProyecto] = {
          ID: proyectoEditando.ID, titulo, descripcion,
          estatus, fecha_creacion: proyectoEditando.fecha_creacion
        }
        Swal.fire({
          title: "Proyecto editado exitosamente",
          icon: "success",
          draggable: true
        });
      } else {
        // Agrega el nuevo proyecto a la lista
        setProyectos(proyectos => [...proyectos, proyectoActualizado]);
        console.log(proyectos)
        Swal.fire({
          title: "Proyecto agregado exitosamente",
          icon: "success",
          draggable: true
        });
      }
      // Limpia el formulario y cierra el modal     
      modalAbriendo(false);
      setProyectoEditando(null);
      setTitulo('');
      setDescripcion('');
      setEstatus('activo');
    } catch (error) {
      console.error('Error al procesar el proyecto:', error);
      Swal.fire({
        title: "No se logró procesar el proyecto, intente nuevamente",
        icon: "error",
        draggable: true
      });
    }
  };

  const abrirModalVista = (proyecto) => {
    // Abre el modal de vista para ver los detalles del proyecto
    setTitulo(proyecto.titulo);
    setDescripcion(proyecto.descripcion);
    setEstatus(proyecto.estatus);
    setOpenModal(true);
  };

  const proyectEliminar = async (ID) => {
    // Elimina un proyecto
    try {
      console.log("ID delete", ID)
      await eliminarProyecto(ID);
      setProyectos(proyectos.filter(proyecto => proyecto.ID !== ID));
      Swal.fire({
        title: "Se elimino el proyecto exitosamente",
        icon: "success",
        draggable: true
      });
    } catch (error) {
      console.error('Error al eliminar el proyecto:', error);
      Swal.fire({
        title: "Error al eliminar el proyecto",
        icon: "error",
        draggable: true
      });
    }
  };

  const ClasesEstatus = (estatus) => {
    // Devuelve estilos basados en el estatus del proyecto
    switch (estatus) {
      case 'activo':
        return 'bg-purple-50 text-purple-700 ring-purple-700/20';
      case 'pendiente':
        return 'bg-yellow-50 text-yellow-800 ring-yellow-600/20';
      case 'completado':
        return 'bg-green-50 text-green-700 ring-green-600/20';
      case 'cancelado':
        return 'bg-red-50 text-red-700 ring-red-600/20';
      default:
        return 'bg-gray-50 text-gray-700 ring-gray-600/20';
    }
  }

  useEffect(() => {
    // Carga los proyectos cuando el componente se está agregando por primera vez.
    const panelProyect = async () => {
      try {
        const data = await getProyectos();
        setProyectos(data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar proyectos');
        alert('Error al cargar proyectos')
        setLoading(false);
      }
    };

    panelProyect();
  }, []);

  if (loading) return <div className="h-screen flex justify-center items-center">
    <img src="./public/loading.gif" alt="Cargando..." className=" max-w-2xs" />
  </div>
    ;
  if (error) return <div>{error}</div>;

  return (
    <>
      <header className="relative bg-white">
        {/* Barra superior con mensaje de bienvenida */}
        <p className="flex h-10 items-center justify-center bg-[#5bd6d6] px-4 
        text-xl font-medium text-gray-800 sm:px-6 lg:px-8">
          Bienvenid@ {DataUsuario.nombre_usuario}
        </p>

        {/* Barra de navegación principal */}
        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="#">
                  <span className="sr-only">Your Company</span>
                  <img
                    alt=""
                    src="../src/assets/react.svg"
                    className="h-8 w-auto"
                  />
                </a>
              </div>

              {/* Título del panel */}
              <p className="lg:ml-3 text-2xl/7 font-semibold 
              text-gray-900">Panel de Proyectos</p>

              {/* Botón de salir */}
              <div className="ml-auto flex items-center">
                <div className=" flex lg:justify-end ">
                  <a href="/" className="text-wrap font-semibold text-gray-900">
                    Salir
                  </a>
                  <ArrowRightStartOnRectangleIcon className="h-6 p-1" />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Panel */}
      <div className='p-[10%]'>
        <div className='p-8 border-1 rounded-xl border-gray-200 shadow-[0px_11px_20px_5px_rgba(0,0,0,0.2)]'>
          <div className="justify-items-end border-b border-gray-200 h-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Botón para agregar un nuevo proyecto */}
            {BotonAgregar()}

            {/* Modal para agregar o editar un proyecto */}
            <Dialog open={modalAbierto} onClose={modalAbriendo} className="relative z-10">
              {/* Fondo oscuro del modal */}
              <DialogBackdrop
                transition
                className="fixed inset-0 hidden bg-gray-500/75 transition-opacity 
                data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out 
                data-leave:duration-200 data-leave:ease-in md:block"
              />
              {/* Contenedor del modal */}
              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex md:min-h-full  justify-center md:items-center md:px-2 lg:px-4">
                  {/* Panel del modal */}
                  <DialogPanel
                    transition
                    className="flex transform text-left text-base transition data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in md:my-8 md:max-w-2xl md:px-4 data-closed:md:translate-y-0 data-closed:md:scale-95 lg:max-w-4xl"
                  >
                    {/* Contenido del modal */}
                    <div className="relative flex items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8  lg:p-8">
                      <div className="flex justify-around w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                        <div className="sm:col-span-8 lg:col-span-7">
                          <div className='border-b border-gray-200'>
                            <h2 className="mb-4 text-xl font-semibold text-gray-900 sm:pr-12">
                              {proyectoEditando ? 'Editar Proyecto' : 'Agregar nuevo Proyecto'}</h2>
                          </div>

                          {/* Formulario del proyecto */}
                          <section aria-labelledby="information-heading" className="mt-3">
                            <form onSubmit={formModal}>
                              {/* Campo de título */}
                              <div className="mt-3 ">
                                <div className="sm:col-span-4">
                                  <label htmlFor="titulo" className="mb-3 mt-3 block text-base font-medium text-gray-900">
                                    Título
                                  </label>
                                  <div className="mt-2">
                                    <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-[#5bd6d6]">
                                      <input
                                        id="titulo"
                                        type="any"
                                        value={titulo}
                                        onChange={(e) => setTitulo(e.target.value)}
                                        placeholder="ej:sistema de gestion"
                                        required
                                        className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* Campo de descripción */}
                              <div className="col-span-full">
                                <label htmlFor="descripcion" className="text-base mt-3 mb-3 block font-medium text-gray-900">
                                  Descripción
                                </label>
                                <div className="mt-2">
                                  <textarea
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                    placeholder="Describe el proyecto"
                                    required
                                    rows={3}
                                    className="mb-3 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#5bd6d6] sm:text-sm/6"
                                  />
                                </div>
                              </div>
                              {/* Selección de estatus */}
                              <fieldset>
                                <legend className="mb-3 block text-base font-medium text-gray-900">Estatus</legend>
                                {['activo', 'pendiente', 'completado', 'cancelado'].map((option) => (
                                  <label key={option} class="peer-checked/activo:text-sky-500 ml-3">
                                    <input
                                      type="radio"
                                      name="estatus"
                                      value={option}
                                      checked={estatus === option}
                                      onChange={(e) => setEstatus(e.target.value)}
                                      required
                                    />
                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                  </label>
                                ))}
                              </fieldset>
                            </form>

                            {/* Botones de acción */}
                            <div className="mt-6 flex items-center justify-end gap-x-6">
                              <button onClick={() => modalAbriendo(false)} type="button" className="rounded-md px-3 py-2 cursor-pointer text-sm font-semibold">
                                Cancelar
                              </button>
                              <button
                                onClick={formModal}
                                type="submit"
                                className="rounded-md px-3 py-2 text-sm font-semibold ">
                                {proyectoEditando ? 'Editar' : 'Guardar'}
                              </button>
                            </div>
                          </section>
                        </div>
                      </div>
                    </div>
                  </DialogPanel>
                </div>
              </div>
            </Dialog>
          </div>

          {/* Lista de proyectos */}
          <ul role="list" className="divide-y-2 divide-gray-100 border-b border-gray-200">
            {/* Convierte cada proyecto en un elemento de lista */}
            {proyectos.map(proyecto => (
              <li key={proyecto.id} className="flex gap-x-6 py-5 justify-between">
                {/* Contenedor para la imagen y detalles del proyecto */}
                <div className="flex min-w-0 gap-x-4">
                  {/* Imagen de perfil */}
                  <img alt="" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" className="size-12 flex-none rounded-full bg-gray-50" />
                  <div className="min-w-0 flex-auto">
                    {/* Título del proyecto */}
                    <p className=" font-semibold text-gray-900">{proyecto.titulo}</p>
                    {/* Descripción del proyecto */}
                    <p className="mt-1 mb-1 truncate  text-gray-500">{proyecto.descripcion}</p>
                    {/* Etiqueta de estatus del proyecto */}
                    <span className={`mt-2 inline-flex items-center rounded-md px-2 py-1 text-sm font-medium ring-1 ring-inset ${ClasesEstatus(proyecto.estatus)}`}>
                      {proyecto.estatus}
                    </span>
                  </div>
                </div>
                {/* Opciones del proyecto (botones de editar, ver y eliminar) */}
                {Optiones({ proyecto })}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal para mostrar detalles del proyecto */}
      <Dialog open={openModal} onClose={setOpenModal} className="relative z-10">
        {/* Fondo oscuro del modal */}
        <DialogBackdrop
          transition
          className="fixed inset-0 hidden bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in md:block"
        />
        {/* Contenedor principal del modal */}
        <div className="fixed inset-0 flex justify-center z-50">
          {/* Centrado del contenido del modal */}
          <div className="flex md:min-h-full md:items-center md:px-2 lg:px-4">
            {/* Panel del diálogo con animaciones */}
            <DialogPanel
              transition
              className="flex transform text-left text-base transition data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in md:my-8 md:max-w-2xl md:px-4 data-closed:md:translate-y-0 data-closed:md:scale-95 lg:max-w-4xl"
            >
              {/* Contenido del modal */}
              <div className="bg-white shadow-xl w-150 h-90 p-10 overflow-y-auto">
                {/* Botón para cerrar el modal */}
                <a
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="absolute top-4 right-4 mr-5 cursor-pointer text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8">
                  <span className="sr-only">Close</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </a>
                {/* Sección de información */}

                <div className="col-span-full text">
                  <p htmlFor="descripcion" className="text-base mt-15 mb-3 block font-bold text-gray-900">
                    {titulo}
                  </p>
                  <div>
                    <p>{descripcion}</p>
                  </div>
                  {/* Etiqueta de estatus del proyecto */}
                  <div className='mt-5'>
                    <span className={`mt-2 inline-flex items-center rounded-md px-2 py-1 text-sm font-medium ring-1 ring-inset ${ClasesEstatus(estatus)}`}>
                      {estatus}
                    </span>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      {/* Boton del Chatbot */}
      <ChatBotButton onClick={toggleModal} />
      <ChatBotModal isOpen={isModalOpen} onClose={toggleModal} />
    </>
  )
};

export default Dashboard;



