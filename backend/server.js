require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./db");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.JWT_SECRET;

// Rota de cadastro
app.post("/register", async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ message: "Preencha todos os campos" });
    }

    try {
        const hashedPassword = await bcrypt.hash(senha, 10);

        db.query(
            "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
            [nome, email, hashedPassword],
            (err, result) => {
                if (err) {
                    return res.status(500).json({ message: "Erro ao cadastrar usuário" });
                }
                res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
            }
        );
    } catch (error) {
        res.status(500).json({ message: "Erro no servidor" });
    }
});

// Rota de login
app.post("/login", (req, res) => {
    const { email, senha } = req.body;

    db.query("SELECT * FROM usuarios WHERE email = ?", [email], async (err, results) => {
        if (err) return res.status(500).json({ message: "Erro no servidor" });
        if (results.length === 0) return res.status(401).json({ message: "Usuário não encontrado" });

        const user = results[0];

        const isPasswordValid = await bcrypt.compare(senha, user.senha);
        if (!isPasswordValid) return res.status(401).json({ message: "Senha incorreta" });

        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

        res.status(200).json({ message: "Login bem-sucedido!", token, user: { id: user.id, nome: user.nome, email: user.email } });
    });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
