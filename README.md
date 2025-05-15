# Chatbot de Supermercado "El PicoEsquina"

Este proyecto es una aplicación web que implementa un chatbot para el supermercado "El PicoEsquina". El asistente responde preguntas sobre productos, horarios, ubicación y servicios del supermercado, utilizando inteligencia artificial a través de la API de OpenAI.

## Características

- Chat interactivo en tiempo real.
- Respuestas automáticas y personalizadas sobre el supermercado.
- Interfaz sencilla y amigable.
- Simulación de "Carmen escribiendo..." para una experiencia más humana.
- Backend en Node.js con Express y frontend en HTML, CSS y JavaScript.

## Tecnologías utilizadas

- **Frontend:** HTML5, CSS3, JavaScript
- **Backend:** Node.js, Express
- **API:** OpenAI
- **Dependencias:** dotenv, express, openai, nodemon

## Instalación

1. **Clona este repositorio:**

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd 03-asistentes-openai
   ```
  
2. **Instala las dependencias:**

   ```bash
   npm install
   ```

3. **Crea un archivo `.env` en la raíz del proyecto y agrega tu clave de API de OpenAI:**

   ```plaintext
   OPENAI_API_KEY=tu_clave_de_api
   ```

4. **Inicia el servidor:**

   ```bash
   npm start
   ```

5. **Abre tu navegador y visita `http://localhost:3005` para interactuar con el chatbot.**

## Uso

- Ingresa una pregunta relacionada con el supermercado en el campo de entrada.
- Haz clic en el botón "Enviar" o presiona la tecla Enter.
- El chatbot responderá con información relevante sobre el negocio.

## Contexto del Chatbot

El chatbot está configurado con el siguiente contexto:

- Nombre del negocio: El PicoEsquina.
- Descripción: Supermercado de barrio con productos frescos y de calidad.
- Horario: Lunes a Sábado de 8:00 a 21:00, Domingos de 9:00 a 18:00.
- Ubicación: Calle Falsa 123, Madrid.
- Productos: Frutas, verduras, panadería, carnicería, pescadería, productos enlatados, bebidas, productos de limpieza y cuidado personal.
- Marcas: Pascual, Coca-Cola, Kaiku, Central Lechera, Bimbo, Monster, Hero, Puleva, Pepsi.
- Métodos de pago: Efectivo, tarjeta y Bizum.

El chatbot solo responde preguntas relacionadas con el supermercado. Cualquier otra pregunta será ignorada.

## Estructura del proyecto

 02-negocio-openai/
    ├── public/
    │   ├── assets/
    │   │   ├── css/
    │   │   │   └── styles.css
    │   │   ├── img/
    │   │   │   └── icon-chatbot.png
    │   │   └── js/
    │   │       └── main.js
    │   └── index.html
    ├── app.js
    ├── package.json
    ├── .env
    └── [README.md](<http://localhost:3005>)

## Scripts disponibles

- npm start: Inicia el servidor con nodemon

## Contribuciones

¡Las contribuciones son bienvenidas! Si deseas mejorar este proyecto, por favor abre un issue o envía un pull request.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE.md para más detalles.

## Autor

Creado por Antonio Zurano como parte del curso "Desarrollo Web con IA". de Victor Robles profesor de Udemy
