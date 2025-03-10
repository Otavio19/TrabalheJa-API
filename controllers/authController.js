import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import authRepository from "../repositories/authRepository.js";

const authController = {
    async register(req, reply) {
        try {
            const { nome, email, senha, telefone, nivel } = req.body;
    
            if (!nome || !email || !senha) {
                return reply.status(400).send({ error: "Nome, email e senha são obrigatórios." });
            }
    
            if (![1, 2, 3].includes(nivel)) {
                return reply.status(400).send({ error: "Nível inválido. Deve ser 1, 2 ou 3." });
            }
    
            const existingUser = await authRepository.findByEmail(email);
            if (existingUser) {
                return reply.status(409).send({ error: "O email já está em uso." });
            }
    
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(senha, saltRounds);
    
            const newUser = await authRepository.createUser(nome, email, hashedPassword, nivel, telefone || null);
    
            const token = jwt.sign({ id: newUser.id, email: newUser.email, nivel: nivel }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
            reply.status(201).send({
                message: "Usuário registrado com sucesso.",
                user: newUser,
                token: token
            });
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            reply.status(500).send({ error: "Erro ao registrar usuário." });
        }
    }
    ,

    async login(req, reply) {
        try {
            const { email, senha } = req.body;

            if (!email || !senha) {
                return reply.status(400).send({ error: "Email e senha são obrigatórios." });
            }

            const user = await authRepository.findByEmail(email);
            if (!user) {
                return reply.status(404).send({ error: "Usuário não encontrado." });
            }

            const isValidPassword = await bcrypt.compare(senha, user.senha);
            if (!isValidPassword) {
                return reply.status(401).send({ error: "Senha incorreta." });
            }

            const token = jwt.sign({ id: user.id, email: user.email,  nivel: user.nivel}, process.env.JWT_SECRET, { expiresIn: '1h' });

            reply.send({
                message: "Login bem-sucedido.",
                token: token
            });
        } catch (error) {
            reply.status(500).send({ error: "Erro ao realizar login." });
        }
    }
};

export default authController
