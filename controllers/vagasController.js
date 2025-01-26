const vagasRepository = require("../repositories/vagaRepository");

const vagasController = {
  async getAll(req, reply) {
    try {
      const vagas = await vagasRepository.findAll();
      reply.send(vagas);
    } catch (error) {
      console.error("Erro ao buscar vagas:", error);
      reply.status(500).send({ error: "Erro ao buscar vagas." });
    }
  },

  async getById(req, reply) {
    try {
      const { id } = req.params;
      const vaga = await vagasRepository.findById(id);

      if (!vaga.length) {
        return reply.status(404).send({ error: "Vaga não encontrada." });
      }

      reply.send(vaga[0]);
    } catch (error) {
      console.error("Erro ao buscar vaga:", error);
      reply.status(500).send({ error: "Erro ao buscar vaga." });
    }
  },

  async create(req, reply) {
    try {
      const novaVaga = req.body;

      if (!novaVaga.titulo) {
        return reply.status(400).send({ error: "O título da vaga é obrigatório." });
      }

      const vagaCriada = await vagasRepository.create(novaVaga);
      reply.status(201).send(vagaCriada[0]);
    } catch (error) {
      console.error("Erro ao criar vaga:", error);
      reply.status(500).send({ error: "Erro ao criar vaga." });
    }
  },

  async update(req, reply) {
    try {
      const { id } = req.params;
      const vagaAtualizada = await vagasRepository.update(id, req.body);

      if (!vagaAtualizada.length) {
        return reply.status(404).send({ error: "Vaga não encontrada." });
      }

      reply.send(vagaAtualizada[0]);
    } catch (error) {
      console.error("Erro ao atualizar vaga:", error);
      reply.status(500).send({ error: "Erro ao atualizar vaga." });
    }
  },

  async delete(req, reply) {
    try {
      const { id } = req.params;
      const vagaDeletada = await vagasRepository.delete(id);

      if (!vagaDeletada.length) {
        return reply.status(404).send({ error: "Vaga não encontrada." });
      }

      reply.send(vagaDeletada[0]);
    } catch (error) {
      console.error("Erro ao deletar vaga:", error);
      reply.status(500).send({ error: "Erro ao deletar vaga." });
    }
  },
};

module.exports = vagasController;
