import fp from "fastify-plugin";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import { FastifyPluginAsync } from "fastify";

const swaggerPlugin: FastifyPluginAsync = async (fastify) => {
  await fastify.register(swagger, {
    openapi: {
      info: {
        title: "Fastify API",
        description: "API documentation for Fastify app",
        version: "1.0.0",
      },
      servers: [{ url: "http://localhost:3000" }],
    },
  });

  await fastify.register(swaggerUI, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "list",
      deepLinking: false,
    },
  });

  fastify.log.info("Swagger documentation available at /docs");
};

export default fp(swaggerPlugin);
