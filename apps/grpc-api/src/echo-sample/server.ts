import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import path from 'path'

// Proto file path
const PROTO_PATH = path.join(__dirname, './protos/echo.proto')

// Load proto file
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
})

// Load package definition
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as any
const echoPackage = protoDescriptor.echo

// Implement Echo service
const echoService = {
  Echo: (
    call: grpc.ServerUnaryCall<any, any>,
    callback: grpc.sendUnaryData<any>,
  ) => {
    console.log('Received message:', call.request.message)
    callback(null, { message: call.request.message })
  },
}

function main() {
  const server = new grpc.Server()
  server.addService(echoPackage.EchoService.service, echoService)
  const bindAddress = '0.0.0.0:50051'
  server.bindAsync(
    bindAddress,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error('Server error:', err)
        return
      }
      console.log(`Server listening on ${bindAddress}`)
      server.start()
    },
  )
}

main()
