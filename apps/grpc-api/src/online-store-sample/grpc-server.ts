import { Server, ServerCredentials } from '@grpc/grpc-js'
import * as grpc from '@grpc/grpc-js'

import { UserServiceService, UserServiceServer } from './generated/user'
import { OrderServiceService, OrderServiceServer } from './generated/order'
import {
  ProductServiceService,
  ProductServiceServer,
  ListProductsResponse,
} from './generated/product'
import {
  InventoryServiceService,
  InventoryServiceServer,
  CheckInventoryResponse,
  UpdateInventoryResponse,
  InventoryServiceClient,
} from './generated/inventory'
import {
  PaymentServiceService,
  PaymentServiceServer,
  ProcessPaymentResponse,
  PaymentServiceClient,
} from './generated/payment'

import { User, Product, Order, InventoryItem } from './generated/common'

const mockProduct: Product = {
  id: 'p1',
  name: 'Laptop',
  price: 1299.99,
  category: 'Electronics',
}

const mockUser: User = {
  id: 'u123',
  name: 'Alice Example',
  email: 'alice@example.com',
}

// ------------------- Services ------------------- //
// UserService: provides user info
const userService: UserServiceServer = {
  getUser: (call, callback) => {
    const response: User = {
      id: call.request.userId,
      name: mockUser.name,
      email: mockUser.email,
    }
    callback(null, response)
  },

  createUser: (call, callback) => {
    const request = call.request
    const newUser: User = {
      id: 'new-id',
      name: request.name,
      email: request.email,
    }
    console.log('User created:', newUser)
    callback(null, newUser)
  },
}

// ProductService: manages product info, used by OrderService and frontend
const productService: ProductServiceServer = {
  getProduct: (call, callback) => {
    // DB connection and query and other logic.
    // It simpply returns a mock product here
    const response: Product = {
      id: call.request.productId,
      name: mockProduct.name,
      price: mockProduct.price,
      category: mockProduct.category,
    }
    callback(null, response)
  },

  listProducts: (call, callback) => {
    // DB connection and query and other logic.
    // It simpply returns a mocked array of products
    const response: ListProductsResponse = {
      products: [
        {
          id: 'p1',
          name: 'Laptop',
          price: 1299.99,
          category: 'Electronics',
        },
        {
          id: 'p2',
          name: 'Phone',
          price: 799.99,
          category: 'Electronics',
        },
      ],
    }
    callback(null, response)
  },
}

// InventoryService: checks and updates stock
const inventoryService: InventoryServiceServer = {
  checkInventory: (call, callback) => {
    const { productIds } = call.request // note: camelCase from ts-proto

    const items: InventoryItem[] = productIds.map((productId) => ({
      productId,
      available: true,
      quantity: 100,
    }))

    const response: CheckInventoryResponse = { items }

    callback(null, response)
  },

  updateInventory: (call, callback) => {
    for (const update of call.request.updates) {
      console.log(
        `Inventory updated for product ${update.productId}, delta: ${update.delta}`,
      )
      // Normally you'd apply this delta to a DB or memory store
    }

    const response: UpdateInventoryResponse = { success: true }

    callback(null, response)
  },
}

// PaymentService: processes payment
const paymentService: PaymentServiceServer = {
  processPayment: (call, callback) => {
    console.log(
      `Processing payment for user ${call.request.userId}, amount: $${call.request.amount}`,
    )

    const response: ProcessPaymentResponse = {
      success: true,
      transactionId: 'txn-98765',
    }

    callback(null, response)
  },
}

const inventoryClient = new InventoryServiceClient(
  'localhost:50051',
  grpc.credentials.createInsecure(),
)

const paymentClient = new PaymentServiceClient(
  'localhost:50051',
  grpc.credentials.createInsecure(),
)

// OrderService: handles full flow
const orderService: OrderServiceServer = {
  createOrder: async (call, callback) => {
    const req = call.request

    // Step 1: Call InventoryService.CheckInventory
    inventoryClient.checkInventory(
      { productIds: req.productIds },

      (err, res) => {
        if (err || !res) {
          return callback(new Error('Inventory check failed'), null)
        }

        const outOfStock = res.items.find((item) => item.quantity < 1)
        if (outOfStock) {
          return callback(new Error('Some products are out of stock'), null)
        }

        // Step 2: Call PaymentService.ProcessPayment
        paymentClient.processPayment(
          {
            userId: req.userId,
            orderId: 'order-id-123',
            amount: 999.99,
          },
          (err, paymentRes) => {
            if (err || !paymentRes?.success) {
              return callback(new Error('Payment failed'), null)
            }

            // Step 3: Simulate saving the order
            const order: Order = {
              id: 'order-id-123',
              userId: req.userId,
              productIds: req.productIds,
              totalPrice: 2599.98,
              status: 'PENDING',
            }

            // Step 4: Call InventoryService.UpdateInventory
            inventoryClient.updateInventory(
              {
                updates: req.productIds.map((id) => ({
                  productId: id,
                  delta: -1,
                })),
              },
              () => {
                console.log('Inventory updated')
              },
            )

            // Step 5: Return the order
            callback(null, order)
          },
        )
      },
    )
  },

  getOrder: (call, callback) => {
    const order: Order = {
      id: call.request.orderId,
      userId: 'u123',
      productIds: ['p1', 'p2'],
      totalPrice: 2599.98,
      status: 'PENDING',
    }
    callback(null, order)
  },
}
// ------------------- Server Bootstrap ------------------- //

function startServer() {
  const server = new Server()

  server.addService(UserServiceService, userService)
  server.addService(ProductServiceService, productService)
  server.addService(OrderServiceService, orderService)
  server.addService(InventoryServiceService, inventoryService)
  server.addService(PaymentServiceService, paymentService)

  const address = '0.0.0.0:50051'
  server.bindAsync(address, ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error('Server startup error:', err)
      return
    }
    console.log(`✅ gRPC Server is running on ${address}`)
    // server.start()
  })
}

startServer()
