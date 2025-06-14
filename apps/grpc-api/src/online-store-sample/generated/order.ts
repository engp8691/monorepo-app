// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.7.3
//   protoc               v5.29.3
// source: order.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import {
  type CallOptions,
  ChannelCredentials,
  Client,
  type ClientOptions,
  type ClientUnaryCall,
  type handleUnaryCall,
  makeGenericClientConstructor,
  Metadata,
  type ServiceError,
  type UntypedServiceImplementation,
} from "@grpc/grpc-js";
import { Order } from "./common";

export const protobufPackage = "ecommerce";

export interface CreateOrderRequest {
  userId: string;
  productIds: string[];
}

export interface GetOrderRequest {
  orderId: string;
}

function createBaseCreateOrderRequest(): CreateOrderRequest {
  return { userId: "", productIds: [] };
}

export const CreateOrderRequest: MessageFns<CreateOrderRequest> = {
  encode(message: CreateOrderRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    for (const v of message.productIds) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): CreateOrderRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateOrderRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.userId = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.productIds.push(reader.string());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateOrderRequest {
    return {
      userId: isSet(object.userId) ? globalThis.String(object.userId) : "",
      productIds: globalThis.Array.isArray(object?.productIds)
        ? object.productIds.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: CreateOrderRequest): unknown {
    const obj: any = {};
    if (message.userId !== "") {
      obj.userId = message.userId;
    }
    if (message.productIds?.length) {
      obj.productIds = message.productIds;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateOrderRequest>, I>>(base?: I): CreateOrderRequest {
    return CreateOrderRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateOrderRequest>, I>>(object: I): CreateOrderRequest {
    const message = createBaseCreateOrderRequest();
    message.userId = object.userId ?? "";
    message.productIds = object.productIds?.map((e) => e) || [];
    return message;
  },
};

function createBaseGetOrderRequest(): GetOrderRequest {
  return { orderId: "" };
}

export const GetOrderRequest: MessageFns<GetOrderRequest> = {
  encode(message: GetOrderRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.orderId !== "") {
      writer.uint32(10).string(message.orderId);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): GetOrderRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetOrderRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.orderId = reader.string();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetOrderRequest {
    return { orderId: isSet(object.orderId) ? globalThis.String(object.orderId) : "" };
  },

  toJSON(message: GetOrderRequest): unknown {
    const obj: any = {};
    if (message.orderId !== "") {
      obj.orderId = message.orderId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetOrderRequest>, I>>(base?: I): GetOrderRequest {
    return GetOrderRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetOrderRequest>, I>>(object: I): GetOrderRequest {
    const message = createBaseGetOrderRequest();
    message.orderId = object.orderId ?? "";
    return message;
  },
};

export type OrderServiceService = typeof OrderServiceService;
export const OrderServiceService = {
  createOrder: {
    path: "/ecommerce.OrderService/CreateOrder",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateOrderRequest): Buffer => Buffer.from(CreateOrderRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer): CreateOrderRequest => CreateOrderRequest.decode(value),
    responseSerialize: (value: Order): Buffer => Buffer.from(Order.encode(value).finish()),
    responseDeserialize: (value: Buffer): Order => Order.decode(value),
  },
  getOrder: {
    path: "/ecommerce.OrderService/GetOrder",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetOrderRequest): Buffer => Buffer.from(GetOrderRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer): GetOrderRequest => GetOrderRequest.decode(value),
    responseSerialize: (value: Order): Buffer => Buffer.from(Order.encode(value).finish()),
    responseDeserialize: (value: Buffer): Order => Order.decode(value),
  },
} as const;

export interface OrderServiceServer extends UntypedServiceImplementation {
  createOrder: handleUnaryCall<CreateOrderRequest, Order>;
  getOrder: handleUnaryCall<GetOrderRequest, Order>;
}

export interface OrderServiceClient extends Client {
  createOrder(
    request: CreateOrderRequest,
    callback: (error: ServiceError | null, response: Order) => void,
  ): ClientUnaryCall;
  createOrder(
    request: CreateOrderRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Order) => void,
  ): ClientUnaryCall;
  createOrder(
    request: CreateOrderRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Order) => void,
  ): ClientUnaryCall;
  getOrder(request: GetOrderRequest, callback: (error: ServiceError | null, response: Order) => void): ClientUnaryCall;
  getOrder(
    request: GetOrderRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Order) => void,
  ): ClientUnaryCall;
  getOrder(
    request: GetOrderRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Order) => void,
  ): ClientUnaryCall;
}

export const OrderServiceClient = makeGenericClientConstructor(
  OrderServiceService,
  "ecommerce.OrderService",
) as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): OrderServiceClient;
  service: typeof OrderServiceService;
  serviceName: string;
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export interface MessageFns<T> {
  encode(message: T, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): T;
  fromJSON(object: any): T;
  toJSON(message: T): unknown;
  create<I extends Exact<DeepPartial<T>, I>>(base?: I): T;
  fromPartial<I extends Exact<DeepPartial<T>, I>>(object: I): T;
}
