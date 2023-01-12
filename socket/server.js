import { Server } from 'socket.io';

const io = new Server(3000, {
	cors: {
		origin: ['http://localhost:5173']
	}
});

io.on('connection', socket => {
	console.log(socket.id);

	socket.on('message', (content) => {
		console.log(`${content}`);
		io.emit('recieve-message', content);
	})
})
