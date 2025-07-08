import axios from 'axios'; // biblioteca para realizar solicitudes HTTP

// URL base de la API
const API_URL = "http://localhost:5000"

// Función para iniciar sesión
export const login = async (nombre_usuario, clave) => {
  try {
    // Envía una solicitud POST a la ruta de login
    const response = await axios.post(`${API_URL}/login`, { nombre_usuario, clave });
    return response.data;
  } catch (error) {
    console.error('Error de inicio de sesión:', error);
    throw error;
  }
};

// Función para registrar usuarios
export const registro = async (nombre_usuario, clave) => {
  try {
    // Envía una solicitud POST a la ruta de registro
    // No necesitamos enviar el rol desde el frontend
    const response = await axios.post(`${API_URL}/registro`, { nombre_usuario, clave });
    return response.data;
  } catch (error) {
    console.error('Error en el registro:', error);
    throw error;
  }
};


// Función para obtener todos los proyectos
export const getProyectos = async () => {
  try {
    // Envía una solicitud GET a la ruta de visualización
    const response = await axios.get(`${API_URL}/visualizar`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener proyectos:', error);
    throw error;
  }
};

// Función para agregar un nuevo proyecto
export const agregarProyecto = async (titulo, descripcion, estatus) => {
  try {
    // Envía una solicitud POST a la ruta de agregar
    const response = await axios.post(`${API_URL}/agregar`, { titulo, descripcion, estatus });
    return response.data;
  } catch (error) {
    console.error('Error al crear proyecto:', error);
    throw error;
  }
};

// Función para editar un proyecto existente
export const editarProyecto = async (id, { titulo, descripcion, estatus }) => {
  try {
    // Envía una solicitud PUT a la ruta de editar
    const response = await axios.put(`${API_URL}/editar/${id}`, { titulo, descripcion, estatus });
    return response.data;
  } catch (error) {
    console.error('Error al editar el proyecto:', error);
    throw error;
  }
};

// Función para eliminar un proyecto
export const eliminarProyecto = async (id) => {
  try {
  // Envía una solicitud DELETE a la ruta de eliminar
    const response = await axios.delete(`${API_URL}/eliminar/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el proyecto:', error);
    throw error;
  }
};

// Función para utilizar el chatbot
export const chatBot = async (message) => {
  try {
    // Envía una solicitud POST a la ruta del chat
    const response = await axios.post(`${API_URL}/chat`, { message });
    return response.data.reply;
  } catch (error) {
    console.error('Error al comunicarse con el chatbot:', error);
    throw error;
  }
};