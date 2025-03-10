import userRepository from "../repositories/userRepository.js";
import bcrypt from "bcrypt"

const userController = {
  async getAllUsers(req, reply) {
    try {
      const users = await userRepository.findAll();
      reply.send(users);
    } catch (error) {
      reply.status(500).send({ error: "Erro ao buscar usuários." });
    }
  },

  async getUserById(req, reply) {
    try {
      const { id } = req.params;
      const user = await userRepository.findById(id);
      console.log(user)
      if (!user.length) {
        return reply.status(404).send({ error: "Usuário não encontrado." });
      }
      reply.send(user[0]);
    } catch (error) {
      reply.status(500).send({ error: "Erro ao buscar usuário." });
    }
  },

  async registerUser(req, reply) {
    try {
      const { nome, email, senha, telefone } = req.body;

      if (!nome || !email || !senha) {
        return reply.status(400).send({ error: "Nome, email e senha são obrigatórios." });
      }

      // Gerar hash da senha
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(senha, saltRounds);

      // Criação do usuário
      const newUser = await userRepository.createUser(nome, email, hashedPassword, telefone || null);

      reply.status(201).send({
        message: "Usuário registrado com sucesso.",
        user: newUser[0],
      });
    } catch (error) {
      if (error.code === "23505") {
        return reply.status(409).send({ error: "O email já está em uso." });
      }
      reply.status(500).send({ error: "Erro ao registrar usuário." });
    }
  },

  async updateUser(req, reply) {
    try {
      const { id } = req.params;
      const { nome, email } = req.body;
      const updatedUser = await userRepository.updateUser(id, nome, email);
      if (!updatedUser.length) {
        return reply.status(404).send({ error: "Usuário não encontrado." });
      }
      reply.send(updatedUser[0]);
    } catch (error) {
      reply.status(500).send({ error: "Erro ao atualizar usuário." });
    }
  },

  async deleteUser(req, reply) {
    try {
      const { id } = req.params;
      const deletedUser = await userRepository.deleteUser(id);
      if (!deletedUser.length) {
        return reply.status(404).send({ error: "Usuário não encontrado." });
      }
      reply.send(deletedUser[0]);
    } catch (error) {
      reply.status(500).send({ error: "Erro ao deletar usuário." });
    }
  },
};

export default userController;
