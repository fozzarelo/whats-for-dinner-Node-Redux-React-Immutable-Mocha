import Server from 'socket.io'

export default function startServer(store) {
  const io = new Server().attach(8090)
  // send(emit) the hole state every time it changes
  store.subscribe(() => io.emit('state', store.getState().toJS()))
  // Listen for connections and send the  state upon connectio.
  io.on('connection', (socket) => {
    socket.emit('state', store.getState().toJS())
    socket.on('action', store.dispatch.bind(store))
  })
}
