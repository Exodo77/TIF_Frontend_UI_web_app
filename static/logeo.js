document.getElementById('submit-button').addEventListener('click', function() {
    var correo = document.getElementById('correo').value;
    var contrasena = document.getElementById('contrasena').value;

    var data = {
        correo: correo,
        contrasena: contrasena
    };

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(function(response) {
        // Verifica si la respuesta del servidor es exitosa (código de respuesta 200)
        if (response.ok) {
            // Redirecciona o realiza alguna acción adicional después del inicio de sesión exitoso
            window.location.href = '/welcome';
        } else {
            // Muestra un mensaje de error en el contenedor de mensajes
            document.getElementById('message-container').innerHTML = 'Credenciales incorrectas. Inténtalo de nuevo.';
        }
    })
    .catch(function(error) {
        // Maneja los errores aquí
        console.error('Error al enviar la solicitud:', error);
    });
});
