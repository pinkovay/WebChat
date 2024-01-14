const app = require('express')(); // Importing and instantiating
const server = require('http').createServer(app); // starting the server

// Cors = Browser mechanism that limits requests
// In this case, I am setting cors to only accept requests that come from the url defined in 'origin'
// 'Origin' receives the frontend url
const io = require('socket.io')(server, { cors: { origin: 'http://localhost:5173' } }); 

// Back-end port
const PORT = 3001;

// Receiving information whenever a user makes a connection through the frontend
io.on('connection', socket =>{ // Connection: That name's already reserved by the lib, because's an event type

    console.log('Usuário conectado!') // each user will have a unique connection socket id
    console.log(`Your Id's: ${socket.id}`)

    socket.on('disconnect', reason =>{ // event being received from the frontend
        console.log('Usuário desconectado! ', socket.id)
        console.log(reason)
    })

    socket.on('set_username', username =>{ // event being received from the frontend
        socket.data.username = username // stored the information // stored the usernam
        console.log(`Your name's: ${username}\n`)
    })

    socket.on('message', text =>{ // event being received from the frontend ChatScript.jsx
         io.emit('receive_message', {
            text,
            authorId: socket.id,
            author: socket.data.username
         }) // Now it is the server that is issuing, not the socket instance
    })
})

server.listen(PORT, () => console.log('Server running...'))
