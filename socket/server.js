import { Server } from 'socket.io';

const io = new Server(3000, {
	cors: {
		origin: ['http://192.168.1.15:5173']
	}
});

io.on('connection', socket => {
	socket.on('message', (data) => {
		console.log(data)
		
		io.emit('recieve-message', data)
	})
})
