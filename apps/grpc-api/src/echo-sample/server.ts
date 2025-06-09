import * as grpc from '@grpc/grpc-js'
import {
  EchoServiceService,
  EchoServiceServer,
  EchoResponse,
} from './generated/echo'
import { ServerStatusResponse } from '@grpc/grpc-js/build/src/server-call'

// ------------------- Services ------------------- //
// EchoService: provides echo service
const echoService: EchoServiceServer = {
  echoBack: (call, callback) => {
    const error: grpc.ServerErrorResponse | ServerStatusResponse | null = null
    const metadata = call.metadata
    const authToken = metadata.get('authorization')
    console.log('Authorization token:', authToken)
    // Options
    console.log('Client Peer:', call.getPeer())
    console.log('Was Cancelled:', call.cancelled)
    console.log('Call deadline:', call.getDeadline())

    const response: EchoResponse = {
      message: call.request.message,
    }

    callback(error, response)
  },
}

// ------------------- Server Bootstrap ------------------- //
function startServer() {
  const bindAddress = '0.0.0.0:50051'
  const server = new grpc.Server()

  server.addService(EchoServiceService, echoService)

  server.bindAsync(
    bindAddress,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error('Server error:', err)
        return
      }
      console.log(`Server listening on ${bindAddress}`)
      // server.start()
    },
  )
}

startServer()
