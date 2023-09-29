document.addEventListener('DOMContentLoaded', function () {
    // Obtiene una referencia a los botones "Editar" por su id
    const editarUsuarioButton = document.getElementById("editarUsuarioButton");
    const editarNombreButton = document.getElementById("editarNombreButton");
    const editarApellidoButton = document.getElementById("editarApellidoButton");
    const editarCorreoButton = document.getElementById("editarCorreoButton");
    const editarContraButton = document.getElementById("editarContraButton");

    // Obtiene una referencia a los botones "Cancelar" por su id
    const cancelNombreUsuarioButton = document.getElementById("cancelNombreUsuarioButton");
    const cancelNombreButton = document.getElementById("cancelNombreButton");
    const cancelApellidoButton = document.getElementById("cancelApellidoButton");
    const cancelCorreoButton = document.getElementById("cancelCorreoButton");
    const cancelContraButton = document.getElementById("cancelContraButton");

    // Obtiene el userId del elemento HTML
    const userId = document.querySelector('.welcome-header').getAttribute('data-user-id');

    /*********************************************BOTONES EDITAR********************************************************* */
    // Agrega un evento clic a cada botón "Editar"
    editarUsuarioButton.addEventListener("click", () => {
        showDialog("nombreusuarioDialog");
    });

    editarNombreButton.addEventListener("click", () => {
        showDialog("nombreDialog");
    });

    editarApellidoButton.addEventListener("click", () => {
        showDialog("apellidoDialog");
    });

    editarCorreoButton.addEventListener("click", () => {
        showDialog("correoDialog");
    });

    editarContraButton.addEventListener("click", () => {
        showDialog("contraDialog");
    });

    /***************************************BOTONES CONFIRMAR PARA CADA VENTANA EMERGENTE******************************************************* */
    // Agrega un evento clic al botón "Confirmar" en la ventana emergente de NOMBRE DE USUARIO
    const confirmNombreUsuarioButton = document.getElementById("confirmNombreUsuarioButton");

    confirmNombreUsuarioButton.addEventListener("click", () => {
        const nuevoNombreUsuario = document.getElementById("userName").value; // Obtiene el nuevo nombre de usuario
        const user_id = document.querySelector('.welcome-header').getAttribute('data-user-id'); // Obtiene el user_id
        // Realiza una solicitud PUT al servidor para enviar el nuevo dato
        fetch('/modificar_dato', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nuevoDato: nuevoNombreUsuario, user_id: user_id , tipo:"nombreusuario"}), // Envía el nuevo dato y el user_id
        })
        .then((response) => {
            if (response.ok) {
                // La solicitud se completó con éxito, puedes hacer algo aquí si es necesario
                console.log('Nombre de usuario modificado con éxito');
                // Actualizar el nombre de usuario en la página
                const nombreUsuarioElement = document.querySelector(".info-item p:first-child");
                nombreUsuarioElement.textContent = "Nombre de usuario: " + nuevoNombreUsuario;
                // Una vez cambiado el dato, muestra un mensaje
                const flashMessage = document.getElementById("flashMessage");
                flashMessage.textContent = "Nombre de usuario cambiado con éxito"; 
            } else {
                // Manejar errores si es necesario
                console.error('Error al modificar el nombre de usuario');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        // Oculta la ventana emergente después de enviar la solicitud
        hideDialog("nombreusuarioDialog");
    });

    // Agrega un evento clic al botón "Confirmar" en la ventana emergente de NOMBRE
    const confirmNombreButton = document.getElementById("confirmNombreButton");

    confirmNombreButton.addEventListener("click", () => {
        const nuevoNombre = document.getElementById("nombreName").value; // Obtiene el nuevo nombre de usuario
        const user_id = document.querySelector('.welcome-header').getAttribute('data-user-id'); // Obtiene el user_id
        // Realiza una solicitud PUT al servidor para enviar el nuevo dato
        fetch('/modificar_dato', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nuevoDato: nuevoNombre, user_id: user_id , tipo:"nombre"}), // Envía el nuevo dato y el user_id
        })
        .then((response) => {
            if (response.ok) {
                console.log('Nombre modificado con éxito');
                //Actualiza el nombre en la pagina
                const nombreElement = document.querySelector(".info-item p:nth-child(2)");
                nombreElement.textContent = "Nombre: " + nuevoNombre;
                // Una vez cambiado el dato, muestra un mensaje
                const flashMessage = document.getElementById("flashMessage");
                flashMessage.textContent = "Nombre cambiado con éxito"; 
            } else {
                // Manejar errores si es necesario
                console.error('Error al modificar el nombre');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        // Oculta la ventana emergente después de enviar la solicitud
        hideDialog("nombreDialog");
    });

    // Agrega un evento clic al botón "Confirmar" en la ventana emergente de APELLIDO
    const confirmApellidoButton = document.getElementById("confirmApellidoButton");

    confirmApellidoButton.addEventListener("click", () => {
        const nuevoApellido = document.getElementById("apellidoName").value; // Obtiene el nuevo nombre de usuario
        const user_id = document.querySelector('.welcome-header').getAttribute('data-user-id'); // Obtiene el user_id
        // Realiza una solicitud PUT al servidor para enviar el nuevo dato
        fetch('/modificar_dato', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nuevoDato: nuevoApellido, user_id: user_id , tipo:"apellido"}), // Envía el nuevo dato y el user_id
        })
        .then((response) => {
            if (response.ok) {
                // La solicitud se completó con éxito
                console.log('Apellido modificado con éxito');
                const apellidoElement = document.querySelector(".info-item p:nth-child(3)");
                apellidoElement.textContent = "Apellido: " + nuevoApellido;
                // Una vez cambiado el dato, muestra un mensaje
                const flashMessage = document.getElementById("flashMessage");
                flashMessage.textContent = "Apellido cambiado con éxito"; 
            } else {
                // Manejar errores si es necesario
                console.error('Error al modificar el apellido');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        // Oculta la ventana emergente después de enviar la solicitud
        hideDialog("apellidoDialog");
    });

    // Agrega un evento clic al botón "Confirmar" en la ventana emergente de CORREO
    const confirmCorreoButton = document.getElementById("confirmCorreoButton");
    confirmCorreoButton.addEventListener("click", () => {
        const nuevoCorreo = document.getElementById("correoName").value; // Obtiene el nuevo nombre de usuario
        const user_id = document.querySelector('.welcome-header').getAttribute('data-user-id'); // Obtiene el user_id
        // Realiza una solicitud PUT al servidor para enviar el nuevo dato
        fetch('/modificar_dato', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nuevoDato: nuevoCorreo, user_id: user_id , tipo:"correo"}), // Envía el nuevo dato y el user_id
        })
        .then((response) => {
            if (response.ok) {
                // La solicitud se completó con éxito, puedes hacer algo aquí si es necesario
                console.log('Correo modificado con éxito');
                const correoElement = document.querySelector(".info-item p:nth-child(4)");
                correoElement.textContent = "Correo: " +nuevoCorreo;
                // Una vez cambiado el dato, muestra un mensaje
                const flashMessage = document.getElementById("flashMessage");
                flashMessage.textContent = "Correo cambiado con éxito"; 
            } else {
                console.error('Error al modificar el correo');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        // Oculta la ventana emergente después de enviar la solicitud
        hideDialog("correoDialog");
    });

    // Agrega un evento clic al botón "Confirmar" en la ventana emergente de CONTRASEÑA
    const confirmContraButton = document.getElementById("confirmContraButton");

    confirmContraButton.addEventListener("click", () => {
        const contrasenaActual = document.getElementById("contrasenaActual").value; // Obtiene la contraseña actual
        const nuevaContrasena = document.getElementById("nuevaContrasena").value; // Obtiene la nueva contraseña
        const user_id = document.querySelector('.welcome-header').getAttribute('data-user-id'); // Obtiene el user_id
        fetch('/cambiar_contrasena', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nuevaContrasena, user_id, contrasenaActual }),
        })
        .then((response) => {
            if (response.ok) {
                // La contraseña se cambió con éxito, puedes hacer algo aquí si es necesario
                console.log('Contraseña modificada con éxito');
                hideDialog("contraDialog");
                // Una vez cambiado el dato, muestra un mensaje
                const flashMessage = document.getElementById("flashMessage");
                flashMessage.textContent = "Contraseña cambiada con éxito"; // Mensaje de éxito
            } else {
                // La contraseña actual es incorrecta, muestra un mensaje de error
                const flashMessage = document.getElementById("flashMessage");
                flashMessage.textContent = "Contraseña actual incorrecta"; // Mensaje de error
                flashMessage.style.color = "red"; // Cambia el color del mensaje a rojo
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });

    /***************************************************BOTONES DE CONFIRMAR**************************************************************++++ */
    // Agrega un evento clic al botón "Cancelar" en cada diálogo emergente
    cancelNombreUsuarioButton.addEventListener("click", () => {
        hideDialog("nombreusuarioDialog");
    });
    
    cancelNombreButton.addEventListener("click", () => {
        hideDialog("nombreDialog");
    });
    
    cancelApellidoButton.addEventListener("click", () => {
        hideDialog("apellidoDialog");
    });
    
    cancelCorreoButton.addEventListener("click", () => {
        hideDialog("correoDialog");
    });
    
    cancelContraButton.addEventListener("click", () => {
        hideDialog("contraDialog");
    });

    /******************************************************************VENTANAS EMERGENTES ******************************************************* */ 
    // Función para mostrar el diálogo emergente
    function showDialog(dialogId) {
        const dialog = document.getElementById(dialogId);
        if (dialog) {
            dialog.style.display = "block";
        }
    }

    // Función para ocultar el diálogo emergente
    function hideDialog(dialogId) {
        const dialog = document.getElementById(dialogId);
        if (dialog) {
            dialog.style.display = "none";
        }
    }
});
