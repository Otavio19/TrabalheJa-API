const vagasController = require("../controllers/vagasController");

async function vagasRoutes(fastify, options) {
  fastify.get("/vagas", vagasController.getAll);
  fastify.get("/vagas/:id", vagasController.getById);
  fastify.post("/vagas", vagasController.create);
  fastify.put("/vagas/:id", vagasController.update);
  fastify.delete("/vagas/:id", vagasController.delete);
}

module.exports = vagasRoutes;
