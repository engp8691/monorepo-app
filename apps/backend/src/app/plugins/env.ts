import fp from "fastify-plugin";
import env, { FastifyEnvOptions } from "@fastify/env";

const schema = {
  type: "object",
  required: ["PORT"],
  properties: {
    PORT: {
      type: "string", // Must be a string, not a number
      default: "3000",
    },
  },
};

// Define plugin options with correct typing
const options: FastifyEnvOptions = {
  confKey: "config", // Optional, default: 'config'
  schema,
  dotenv: true, // Enables .env file support
};

/**
 * @fastify/env Fastify plugin to check and validate environment variables.
 *
 * @see https://github.com/fastify/fastify-env
 */
export default fp<FastifyEnvOptions>(async (fastify) => {
  await fastify.register(env, options);
});
