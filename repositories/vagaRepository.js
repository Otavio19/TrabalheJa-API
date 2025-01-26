const { neon } = require("@neondatabase/serverless");
const sql = neon(process.env.DATABASE_URL);

const vagasRepository = {
  async findAll() {
    return await sql`SELECT * FROM vagas`;
  },

  async findById(id) {
    return await sql`SELECT * FROM vagas WHERE id = ${id}`;
  },

  async create(vaga) {
    const {
      titulo,
      resumo,
      responsabilidades,
      habilidades_obrigatorias,
      habilidades_desejaveis,
      beneficios,
      localizacao,
      faixa_salarial,
      horario_trabalho,
      cultura_empresa,
      instrucoes,
      data_limite,
      empresa_id
    } = vaga;

    return await sql`
      INSERT INTO vagas (
        titulo, resumo, responsabilidades, habilidades_obrigatorias, 
        habilidades_desejaveis, beneficios, localizacao, faixa_salarial,
        horario_trabalho, cultura_empresa, instrucoes, data_limite, empresa_id
      ) VALUES (
        ${titulo}, ${resumo}, ${responsabilidades}, ${habilidades_obrigatorias},
        ${habilidades_desejaveis}, ${beneficios}, ${localizacao}, ${faixa_salarial},
        ${horario_trabalho}, ${cultura_empresa}, ${instrucoes}, ${data_limite}, ${empresa_id}
      )
      RETURNING *;
    `;
  },

  async update(id, vaga) {
    const {
      titulo,
      resumo,
      responsabilidades,
      habilidades_obrigatorias,
      habilidades_desejaveis,
      beneficios,
      localizacao,
      faixa_salarial,
      horario_trabalho,
      cultura_empresa,
      instrucoes,
      data_limite,
    } = vaga;

    return await sql`
      UPDATE vagas SET
        titulo = ${titulo}, resumo = ${resumo}, responsabilidades = ${responsabilidades},
        habilidades_obrigatorias = ${habilidades_obrigatorias}, habilidades_desejaveis = ${habilidades_desejaveis},
        beneficios = ${beneficios}, localizacao = ${localizacao}, faixa_salarial = ${faixa_salarial},
        horario_trabalho = ${horario_trabalho}, cultura_empresa = ${cultura_empresa}, 
        instrucoes = ${instrucoes}, data_limite = ${data_limite}
      WHERE id = ${id}
      RETURNING *;
    `;
  },

  async delete(id) {
    return await sql`DELETE FROM vagas WHERE id = ${id} RETURNING *;`;
  },
};

module.exports = vagasRepository;
