# MonorepoApp

[Learn more about this workspace setup and its capabilities](https://nx.dev/getting-started/tutorials/react-monorepo-tutorial?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects) or run `npx nx graph` to visually explore what was created. Now, let's get you up to speed!

## Finish your CI setup

[Click here to finish setting up your workspace!](https://cloud.nx.app/connect/mQKkAeobkc)

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

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new application, use:

```sh
npx nx g @nx/react:app demo
```

To generate a new library, use:

```sh
npx nx g @nx/react:lib mylib
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/getting-started/tutorials/react-monorepo-tutorial?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:

- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## The commands to do the test

- npx vitest run apps/frontend/src/app/app.test.tsx --coverage
- npx nx test frontend --coverage
- npx vitest run apps/backend/src/app/tests/employees.test.ts --coverage
- npx nx test backend --coverage
- npx nx serve frontend
- npx nx serve backend
- npx nx run frontend:storybook
- npx nx run frontend-e2e:e2e
- npx nx run frontend-e2e:e2e -- --project=chromium apps/frontend-e2e/src/form.spec.ts
- npx nx affected -t lint test build e2e

## Run e2e tests on your local machine

- modify the `apps/frontend-e2e/playwright.config.ts` file by uncommenting line line 11 to line 14
- npx nx run frontend-e2e:e2e

### Playwright can run all e2e tests in parallel, if we want to test or see a specific test only, it can be done with the following command

- npx nx run frontend-e2e:e2e -- --project=chromium apps/frontend-e2e/src/aggrid-filtering.spec.ts
- npx nx run frontend-e2e:e2e -- --project=chromium apps/frontend-e2e/src/form.spec.ts

### When pipeline fails to connect to nx cloud

- npx nx connect-to-nx-cloud

## Auto playwright test generation

npx playwright codegen <http://localhost:4200>

## Add gRPC

- brew install protobuf
- npx nx g @nx/node:app grpc-api --directory=apps/grpc-api
- npx nx g application apps/grpc-api --dry-run
- npm install --save-dev ts-proto
- npm install @grpc/grpc-js @grpc/proto-loader

### Run the rpc server and client: simple echo message

- npx nx run grpc-api:build-all
- npx nx serve grpc-api
- npx nx client grpc-api

### Run the rpc server and client: order, user and product case

- in the root folder of the repo
- npm run start:dev  (to start server)
- npx ts-node apps/grpc-api/src/clients/clients.ts (to run the clients)
- npx ts-node apps/grpc-api/src/clients/make-order-client.ts (make an order)

### Clean for re-install and re-run gRPC

- rm -rf node_modules
- rm -rf package-lock.json
- rm -rf apps/grpc-api/src/generated/*.ts
- npm cache clean --force
- npm run proto:gen

### explainations on Services interactions

```sh
Service Interaction Flow
OrderService.CreateOrder:

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
