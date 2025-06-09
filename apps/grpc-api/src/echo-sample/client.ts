import * as grpc from '@grpc/grpc-js'
import { EchoRequest, EchoResponse, EchoServiceClient } from './generated/echo'

const grpcAddress = 'localhost:50051'
const echoClient = new EchoServiceClient(
  grpcAddress,
  grpc.credentials.createInsecure(),
)

async function main() {
  const request: EchoRequest = { message: 'Hello from client!' }
  const callback = (err: grpc.ServiceError | null, response: EchoResponse) => {
    if (err) {
      console.error('Error calling Echo:', err)
    } else {
      console.log('Response from server:', response.message)
    }
  }

  echoClient.echoBack(request, callback)

  console.log('With metadata and options ......')
  // Add some meta data in the call
  const metadata = new grpc.Metadata()
  metadata.add('authorization', 'Bearer your-token-here')
  metadata.add('locale', 'en-US')

  const options: grpc.CallOptions = {
    deadline: Date.now() + 1000,
  }

  echoClient.echoBack(request, metadata, options, callback)
}

async function main_promisify() {
  let request: EchoRequest = { message: 'Hello from promisified client 1!' }
  let message = await echoPromisified(echoClient, request)
  console.log('Response from server:', message)

  console.log('With metadata and options ......')

  // Add some meta data in the call
  request = { message: 'Hello from promisified client 2!' }
  const metadata = new grpc.Metadata()
  metadata.add('authorization', 'Bearer your-token-here')
  metadata.add('locale', 'en-US')

  const options: grpc.CallOptions = {
    deadline: Date.now() + 1000,
  }

  message = await echoPromisified(echoClient, request, metadata, options)
  console.log('Response from server:', message)
}

function echoPromisified(
  client: EchoServiceClient,
  request: EchoRequest,
  metadata?: grpc.Metadata,
  options?: grpc.CallOptions,
): Promise<EchoResponse> {
  return new Promise((resolve, reject) => {
    const cb = (err: grpc.ServiceError | null, response: EchoResponse) => {
      if (err) {
        reject(err)
      } else {
        resolve(response)
      }
    }

    if (metadata && options) {
      client.echoBack(request, metadata, options, cb)
    } else {
      client.echoBack(request, cb)
    }
  })
}

main()
main_promisify()
