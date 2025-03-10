import { neon } from "@neondatabase/serverless";
//const sql = neon(process.env.DATABASE_URL);

const sql = neon(process.env.DATABASE_URL);

const userRepository = {
  async findAll() {
    return await sql`SELECT * FROM usuarios`;
  },

  async findById(id) {
    return await sql`SELECT * FROM usuarios WHERE id = ${id}`;
  },

  async createUser(nome, email, senha, telefone) {
    return await sql`
      INSERT INTO usuarios (nome, email, senha, empresa_id, telefone)
      VALUES (${nome}, ${email}, ${senha}, 1, ${telefone})
      RETURNING id, nome, email, data_criacao, ativo;
    `;
  },

  async updateUser(id, nome, email) {
    return await sql`
      UPDATE usuarios
      SET nome = ${nome}, email = ${email}
      WHERE id = ${id}
      RETURNING *;
    `;
  },  

  async deleteUser(id) {
    return await sql`
      DELETE FROM usuarios
      WHERE id = ${id}
      RETURNING *;
    `;
  },
};

export default userRepository