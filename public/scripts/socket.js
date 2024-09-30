const socket = io(); // Conecta al servidor de Socket.io

let username = "";

Swal.fire({
    title: "Enter your username",
    input: "text",
    allowOutsideClick: false,
    inputValidator: (value) => !value && "Please enter your username"
}).then(data => {
    username = data.value;
    document.querySelector("#username").innerHTML = `Username: ${username}`;
});

// Cuando recibes todos los mensajes desde el servidor
socket.on("all messages", (data) => {
    // Mapear los mensajes y mostrarlos correctamente
    const messagesHtml = data.map(
        each => `<p class="bg-success text-white rounded p-2 mb-1"><strong>${each.username}</strong>: ${each.message}</p>`
    ).join("");
    document.querySelector("#messages").innerHTML = messagesHtml;
});

// Al presionar Enter, enviar el mensaje con el nombre de usuario
document.querySelector("#text").addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        const newMessage = document.querySelector("#text").value.trim(); // Eliminar espacios en blanco
        if (newMessage) {
            socket.emit("new message", { username, message: newMessage });
            event.target.value = ""; // Limpiar el campo de texto
        }
    }
});
