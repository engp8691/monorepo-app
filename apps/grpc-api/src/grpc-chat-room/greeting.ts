import { format } from 'date-fns'
import * as readline from 'readline'
import { ChatServiceClient } from './generated/chat'
import { ChatMessage } from './generated/chat'
import * as grpc from '@grpc/grpc-js'

const client = new ChatServiceClient(
  'localhost:50051',
  grpc.credentials.createInsecure(),
)
const stream = client.chatStream()

stream.on('data', (msg: ChatMessage) => {
  console.log(
    `[${msg.sender}] says: ${msg.message} @${format(
      new Date(msg.timestamp),
      'HH:mm:ss MMM/dd/yyyy',
    )}`,
  )
})

// Simulate sending a message

function main() {
  const args = process.argv.slice(2)

  if (args.length === 0) {
    console.log('Usage: ts-node client.ts <name> [greetings]')
    process.exit(1)
  }

  const sender = args[0]
  const defaultMessage = args[1] ?? `Hello from ${sender}`

  const rl = readline.createInterface({
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

main()
