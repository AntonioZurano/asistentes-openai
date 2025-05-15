// Importar dependencias
import express, { response } from "express";
import dotenv from "dotenv";
import OpenAI from "openai";

//cargar configuracion (de api key)
dotenv.config();

//Cargar express
const app = express();
const PORT = process.env.PORT || 3005;


//Servir frontend
app.use("/", express.static("public"));

//Middleware para procesar json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Instancia de openai y pasar el api key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

let userThreads = {};

//Ruta / endpoint /url
app.post("/api/chatbot", async (req, res) => {
    console.log("Cuerpo de la solicitud recibido en el backend:", req.body); // Verifica el contenido del cuerpo
    const { userId, message } = req.body;

    // Validar que el userId y el mensaje no estén vacíos
    if (!userId) {
        console.log("Error: El userId no fue enviado desde el frontend."); // Mensaje de depuración
        return res.status(400).json({ error: "El userId es obligatorio." });
    }
    if (!message) {
        console.log("Error: El mensaje no fue enviado desde el frontend."); // Mensaje de depuración
        return res.status(400).json({ error: "Has mandado un mensaje vacío!!!" });
    }


    // Recibir pregunta del usuario
    //const { userId, message } = req.body;

    // Validar que el mensaje no esté vacío
    if (!message) {
        return res.status(404).json({ error: "Has mandado un mensaje vacio!!!" });
    }
    // Validar que el userId y el mensaje no estén vacíos
    if (!userId) {
        return res.status(400).json({ error: "El userId es obligatorio." });
    }
    if (!message) {
        return res.status(400).json({ error: "Has mandado un mensaje vacío!!!" });
    }


    // Peticion al modelo de inteligencia artificial
    try {

        // Validar que el userId no esté vacío
        if (!userThreads[userId]) {
            const thread = await openai.beta.threads.create();
            userThreads[userId] = thread.id; // Asignar el ID del hilo creado
        }

        const threadId = userThreads[userId];

        // Añadir mensaje al hilo de mi asistente

        await openai.beta.threads.messages.create(threadId, {
            role: "user",
            content: message
        });

        // Ejecutar peticion al asistente

        const myAssistant = await openai.beta.threads.runs.create(threadId, {
            assistant_id: "asst_jyirMmA12ncS7Tw1xtZgsxfK"
        });

        console.log("ThreadId:", threadId)

        console.log("Ejecucion creada: ", myAssistant.id,
                    "Status Inicial: ", myAssistant.status);

        // Esperar a que la peticion al asistente se complete

        let runStatus = myAssistant;
        let attemps = 0;
        const maxAttemps = 30;

        while (runStatus.status !== "completed" && attemps < maxAttemps) {
            await new Promise(resolve => setTimeout(resolve, 1000));

            runStatus = await openai.beta.threads.runs.retrieve(threadId, myAssistant.id);

            attemps++;

            console.log(`Intento ${attemps} - Status: ${runStatus.status}`)
        }

        if (attemps >= maxAttemps) {
            return res.status(500).json({ error: "El asistente no completó la solicitud a tiempo." });
        }

        if (runStatus.status !== "completed") {
            //Lanzar error si el asistente no ha completado la ejecución
            throw new Error(`La ejecución del asistente no se ha completado. Estado final: ${runStatus.status}`);
        }

        // Obtener un array de objetos con los mensajes del hilo de conversación
        // y filtrar los mensajes del asistente
        const messages = await openai.beta.threads.messages.list(threadId);

        console.log("Total de mensajes en el hilo:", messages.data.length);

        // Filtrar los mensajes del hilo de conversación con la IA

        const assistantMessages = messages.data.filter(msg => msg.role === "assistant")

        console.log("Mensajes del asistente encontrados: ", assistantMessages.length);

        //Sacar la respuesta del asistente mas reciente
        // Ordenar los mensajes y obtener el último mensaje del asistente
        const reply = assistantMessages
                        .sort((a, b) => b.created_at - a.created_at)[0]
                        .content[0].text.value;

        console.log("Respuesta del asistente", reply)

        return res.status(200).json({ reply })

    } catch (error) {
        console.log("Error al procesar la pregunta:", error);

        return res.status(500).json({
            error: "Error al procesar la respuesta"
        });
    }

})

//Servir el backend
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
});