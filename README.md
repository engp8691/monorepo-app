# MonorepoApp

## Run tasks

To run the dev server for your app, use:

```sh
npx nx serve frontend
```

To create a production bundle:

```sh
npx nx build frontend
```

To see all available targets to run for a project, run:

```sh
npx nx show project frontend
```

## The commands to do all tests

```sh
npx vitest run apps/frontend/src/app/app.test.tsx --coverage
```

```sh
npx nx test frontend --coverage
```

```sh
npx vitest run apps/backend/src/app/tests/employees.test.ts --coverage
```

```sh
npx nx test backend --coverage
```

```sh
npx nx serve frontend
```

```sh
npx nx serve backend
```

```sh
npx nx run frontend:storybook
```

```sh
npx nx run frontend-e2e:e2e
```

```sh
npx nx run frontend-e2e:e2e -- --project=chromium apps/frontend-e2e/src/form.spec.ts
```

```sh
npx nx affected -t lint test build e2e
```

## Run e2e tests on your local machine

```sh
modify the `apps/frontend-e2e/playwright.config.ts` file by uncommenting line line 11 to line 14
```

```sh
npx nx run frontend-e2e:e2e
```

### Playwright can run all e2e tests in parallel, if we want to test or see a specific test only, it can be done with the following command

```sh
npx nx run frontend-e2e:e2e -- --project=chromium apps/frontend-e2e/src/aggrid-filtering.spec.ts
```

```sh
npx nx run frontend-e2e:e2e -- --project=chromium apps/frontend-e2e/src/form.spec.ts
```

### When pipeline fails to connect to nx cloud

```sh
npx nx connect-to-nx-cloud
```

## Auto playwright test generation

```sh
npx playwright codegen <http://localhost:4200>
```

## Add gRPC

```sh
brew install protobuf
```

```sh
npx nx g @nx/node:app grpc-api --directory=apps/grpc-api
```

```sh
npx nx g application apps/grpc-api --dry-run
```

```sh
npm install --save-dev ts-proto
```

```sh
npm install @grpc/grpc-js @grpc/proto-loader
```

### Run the rpc server and client: order, user and product case

### Start it in the root folder of the repo

```sh
cd /the/path/to/your/this/monorepo_app
```

### Clean for re-install and re-run gRPC

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
