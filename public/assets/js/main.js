const sendButton = document.querySelector("#sendButton");
const inputElement = document.querySelector("#inputText");
const messagesContainer = document.querySelector(".chat__messages");
const userId = Date.now() + Math.floor(777 + Math.random() * 7000); // Generar un ID de usuario único

// Evento para el botón de enviar
sendButton.addEventListener("click", async () => {
    const trimmedInputText = inputElement.value.trim();

    if (!trimmedInputText) return;

    handleUserMessage(trimmedInputText, inputElement);

    setTimeout(() => {
        showBotTyping();
    }, 1000); // Esperar 1s antes de mostrar "Carmen escribiendo..."

    try {
        const data = await sendMessageToBackend(trimmedInputText);
        displayBotResponse(data.reply);
    } catch (error) {
        removeBotTyping();
        console.log("Error:", error);
    }
});

// Evento para capturar la tecla INTRO (Enter)
inputElement.addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); // Evitar el comportamiento por defecto del Enter
        const trimmedInputText = inputElement.value.trim();

        if (!trimmedInputText) return;

        handleUserMessage(trimmedInputText, inputElement);

        setTimeout(() => {
            showBotTyping();
        }, 1000); // Esperar 1s antes de mostrar "Carmen escribiendo..."

        // Enviar el mensaje al backend
        try {
            const data = await sendMessageToBackend(trimmedInputText);
            displayBotResponse(data.reply);
        } catch (error) {
            removeBotTyping();
            console.log("Error:", error);
        }
    }
});

// Función para mostrar el mensaje del usuario
function handleUserMessage(trimmedInputText, inputElement) {
    messagesContainer.innerHTML += `<div class="chat__message chat__message--user">Yo: ${trimmedInputText}</div>`;
    inputElement.value = "";
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Mostrar mensaje "Carmen escribiendo..."
function showBotTyping() {
    // Evita duplicados
    if (!document.querySelector(".chat__message--typing")) {
        messagesContainer.innerHTML += `<div class="chat__message chat__message--bot chat__message--typing">Carmen:<div class="loader"></div></div>`;
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

// Eliminar mensaje "Carmen escribiendo..."
function removeBotTyping() {
    const typingMsg = document.querySelector(".chat__message--typing");
    if (typingMsg) typingMsg.remove();
}

// Función para enviar el mensaje al backend
async function sendMessageToBackend(message) {
    const response = await fetch(CONFIG.API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userId: userId,
            message
        })
    });

    if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
    }

    const result = await response.json();
    if (CONFIG.NODE_ENV === "development") {
        console.log("Respuesta del backend:", result);
    }
    return result;
}

// Función para mostrar la respuesta del bot y eliminar "escribiendo"
function displayBotResponse(answer) {
    removeBotTyping();
    messagesContainer.innerHTML += `<div class="chat__message chat__message--bot">Carmen: ${answer}</div>`;
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
