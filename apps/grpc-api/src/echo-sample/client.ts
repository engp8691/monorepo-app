import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import path from 'path'

const PROTO_PATH = path.join(__dirname, './protos/echo.proto')

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
})

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as any
const EchoService = protoDescriptor.echo.EchoService

const client = new EchoService(
  'localhost:50051',
  grpc.credentials.createInsecure(),
)

client.Echo({ message: 'Hello from client!' }, (err: any, response: any) => {
  if (err) {
    console.error('Error calling Echo:', err)
  } else {
    console.log('Response from server:', response.message)
  }
})
