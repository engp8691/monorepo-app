# How to run it

- Run in the folder of `apps/grpc-api`

```sh
protoc --plugin=protoc-gen-ts_proto=../../node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=./src/echo-sample/generated --ts_proto_opt=esModuleInterop=true,outputServices=grpc-js,env=node,useOptionals=messages --proto_path=./src/echo-sample/protos ./src/echo-sample/protos/*.proto
```

## Run the server

```sh
npx ts-node ./src/echo-sample/server.ts
# npx ts-node $(pwd)/server.ts
```

## Run the client

```sh
npx ts-node ./src/echo-sample/client.ts
# npx ts-node $(pwd)/client.ts
```
