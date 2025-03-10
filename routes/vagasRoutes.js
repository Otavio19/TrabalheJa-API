import vagasController from "../controllers/vagasController.js";

export default async function vagasRoutes(fastify, options) {

  fastify.get("/vagas", {
    schema: {
      description: "Lista todas as vagas.",
      tags: ["Vagas"],
      response: {
        200: {
          description: "Lista de Vagas",
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string", format: "uuid" },
              titulo: { type: "string" },
              resumo: { type: "string" },
              responsabilidade: { type: "string" },
              habilidades_obrigatorias: { type: "string" },
              habilidades_desejaveis: { type: "string" },
              beneficios: { type: "string" },
              localizacao: { type: "string" },
              faixa_salarial: { type: "string" },
              horario_trabalho: { type: "string" },
              cultura_trabalho: { type: "string" },
              instrucoes: { type: "string" },
              data_limite: { type: "string" },
              data_criacao: { type: "string" },
              empresa_id: { type: "string" },
            }
          }
        },
        404: {
          description: "Vagas não encontradas",
          type: "object",
          properties: {
            message: { type: "string" },
          },
        }
      }
    },
    handler: vagasController.getAll
  });

  fastify.get("/vaga/:id", {
    schema: {
      description: "Obtém uma vaga por ID (UUID)",
      tags: ["Vagas"],
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
          description: "Vaga encontrada!",
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            titulo: { type: "string" },
            resumo: { type: "string" },
            responsabilidade: { type: "string" },
            habilidades_obrigatorias: { type: "string" },
            habilidades_desejaveis: { type: "string" },
            beneficios: { type: "string" },
            localizacao: { type: "string" },
            faixa_salarial: { type: "string" },
            horario_trabalho: { type: "string" },
            cultura_trabalho: { type: "string" },
            instrucoes: { type: "string" },
            data_limite: { type: "string" },
            data_criacao: { type: "string" },
            empresa_id: { type: "string" },
          }
        },
        404: {
          description: "Vaga não encontrada",
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    handler: vagasController.getById
  });

  fastify.post("/vagas", {
    schema: {
      description: "Cria uma nova vaga de emprego.",
      tags: ["Vagas"],
      params: {
        type: "object",
        properties: {
        }
      },
      body: {
        type: "object",
        properties: {
          titulo: { type: "string" },
          empresa_id: { type: "string" },
          resumo: { type: "string" },
          responsabilidade: { type: "string" },
          habilidades_obrigatorias: { type: "string" },
          habilidades_desejaveis: { type: "string" },
          beneficios: { type: "string" },
          localizacao: { type: "string" },
          faixa_salarial: { type: "string" },
          horario_trabalho: { type: "string" },
          cultura_trabalho: { type: "string" },
          instrucoes: { type: "string" },
          data_limite: { type: "string" }
        },
        required: ["titulo", "empresa_id"]
      },
      response: {
        200: {
          description: "Vaga Criada!",
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            titulo: { type: "string" },
            resumo: { type: "string" },
            responsabilidade: { type: "string" },
            habilidades_obrigatorias: { type: "string" },
            habilidades_desejaveis: { type: "string" },
            beneficios: { type: "string" },
            localizacao: { type: "string" },
            faixa_salarial: { type: "string" },
            horario_trabalho: { type: "string" },
            cultura_trabalho: { type: "string" },
            instrucoes: { type: "string" },
            data_limite: { type: "string" },
            data_criacao: { type: "string" },
            empresa_id: { type: "string" },
          }
        },
        404: {
          description: "Erro ao criar a Vaga.",
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    handler: vagasController.create
  });

  fastify.put("/api/vagas/:id", {
    schema: {
      description: "Atualiza uma vaga por ID",
      tags: ["Vagas"],
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
          titulo: { type: "string" },
          resumo: { type: "string" },
          responsabilidade: { type: "string" },
          habilidades_obrigatorias: { type: "string" },
          habilidades_desejaveis: { type: "string" },
          beneficios: { type: "string" },
          localizacao: { type: "string" },
          faixa_salarial: { type: "string" },
          horario_trabalho: { type: "string" },
          cultura_empresa: { type: "string" },
          instrucoes: { type: "string" },
          data_limite: { type: "string", format: "date-time" }
        },
        required: ["titulo", "empresa_id"]
      },
      response: {
        200: {
          description: "Vaga atualizada com sucesso",
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            titulo: { type: "string" },
            resumo: { type: "string" },
            responsabilidade: { type: "string" },
            habilidades_obrigatorias: { type: "string" },
            habilidades_desejaveis: { type: "string" },
            beneficios: { type: "string" },
            localizacao: { type: "string" },
            faixa_salarial: { type: "string" },
            horario_trabalho: { type: "string" },
            cultura_empresa: { type: "string" },
            instrucoes: { type: "string" },
            data_limite: { type: "string", format: "date-time" },
            data_criacao: { type: "string", format: "date-time" },
            empresa_id: { type: "string", format: "uuid" }
          }
        },
        404: {
          description: "Vaga não encontrada",
          type: "object",
          properties: {
            message: { type: "string" }
          }
        }
      }
    },
    handler: vagasController.update
  });


  fastify.delete("/vagas/:id", {
    schema: {
      description: "Deletar Vaga.",
      tags: ["Vagas"],
      params: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" }
        },
        required: ["id"]
      },
      response: {
        200: {
          description: "Vaga Deletada!",
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            nome: { type: "string" }
          }
        },
        404: {
          description: "Vaga não encontrada",
          type: "object",
          properties: {
            message: { type: "string" },
          },
        }
      }
    },
    handler: vagasController.delete
  });
}