import userController from "../controllers/userController.js"

export default async function userRoutes(fastify, options) {
  fastify.get("/users", {
    schema: {
      description: "Lista todos os usuários",
      tags: ["Users"],
      response: {
        200: {
          description: "Lista de usuários",
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string", format: "uuid" },
              nome: { type: "string" },
              email: { type: "string" },
              nivel: { type: "integer" },
              empresa: { type: "string" },
              telefone: { type: "string" },
              data_criacao: { type: "string" },
              ativo: { type: "boolean" },
              id_empresa: { type: "string" }
            },
          },
        },
        404: {
          description: "Usuários não encontrados.",
          type: "object",
          properties: {
            message: { type: "string" }
          }
        },
      },
    },
    handler: userController.getAllUsers,
  });

  fastify.get("/user/:id", {
    schema: {
      description: "Obtém um usuário por ID (UUID)",
      tags: ["Users"],
      params: {
        type: "object",
        properties: {
          id: {
            type: "string",
            format: "uuid"
          },
        },
        required: ["id"]
      },
      response: {
        200: {
          description: "Usuário encontrado",
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            nome: { type: "string" },
            email: { type: "string" },
            nivel: { type: "integer" },
            empresa: { type: "string" },
            telefone: { type: "string" },
            data_criacao: { type: "string" },
            ativo: { type: "boolean" },
            id_empresa: { type: "string" }
          },
        },
        404: {
          description: "Usuário não encontrado",
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    handler: userController.getUserById,
  });

  fastify.put("/users/:id", {
    schema: {
      description: "Atualizar usuário.",
      tags: ["Users"],
      params: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" }
        },
        required: ["id"]
      },
      body: {
        type: "object",
        properties: {
          nome: { type: "string" },
          email: { type: "string" },
          nivel: { type: "integer" },
          empresa: { type: "string" },
          telefone: { type: "string" },
          data_criacao: { type: "string" },
          ativo: { type: "boolean" },
        }
      },
      response: {
        200: {
          description: "Usuário Atualizado!",
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            nome: { type: "string" },
            email: { type: "string" },
            nivel: { type: "integer" },
            empresa: { type: "string" },
            telefone: { type: "string" },
            data_criacao: { type: "string" },
            ativo: { type: "boolean" },
          }
        },
        404: {
          description: "Usuário não encontrado",
          type: "object",
          properties: {
            message: { type: "string" },
          },
        }
      }
    },
    handler: userController.updateUser
  });

  fastify.delete("/users/:id", {
    schema: {
      description: "Deletar usuário.",
      tags: ["Users"],
      params: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" }
        },
        required: ["id"]
      },
      response: {
        200: {
          description: "Usuário Deletado!",
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            nome: { type: "string" }
          }
        },
        404: {
          description: "Usuário não encontrado",
          type: "object",
          properties: {
            message: { type: "string" },
          },
        }
      }
    },
    handler: userController.deleteUser
  });
}