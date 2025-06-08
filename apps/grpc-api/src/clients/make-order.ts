import * as grpc from '@grpc/grpc-js'
import {
  OrderServiceClient,
  GetOrderRequest,
  CreateOrderRequest,
} from '../generated/order'
import { ProductServiceClient } from '../generated/product'
import { Order, Product } from '../generated/common'
import {
  CheckInventoryResponse,
  InventoryServiceClient,
} from '../generated/inventory'
import {
  PaymentServiceClient,
  ProcessPaymentResponse,
} from '../generated/payment'

// Common gRPC server address
const grpcAddress = 'localhost:50051'

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

const inventoryClient = new InventoryServiceClient(
  grpcAddress,
  grpc.credentials.createInsecure(),
)

const paymentClient = new PaymentServiceClient(
  grpcAddress,
  grpc.credentials.createInsecure(),
)

async function createOrderExample() {
  const req: CreateOrderRequest = {
    userId: 'user-123',
    productIds: ['p1', 'p2'],
  }

  // Step 1: Get product details (prices)
  const productPromises = req.productIds.map(
    (id) =>
      new Promise<Product>((resolve, reject) => {
        productClient.getProduct({ productId: id }, (err, product) => {
          if (err || !product) return reject(err || new Error('No product'))
          resolve(product)
        })
      }),
  )
  const products = await Promise.all(productPromises)

  // Calculate total price
  const totalPrice = products.reduce((sum, p) => sum + p.price, 0)
  console.log(
    'Step 1',
    'Get details of products in this order and calculate total price:',
  )
  console.log('Products are:', products)
  console.log('TotalPrice is:', totalPrice)

  // Step 2: Check Inventory
  const inventoryRes: CheckInventoryResponse = await new Promise(
    (resolve, reject) => {
      inventoryClient.checkInventory(
        { productIds: req.productIds },
        (err, res) => {
          if (err || !res)
            return reject(err || new Error('No inventory response'))
          resolve(res)
        },
      )
    },
  )

  // Check if any product is out of stock
  const outOfStock = inventoryRes.items.find((item) => item.quantity < 1)
  if (outOfStock) {
    console.error('Out of stock:', outOfStock.productId)
    return
  }
  console.log(
    'Step 2 Check inventory to find it is out of stock:',
    !!outOfStock,
  )

  // Step 3: Process Payment
  const paymentRes: ProcessPaymentResponse = await new Promise(
    (resolve, reject) => {
      paymentClient.processPayment(
        { userId: req.userId, amount: totalPrice, orderId: 'order-temp-id' },
        (err, res) => {
          if (err || !res) return reject(err || new Error('Payment failed'))
          resolve(res)
        },
      )
    },
  )

  if (!paymentRes.success) {
    console.error('Payment failed')
    return
  }

  console.log('Step 3 Make payment for the order:', paymentRes.success)

  // Step 4: Save Order (simulate)
  const order: Order = {
    id: 'order-temp-id',
    userId: req.userId,
    productIds: req.productIds,
    totalPrice,
    status: 'PENDING',
  }
  console.log('Step 4 Record the order as pending:', order)

  // Step 5: Update Inventory
  await new Promise<void>((resolve, reject) => {
    inventoryClient.updateInventory(
      {
        updates: req.productIds.map((productId) => ({
          productId,
          delta: -1,
        })),
      },
      (err) => {
        if (err) return reject(err)
        console.log('Inventory updated')
        resolve()
      },
    )
  })

  console.log('Step 5 Update product inventory:')

  // Step 6: It can be async, usually this is done by using kafka or RabbitMQ in Java

  console.log('Order creation process completed successfully')
}

// Example function to get an order
async function getOrderExample() {
  const req: GetOrderRequest = { orderId: 'order-id-123' }

  orderClient.getOrder(req, (err, order: Order | undefined) => {
    if (err) {
      console.error('GetOrder error:', err.message)
      return
    }
    console.log('Order details:', order)
  })
}

async function main() {
  try {
    await createOrderExample()
    await getOrderExample()
  } catch (error) {
    console.error('Error:', error)
  }
}

main()
