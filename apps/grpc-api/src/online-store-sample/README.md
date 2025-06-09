# Run the gRPC online store sample: Order, User, Product, Inventory and Payment services

## Start it in the root folder of the repo

```sh
cd /the/path/to/your/this/monorepo_app
```

## Clean for re-install and re-run gRPC

```sh
rm -rf node_modules
```

```sh
rm -rf package-lock.json
```

```sh
rm -rf apps/grpc-api/src/online-store-sample/generated/*.ts
```

```sh
npm cache clean --force
```

```sh
npm install
```

```sh
npm run proto:gen
```

### To start server

```sh
npm run proto:server:start
```

### To run and check all the clients

```sh
npx ts-node apps/grpc-api/src/online-store-sample/clients/clients.ts
```

### To test making an order

```sh
npx ts-node apps/grpc-api/src/online-store-sample/clients/make-order-client.ts
```

### explainations on Services interactions

The is a system of sample online store includes User, Product, Order, Inventory and Payment services.
When an order is made, all the services interact together via gRPC.
The majar interactions and steps are discribed as follows

```sh
Service Interaction Flow
OrderService.CreateOrder:

Call UserService.GetUser for user verification

Calls ProductService.GetProduct for price

Calls InventoryService.CheckInventory to confirm stock

Calls PaymentService.ProcessPayment to process payment

On success, saves order and calls InventoryService.UpdateInventory

ProductService:

Only manages product info

Used by both frontend and OrderService

UserService:

Returns user info for OrderService, PaymentService, and CustomerService
```
