const userController = require("../controllers/userController");

async function userRoutes(fastify, options) {
  fastify.get("/users", userController.getAllUsers);
  fastify.get("/users/:id", userController.getUserById);
  fastify.put("/users/:id", userController.updateUser);
  fastify.delete("/users/:id", userController.deleteUser);
}

module.exports = userRoutes;
