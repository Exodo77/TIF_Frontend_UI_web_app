document.addEventListener('DOMContentLoaded', function () {
    function ejecutarDespuesDeUnSegundo() {
        //DECLARACIONES DE VARIABLES GLOBALES
    const createServerButton = document.querySelector('.create-server-button');
    const exploreServersButton = document.querySelector('.explore-servers-button');
    const createChannelButton = document.querySelector('.create-channel-button');
    const channelDialog = document.getElementById('channelDialog');
    const confirmChannelDialogButton = document.getElementById('confirmChannelDialogButton');
    const cancelChannelDialogButton = document.getElementById('cancelChannelDialogButton');
    let selectedServerId;

    const noPerteneceAServidor = document.getElementById('welcome-content').getAttribute('data-no-pertenece') === 'true';

    //------------------------------------------------FUNCIONES CORRESPONDIENTES PARA LOS CANALES--------------------------------------
    function createChannel(serverId, channelName) {
        //FUNCION QUE EJECUTA LA RUTA CREAR CANAL
        const userId = document.querySelector('.welcome-header').getAttribute('data-user-id');

        fetch('/crear_canal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                servidor_id: serverId,
                nombre_canal: channelName,
                user_id: userId,
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Canal creado con éxito') {
                console.log('Canal creado exitosamente');

                const channelList = document.querySelector('.channel-list');
                const channelListItem = document.createElement('li');
                channelListItem.className = 'channel-list-item';
                channelListItem.textContent = channelName;
                channelList.appendChild(channelListItem);
                // Oculta la columna de canales después de crear el canal
                const channelColumn = document.querySelector('.channel-column');
                channelColumn.style.display = 'none';
            } else {
                console.error('No se pudo crear el canal');
            }
            closeCreateChannelDialog();
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            closeCreateChannelDialog();
        });
        actualizarListaCanales(serverId);
    }

    createChannelButton.addEventListener('click', function () {
        openCreateChannelDialog();
    });

    function openCreateChannelDialog() {
        channelDialog.style.display = 'block';
    }

    function closeCreateChannelDialog() {
        channelDialog.style.display = 'none';
        document.getElementById('channelName').value = '';
    }

    confirmChannelDialogButton.addEventListener('click', function () {
        const channelName = document.getElementById('channelName').value;
        if (channelName) {
            createChannel(selectedServerId, channelName);
        }
    });

    cancelChannelDialogButton.addEventListener('click', closeCreateChannelDialog);

    function actualizarListaCanales(serverId) {
        //FUNCION QUE EJECUTA LA RUTA DE OBTENER CANALES SERVIDORES
        fetch(`/obtener_canales_servidor/${serverId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            const channelList = document.querySelector('.channel-list');
            channelList.innerHTML = '';

            data.forEach(channel => {
                const channelListItem = document.createElement('div');
                channelListItem.className = 'channel-list-item';
                channelListItem.textContent = channel.nombre;
                channelListItem.setAttribute('data-channel-id', channel.canalID);
                channelList.appendChild(channelListItem);

                // Agregar manejador de clic para los nombres de los canales aquí
                channelListItem.addEventListener('click', function () {
                    const canalID = channelListItem.getAttribute('data-channel-id');
                    mostrarMensajesDelCanal(canalID);
                });
            });
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
        });
    }

    const channelListItems = document.querySelectorAll('.channel-list-item');
    channelListItems.forEach(function (channelListItem) {
        //manejara los clics en elementos de canal
        channelListItem.addEventListener('click', function () {
            const canalID = channelListItem.getAttribute('data-channel-id');
            mostrarMensajesDelCanal(canalID);
        });
    });

    function obtenerChannelIdActual() {
        //obtiene el ID DEL canal
        const messageColumn = document.querySelector('.message-column');
        const channelId = messageColumn.getAttribute('data-channel-id');
        return channelId;
    }


    //------------------------------------------------FUNCIONES CORRESPONDIENTES PARA LOS MENSAJES DE CANALES--------------------------------------
    function mostrarMensajesDelCanal(channelId) {
        // MUESTRA LOS MENSAJES DEL CANAL DADO SU ID
        // Muestra la "Columna 4"
        const messageColumn = document.querySelector('.message-column');
        messageColumn.style.display = 'block';
    
        // Establece el ID del canal actual en la cuarta columna
        messageColumn.setAttribute('data-channel-id', channelId);
    
        // Obtén y muestra los mensajes del canal seleccionado
        fetch(`/obtener_mensajes_canal/${channelId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            const messageList = document.querySelector('.message-list');
            messageList.innerHTML = '';
    
            data.forEach(message => {
                // Crea el contenedor principal para el mensaje
                const messageSection = document.createElement('div');
                messageSection.className = 'message-section';
    
                // Crea el contenedor para el contenido del mensaje
                const messageBox = document.createElement('div');
                messageBox.className = 'message-box';
    
                const messageContent = document.createElement('p');
                messageContent.className = 'message-content';
                messageContent.textContent = message.contenido;
    
                // Crea un elemento para mostrar el nombre de usuario
                const usernameElement = document.createElement('p');
                usernameElement.className = 'message-username';
                usernameElement.textContent = message.autor;
    
                // Crea un elemento para mostrar la fecha de envío
                const dateElement = document.createElement('p');
                dateElement.className = 'message-date';
                dateElement.textContent = message.fecha_envio;
    
                // Agrega elementos al contenedor del mensaje
                messageBox.appendChild(usernameElement);
                messageBox.appendChild(dateElement);
                messageBox.appendChild(messageContent);
    
                // Agrega el contenedor del mensaje al contenedor principal
                messageSection.appendChild(messageBox);
                messageList.appendChild(messageSection);
            });
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
        });
    }

    // Selecciona el botón de enviar y la caja de texto
    const sendMessageButton = document.getElementById('sendMessageButton');
    const messageInput = document.getElementById('messageInput');

    sendMessageButton.addEventListener('click', function () {
        const channelId = obtenerChannelIdActual();
        const messageText = messageInput.value.trim(); // Obtiene el texto del mensaje

        if (messageText) {
            enviarMensaje(channelId, messageText);
            mostrarMensajesDelCanal(channelId);
        }
    });

    function enviarMensaje(channelId, messageText) {
        //EJECUTA LA FUNCION ENVIAR MENSAJE 
        const userId = document.querySelector('.welcome-header').getAttribute('data-user-id');
        fetch('/enviar_mensaje', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                canal_id: channelId,
                texto: messageText,
                user_id: userId // Incluye el userID en la solicitud
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Mensaje enviado:', data);
            messageInput.value = '';
        })
        .catch(error => {
            console.error('Error al enviar el mensaje:', error);
        });


    }

    function openDialog() {
        serverDialog.style.display = 'block';
    }

    function closeDialog() {
        serverDialog.style.display = 'none';
        serverNameInput.value = '';
    }

    //------------------------------------------------FUNCIONES CORRESPONDIENTES PARA LOS SERVIDORES--------------------------------------
    function actualizarListaServidores() {
        const user_id = document.querySelector('.welcome-header').getAttribute('data-user-id');
        fetch(`/obtener_servidores_usuario/${user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            const serverList = document.querySelector('.server-list');
            serverList.innerHTML = '';

            data.forEach(servidor => {
                const serverListItem = document.createElement('li');
                serverListItem.className = 'server-list-item';
                serverListItem.textContent = servidor.nombre;
                serverListItem.setAttribute('data-server-id', servidor.serverID);
                serverList.appendChild(serverListItem);
            });

            const serverListItems = document.querySelectorAll('.server-list-item');
            serverListItems.forEach(function (serverListItem) {
                serverListItem.addEventListener('click', function () {
                    const serverId = serverListItem.getAttribute('data-server-id');
                    selectedServerId = serverId;
                    actualizarListaCanales(serverId);
                    const channelColumn = document.querySelector('.channel-column');
                    channelColumn.style.display = 'block';
                });
            });
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
        });
    }


    createServerButton.addEventListener('click', function () {
        openDialog();
    });

    exploreServersButton.addEventListener('click', function () {
        console.log('Explorar servidores...');

        const exploreServersColumn = document.getElementById('explore-servers-column');
        exploreServersColumn.style.display = 'block';

        // Ocultar la columna de mensajes (messageColumn)
        const messageColumn = document.querySelector('.message-column');
        messageColumn.style.display = 'none';

        fetch('/explorar_servidores', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            const exploreServerList = document.querySelector('.explore-server-list');
            exploreServerList.innerHTML = '';

            data.forEach(servidor => {
                const serverListItem = document.createElement('li');
                serverListItem.className = 'server-list-item';
                serverListItem.textContent = servidor.nombre;
                serverListItem.setAttribute('data-server-id', servidor.serverID);
                exploreServerList.appendChild(serverListItem);
            });

            const serverListItems = exploreServerList.querySelectorAll('.server-list-item');
            serverListItems.forEach(function (serverListItem) {
                serverListItem.addEventListener('click', function () {
                    const serverName = serverListItem.textContent;
                    openExploreServerDialog(serverName, serverListItem.getAttribute('data-server-id'));
                });
            });
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
        });
    });

    const serverDialog = document.getElementById('serverDialog');
    const confirmDialogButton = document.getElementById('confirmDialogButton');
    const cancelDialogButton = document.getElementById('cancelDialogButton');
    const serverNameInput = document.getElementById('serverName');

    cancelDialogButton.addEventListener('click', closeDialog);

    confirmDialogButton.addEventListener('click', function () {
        const serverName = serverNameInput.value;
        const userId = document.querySelector('.welcome-header').getAttribute('data-user-id');
        createServer(userId, serverName);
    });

    function openExploreServerDialog(serverName, serverId) {
        const exploreServerDialog = document.getElementById('exploreServerDialog');
        exploreServerDialog.style.display = 'block';

        const serverNameDisplay = document.getElementById('exploreServerName');
        serverNameDisplay.textContent = serverName;

        const exploreServerAcceptDialogButton = document.getElementById('exploreServerAcceptDialogButton');
        exploreServerAcceptDialogButton.addEventListener('click', function () {
            joinServer(serverId, serverName);
        });
    }

    const exploreServerCancelDialogButton = document.getElementById('exploreServerCancelDialogButton');
    exploreServerCancelDialogButton.addEventListener('click', function () {
        const exploreServerDialog = document.getElementById('exploreServerDialog');
        exploreServerDialog.style.display = 'none';
    });

    function joinServer(serverId) {
        const userId = document.querySelector('.welcome-header').getAttribute('data-user-id');

        fetch(`/unirse_a_servidor/${serverId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: userId })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);

            const exploreServerDialog = document.getElementById('exploreServerDialog');
            exploreServerDialog.style.display = 'none';

            // Oculta la columna de explorar servidores
            const exploreServersColumn = document.getElementById('explore-servers-column');
            exploreServersColumn.style.display = 'none';

            actualizarListaServidores();
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
        });
    }

    function createServer(userId, serverName) {
        const requestData = {
            nombre_servidor: serverName,
            user_id: userId
        };

        fetch('/crear_servidor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Servidor creado con éxito') {
                console.log('Servidor creado exitosamente');

                const serverList = document.querySelector('.server-list');
                const serverListItem = document.createElement('li');
                serverListItem.className = 'server-list-item';
                serverListItem.textContent = serverName;
                serverListItem.setAttribute('data-server-id', data.serverID);
                serverList.appendChild(serverListItem);
            } else {
                console.error('No se pudo crear el servidor');
            }
            closeDialog();

            actualizarListaServidores();
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            closeDialog();
        });
    }

    if (noPerteneceAServidor) {
        const noJoinedMessage = document.querySelector('.no-joined-message');
        noJoinedMessage.style.display = 'block';
    }
    actualizarListaServidores();
    }
    // Ejecuta todas las funciones después de un segundo
    setTimeout(ejecutarDespuesDeUnSegundo, 1000);
});
