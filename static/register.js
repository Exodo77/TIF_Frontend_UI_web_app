document.addEventListener('DOMContentLoaded', function() {
    // Obtener los elementos select por su ID
    const selectDia = document.getElementById('dia');
    const selectMes = document.getElementById('mes');
    const selectAnio = document.getElementById('anio');

    // Llenar el menú desplegable de Día con opciones del 1 al 31
    for (let dia = 1; dia <= 31; dia++) {
        const option = document.createElement('option');
        option.value = dia;
        option.text = dia;
        selectDia.appendChild(option);
    }

    // Llenar el menú desplegable de Mes con opciones de los nombres de los meses
    const meses = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    for (let i = 0; i < meses.length; i++) {
        const option = document.createElement('option');
        option.value = i + 1;
        option.text = meses[i];
        selectMes.appendChild(option);
    }

    // Llenar el menú desplegable de Año con opciones de 1900 al año actual
    const anioActual = new Date().getFullYear();
    for (let anio = 1900; anio <= anioActual; anio++) {
        const option = document.createElement('option');
        option.value = anio;
        option.text = anio;
        selectAnio.appendChild(option);
    };

    // Manejador de evento para el botón "Confirmar"
    document.getElementById('submit-button').addEventListener('click', function(event) {
        event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

        // Obtén los valores de los campos del formulario
        var username = document.querySelector('input[name="username"]').value;
        var name = document.querySelector('input[name="name"]').value;
        var lastname = document.querySelector('input[name="lastname"]').value;
        var password = document.querySelector('input[name="password"]').value;
        var email = document.querySelector('input[name="email"]').value;
        var dia = document.querySelector('select[name="dia"]').value;
        var mes = document.querySelector('select[name="mes"]').value;
        var anio = document.querySelector('select[name="anio"]').value;

        // Crea un objeto con los datos del formulario
        var userData = {
            "username": username,
            "name": name,
            "lastname": lastname,
            "password": password,
            "email": email,
            "dia": dia,
            "mes": mes,
            "anio": anio
        };

        // Realiza una solicitud AJAX para enviar los datos al servidor
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/register", true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    // Maneja la respuesta exitosa del servidor aquí
                    console.log(xhr.responseText);
                    const response = JSON.parse(xhr.responseText);
                    if (response.message === "Registro exitoso. Ahora puedes iniciar sesión.") {
                        // Muestra un mensaje de éxito al usuario
                        alert(response.message);

                        // Espera 2 segundos y luego redirige al usuario a la página de inicio de sesión
                        setTimeout(function() {
                            window.location.href = "/login"; // Cambia "/login" por la URL de tu página de inicio de sesión
                        }, 2000);
                    }
                } else {
                    // Maneja errores del servidor aquí
                    console.error("Error en la solicitud: " + xhr.status);
                }
            }
        };

        // Convierte el objeto userData a JSON y envíalo al servidor
        xhr.send(JSON.stringify(userData));
    });
});
