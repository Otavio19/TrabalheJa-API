import "./config.js";

import Fastify from "fastify";
import Swagger from "@fastify/swagger";

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoute.js";
import vagasRoutes from "./routes/vagasRoutes.js";

const fastify = Fastify({ logger: true });

await fastify.register(Swagger, {
  swagger: {
    info: {
      title: "TrabalheJa API",
      description: "Documentação da API do TrabalheJá",
      version: "1.0.0",
    },
    host: "localhost:3000",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
  },
});

await fastify.register(import('@fastify/swagger-ui'), {
  routePrefix: '/api',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false
  },
})


fastify.register(userRoutes, { prefix: "/api" });
fastify.register(authRoutes, { prefix: "/api" });
fastify.register(vagasRoutes, { prefix: "/api" });
fastify.register(testRoutes);

fastify.addHook("onRequest", (request, reply, done) => {
  reply.headers({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });
  done();
});

fastify.options("*", (request, reply) => {
  reply.status(200).send();
});

const config = {
  host: "0.0.0.0",
  port: process.env.PORT ?? 3000,
};

const start = async () => {
  try {
    await fastify.listen({port: config.port, host: config.host});
    console.log(`Servidor rodando em http://localhost:${config.port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
