import { Server, ServerCredentials, ServerDuplexStream } from '@grpc/grpc-js'
import { ChatServiceService } from './generated/chat'
import { ChatMessage } from './generated/chat'

const clients: ServerDuplexStream<ChatMessage, ChatMessage>[] = []

const chatStream = (stream: ServerDuplexStream<ChatMessage, ChatMessage>) => {
  clients.push(stream)

  stream.on('data', (msg: ChatMessage) => {
    console.log(`[${msg.sender}]: ${msg.message}`)

    // Broadcast to all connected clients
    clients.forEach((client) => {
      if (client !== stream) {
        client.write(msg)
      }
    })
  })

  stream.on('end', () => {
    clients.splice(clients.indexOf(stream), 1)
    stream.end()
  })
}

const server = new Server()
server.addService(ChatServiceService, { chatStream })

server.bindAsync('0.0.0.0:50051', ServerCredentials.createInsecure(), () => {
  console.log('Server running at http://0.0.0.0:50051')
  // server.start()
})
