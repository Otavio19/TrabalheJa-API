require("dotenv").config();
const fastify = require("fastify")({ logger: true });
const userRoutes = require("./routes/userRoutes");
const AuthRoutes = require("./routes/authRoutes");
const testRoutes = require('./routes/testRoute');
const vagasRoutes = require("./routes/vagasRoutes");

fastify.register(userRoutes, { prefix: "/api" });
fastify.register(AuthRoutes, { prefix: "/api" });
fastify.register(vagasRoutes, { prefix: "/api" });
fastify.register(testRoutes);

fastify.addHook('onRequest', (request, reply, done) => {
  reply.headers({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });
  done();
});

fastify.options('*', (request, reply) => {
  reply.status(200).send();
});

const config = {
  host: "0.0.0.0",
  port: process.env.PORT ?? 3000
};

const start = async () => {
  try {
    await fastify.listen(config);
    console.log("Servidor rodando em http://localhost:3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
