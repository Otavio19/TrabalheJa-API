const { neon } = require("@neondatabase/serverless");
const sql = neon(process.env.DATABASE_URL);
const { randomUUID } = require("crypto");

const authRepository = {
    async findByEmail(email) {
        const result = await sql`SELECT * FROM usuarios WHERE email = ${email}`;
        return result.length ? result[0] : null;
    },

    async createUser(nome, email, senha, nivel, telefone) {
        //const id = randomUUID();

        return await sql`
      INSERT INTO usuarios ( nome, email, senha, nivel, empresa_id, telefone)
      VALUES ( ${nome}, ${email}, ${senha}, ${nivel}, 'f1e3bbaf-20fb-4ec2-8076-e02773be5a71', ${telefone})
      RETURNING id, nome, email, data_criacao, ativo;
    `;
    }

};

module.exports = authRepository;
