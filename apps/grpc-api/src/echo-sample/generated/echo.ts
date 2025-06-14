// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.7.3
//   protoc               v5.29.3
// source: echo.proto

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

export const protobufPackage = "echo";

export interface EchoRequest {
  message: string;
}

export interface EchoResponse {
  message: string;
}

function createBaseEchoRequest(): EchoRequest {
  return { message: "" };
}

export const EchoRequest: MessageFns<EchoRequest> = {
  encode(message: EchoRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): EchoRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEchoRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.message = reader.string();
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

  fromJSON(object: any): EchoRequest {
    return { message: isSet(object.message) ? globalThis.String(object.message) : "" };
  },

  toJSON(message: EchoRequest): unknown {
    const obj: any = {};
    if (message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EchoRequest>, I>>(base?: I): EchoRequest {
    return EchoRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EchoRequest>, I>>(object: I): EchoRequest {
    const message = createBaseEchoRequest();
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseEchoResponse(): EchoResponse {
  return { message: "" };
}

export const EchoResponse: MessageFns<EchoResponse> = {
  encode(message: EchoResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): EchoResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEchoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.message = reader.string();
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

  fromJSON(object: any): EchoResponse {
    return { message: isSet(object.message) ? globalThis.String(object.message) : "" };
  },

  toJSON(message: EchoResponse): unknown {
    const obj: any = {};
    if (message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EchoResponse>, I>>(base?: I): EchoResponse {
    return EchoResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EchoResponse>, I>>(object: I): EchoResponse {
    const message = createBaseEchoResponse();
    message.message = object.message ?? "";
    return message;
  },
};

export type EchoServiceService = typeof EchoServiceService;
export const EchoServiceService = {
  echoBack: {
    path: "/echo.EchoService/EchoBack",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: EchoRequest): Buffer => Buffer.from(EchoRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer): EchoRequest => EchoRequest.decode(value),
    responseSerialize: (value: EchoResponse): Buffer => Buffer.from(EchoResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer): EchoResponse => EchoResponse.decode(value),
  },
} as const;

export interface EchoServiceServer extends UntypedServiceImplementation {
  echoBack: handleUnaryCall<EchoRequest, EchoResponse>;
}

export interface EchoServiceClient extends Client {
  echoBack(
    request: EchoRequest,
    callback: (error: ServiceError | null, response: EchoResponse) => void,
  ): ClientUnaryCall;
  echoBack(
    request: EchoRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: EchoResponse) => void,
  ): ClientUnaryCall;
  echoBack(
    request: EchoRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: EchoResponse) => void,
  ): ClientUnaryCall;
}

export const EchoServiceClient = makeGenericClientConstructor(EchoServiceService, "echo.EchoService") as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): EchoServiceClient;
  service: typeof EchoServiceService;
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
