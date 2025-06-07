import { Server, ServerCredentials } from '@grpc/grpc-js'
import { UserServiceService, UserServiceServer } from './generated/user'
import { OrderServiceService, OrderServiceServer } from './generated/order'
import {
  ProductServiceService,
  ProductServiceServer,
} from './generated/product'
import { User, Product, Order } from './generated/common'

const userService: UserServiceServer = {
  getUser: (call, callback) => {
    const response: User = {
      id: call.request.userId,
      email: 'yonglin@gmail.com',
      name: 'Alice Example',
    }
    callback(null, response)
  },
}

const orderService: OrderServiceServer = {
  getOrder: (call, callback) => {
    const response: Order = {
      id: call.request.orderId,
      userId: 'u123',
      productIds: ['p1', 'p2'],
    }
    callback(null, response)
  },
}

const productService: ProductServiceServer = {
  getProduct: (call, callback) => {
    const response: Product = {
      id: call.request.productId,
      name: 'Laptop',
      price: 1299.99,
    }
    callback(null, response)
  },
}

function startServer() {
  const server = new Server()
  server.addService(UserServiceService, userService)
  server.addService(OrderServiceService, orderService)
  server.addService(ProductServiceService, productService)

  const bindAddress = '0.0.0.0:50051'
  server.bindAsync(
    bindAddress,
    ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error('Server failed to start:', err)
        return
      }
      console.log(`gRPC Server running at ${bindAddress}`)
      // server.start()
    },
  )
}

startServer()
