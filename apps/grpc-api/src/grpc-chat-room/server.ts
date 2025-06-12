import { Server, ServerCredentials } from '@grpc/grpc-js'
import { ChatServiceService } from './generated/chat'
import { ChatMessage } from './generated/chat'

const clients: any[] = []

const chatStream = (call: any) => {
  clients.push(call)

  call.on('data', (msg: ChatMessage) => {
    console.log(`[${msg.sender}]: ${msg.message}`)

    // Broadcast to all connected clients
    clients.forEach((client) => {
      if (client !== call) {
        client.write(msg)
      }
    })
  })

  call.on('end', () => {
    clients.splice(clients.indexOf(call), 1)
    call.end()
  })
}

const server = new Server()
server.addService(ChatServiceService, { chatStream })

server.bindAsync('0.0.0.0:50051', ServerCredentials.createInsecure(), () => {
  console.log('Server running at http://0.0.0.0:50051')
  server.start()
})
