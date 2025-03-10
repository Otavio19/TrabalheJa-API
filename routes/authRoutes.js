import authController from "../controllers/authController.js";

export default async function authRoutes(fastify, options) {

  fastify.post("/auth/register", {
    schema: {
      description: "Registrar Usuário.",
      tags: ["Auth"],
      body:{
        type: "object",
        properties:{
          nome: { type: "string" },
          email: { type: "string" },
          senha: { type: "string" },
          telefone: { type: "string" },
          nivel: {type: "string"}
        }
      },
      params: {
        type: "object",
        properties: {
          
        }
      },
      response:{
        200: {
          description: "Usuário registrado!",
          type: "object",
          properties: {
            id: { type: "string" },
            email: { type: "string" },
            nome: { type: "string" },
            telefone: { type: "string" },
            nivel: {type: "string"}
          }
        },
        404: {
          description: "Eror ao registrar o usuário.",
          type: "object",
          properties: {
            message: { type: "string" },
          },
        }
      }
    },
    handler: authController.register
  });

  fastify.post("/auth/login", {
    schema: {
      description: "Acessar conta.",
      tags: ["Auth"],
      body: {
        type: "object",
        properties: {
          email: { type: "string" },
          senha: { type: "string" }
        }
      },
      response: {
        200: {
          description: "Usuário Logado",
          type: "object",
          properties: {
            message: { type: "string" },
            token: { type: "string"}
          }
        },
        404: {
          description: "Erro.",
          message: { type: "string" }
        }
      }
    },
    handler: authController.login
  });
}
