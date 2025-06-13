import { format } from 'date-fns'
import * as readline from 'readline'
import * as grpc from '@grpc/grpc-js'
import { ChatServiceClient } from './generated/chat'
import { ChatMessage } from './generated/chat'

let client: ChatServiceClient
let stream: grpc.ClientDuplexStream<ChatMessage, ChatMessage>
let sender: string
let defaultMessage: string
let rl: readline.Interface
let backoff = 1
const max_backoff = 10

function setupClient() {
  client = new ChatServiceClient(
    'localhost:50051',
    grpc.credentials.createInsecure(),
  )
  stream = client.chatStream()

  stream.on('data', (msg: ChatMessage) => {
    console.log(
      `[${msg.sender}]: ${msg.message} @${format(
        new Date(msg.timestamp),
        'HH:mm:ss MMM/dd/yyyy',
      )}`,
    )
  })

  stream.on('error', async (err: grpc.ServiceError) => {
    if (err.code === grpc.status.UNAVAILABLE) {
      console.error(
        `⚠️  Server unavailable. Attempting to reconnect in ${backoff}...`,
      )
      setTimeout(setupClient, backoff * 1000)
      backoff = Math.min(backoff + 1, max_backoff)
    } else {
      console.error('Stream error:', err)
    }
  })

  stream.on('end', () => {
    // console.log(`🛑 Stream ended. Trying to reconnect in ${backoff}...`)
  })

  // Re-attach readline for new stream
  if (!rl) {
    rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: `${sender}> `,
    })

    rl.prompt()

    rl.on('line', (input: string) => {
      const message = input.trim() || defaultMessage

      const msg = ChatMessage.fromPartial({
        sender,
        message,
        timestamp: Date.now(),
      })

      stream.write(msg)
      rl.prompt()
    })

    rl.on('close', () => {
      console.log('Connection closed.')
      stream.end()
      process.exit(0)
    })
  }
}

function main() {
  const args = process.argv.slice(2)
  if (args.length === 0) {
    console.log('Usage: ts-node client.ts <name> [greeting]')
    process.exit(1)
  }

  sender = args[0]
  defaultMessage = args[1] ?? `Default message of ${sender}`

  setupClient()
}

main()
