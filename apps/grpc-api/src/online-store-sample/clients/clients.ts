import * as grpc from '@grpc/grpc-js'
import { UserServiceClient, GetUserRequest } from '../generated/user'
import { OrderServiceClient, GetOrderRequest } from '../generated/order'
import { ProductServiceClient, GetProductRequest } from '../generated/product'
import { Order, Product, User } from '../generated/common'

// Common gRPC server address
const grpcAddress = 'localhost:50051'

// User client
const userClient = new UserServiceClient(
  grpcAddress,
  grpc.credentials.createInsecure(),
)

// Order client
const orderClient = new OrderServiceClient(
  grpcAddress,
  grpc.credentials.createInsecure(),
)

// Product client
const productClient = new ProductServiceClient(
  grpcAddress,
  grpc.credentials.createInsecure(),
)

async function getUser(userId: string): Promise<User> {
  return new Promise((resolve, reject) => {
    const request: GetUserRequest = { userId }
    userClient.getUser(request, (err, response) => {
      if (err) return reject(err)
      resolve(response)
    })
  })
}

async function getOrder(orderId: string): Promise<Order> {
  return new Promise((resolve, reject) => {
    const request: GetOrderRequest = { orderId }
    orderClient.getOrder(request, (err, response) => {
      if (err) return reject(err)
      resolve(response)
    })
  })
}

async function getProduct(productId: string): Promise<Product> {
  return new Promise((resolve, reject) => {
    const request: GetProductRequest = { productId }
    productClient.getProduct(request, (err, response) => {
      if (err) return reject(err)
      resolve(response)
    })
  })
}

async function main() {
  try {
    const order = await getOrder('54321')
    console.log('Order:', order)

    const user = await getUser(order.userId)
    console.log('User:', user)

    const product = await getProduct(order.productIds[0])
    console.log('Product:', product)
  } catch (error) {
    console.error('Error:', error)
  }
}

main()
