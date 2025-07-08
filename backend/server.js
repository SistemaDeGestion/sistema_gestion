const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");


// Configuracion de IA Gemini
const genAI = new GoogleGenerativeAI("AIzaSyBm4v49gRQ-cFVO9XQpsnRF5RXakBLzR1Y");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Lista de palabras clave
const Keywords = ['Proyecto', 'proyectos', 'Planificación', 'Cronograma', 'Presupuesto', 'Recursos', 'Riesgos', 'Stakeholders', 'Metodologías ágiles', 'Scrum', 'Kanban', 'Gantt', 'Hitos', 'Entregables', 'KPI', 'Alcance', 'Calidad', 'Comunicación', 'Equipo', 'Liderazgo', 'Seguimiento', 'Informes', 'Software de gestión', 'PMO', 'Certificaciones', 'Gestión del cambio', 'Cierre de proyecto', 'Lecciones aprendidas', 'Análisis de valor ganado', 'WBS (Estructura de desglose del trabajo)', 'Gestión de conflictos', 'Priorización'];

// Función para filtrar respuestas
function filterAnswer(answer) {
    for (const palabra of Keywords) {
        if (answer.toLowerCase().includes(palabra.toLowerCase())) {
            return answer;
        }
    }
    return null;
}
// Función para generar texto
async function generateText(prompt) {
    const result = await model.generateContent(prompt);
    const rawText = await result.response.text();

    // Aplicar el formateo a la respuesta
    const formattedText = rawText
        // Maneja los encabezados (## y ###)
        .replace(/^(#{2,3})\s+(.+)$/gm, '\n\n$1 $2\n')
        // Maneja listas con viñetas o guiones
        .replace(/^(\s*[-•])\s+(.+)$/gm, '\n$1 $2')
        // Asegura espaciado entre párrafos
        .replace(/\n{2,}/g, '\n\n')
        // Añade un salto de línea al final de cada párrafo que no sea un encabezado o lista
        .replace(/(.+)(?!\n)$/gm, '$1\n')
        // Elimina espacios en blanco al inicio y final
        .trim();


    // Filtrar la respuesta
    const isRelevant = filterAnswer(formattedText) !== null;

    return {
        text: formattedText,
        isRelevant: isRelevant
    };
}



// Inicializar la aplicación Express
const app = express();
const port = 5000;

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

// Configuración de la conexión a MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'Proyecto',
    password: '',
    database: 'bd_proyect'
});

// Conectar a la base de datos
db.connect(err => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL.');
});

// Middleware
app.use(bodyParser.json());

// Configurar CORS para permitir solicitudes de otros dominios
app.use(cors({
    origin: '*', // Permitir solo este origen
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS'], // Métodos HTTP permitidos
    credentials: true // Permitir envío de credenciales (si es necesario)
}));

// Ruta para el chatbot
app.post('/chat', async (req, res) => {
    const { message } = req.body;
    try {
        const reply = await generateText(message);
        if (reply.isRelevant) {
            res.json({ reply: reply.text });
        } else {
            res.json({
                reply: "Lo siento, tu pregunta no parece estar dentro del ámbito de la gestión de proyectos que maneja Project Control. ¿Hay algo más en lo que pueda asistirte sobre planificación o administración de proyectos?",
                originalReply: reply.text
            });
        }
    } catch (error) {
        console.error('Error al generar respuesta:', error);
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
});
// Ruta para el inicio de sesión
app.post('/login', (req, res) => {
    const { nombre_usuario, clave } = req.body;
    console.log(nombre_usuario, clave)
    // Consulta para verificar las credenciales del usuario
    const query = `SELECT * FROM usuarios WHERE nombre_usuario = '${nombre_usuario}' AND clave = '${clave}'`;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error en el servidor' });
        }

        if (results.length > 0) {
            // Usuario encontrado
            const user = results[0];
            console.log(user)
            res.json({
                message: 'Inicio de sesión exitoso',
                user: {
                    id: user.ID,
                    nombre_usuario: user.nombre_usuario,
                    rol: user.roles
                }
            });
        } else {
            // Usuario no encontrado o credenciales incorrectas
            res.status(401).json({ message: 'Credenciales incorrectas o usuario sin permisos' });
        }
    });
});

// Ruta para el registro de sesión
app.post('/registro', (req, res) => {
    const { nombre_usuario, clave } = req.body;
    const rol = 'vista'; // Asignamos el rol 'vista' por defecto

    // Verificar si el usuario ya existe
    const checkUserQuery = `SELECT * FROM usuarios WHERE nombre_usuario = ?`;
    db.query(checkUserQuery, [nombre_usuario], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error en el servidor' });
        }

        if (results.length > 0) {
            // Usuario ya existe
            return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
        }

        // Si el usuario no existe, proceder con el registro
        const insertQuery = `INSERT INTO usuarios (nombre_usuario, clave, roles) VALUES (?, ?, ?)`;
        db.query(insertQuery, [nombre_usuario, clave, rol], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al registrar el usuario' });
            }

            res.status(201).json({
                message: 'Usuario registrado exitosamente',
                user: {
                    id: result.insertId,
                    nombre_usuario: nombre_usuario,
                    rol: rol
                }
            });
        });
    });
});


// Ruta para crear un nuevo proyecto
app.post('/agregar', (req, res) => {
    const { titulo, descripcion, estatus } = req.body;
    db.query(`INSERT INTO proyectos (titulo, descripcion, estatus) VALUES ('${titulo}', '${descripcion}', '${estatus}')`, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ ID: results.insertId, titulo, descripcion, estatus });
    });
});

// Ruta para ver todos los proyectos
app.get('/visualizar', (req, res) => {
    db.query('SELECT * FROM proyectos', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Ruta para editar un proyecto
app.put('/editar/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, estatus } = req.body;
    console.log("Estoy en editar")
    console.log({
        id,
        Body: { titulo, descripcion, estatus }
    })
    db.query('UPDATE proyectos SET titulo = ?, descripcion = ?, estatus = ? WHERE id = ?', [titulo, descripcion, estatus, id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Proyecto actualizado' });
    });
});

// Ruta para eliminar un proyecto
app.delete('/eliminar/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM proyectos WHERE id = ?', [id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Proyecto eliminado' });
    });
});

