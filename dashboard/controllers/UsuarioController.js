import express from "express";

const router = express.Router();

import Usuario from "../models/Usuario.js";


router.get("/alterarSenha", function(req,res) {
    res.render("alterarSenha")
});

router.get("/perfil", (req,res) => {
    res.render("perfil");
});

router.get("/cadastroUsuario", function (req, res) {
    Usuario.findAll()
    .then((usuarios) => {
      res.render("cadastroUsuario", {
        usuarios: usuarios,
      });
    })
    .catch((error) => {
      console.log("Ocorreu um erro ao buscar os clientes." + error);
    });
});

//rota de cadastro de usuario (subrota /cadastrar)
router.post("/cadastroUsuario/cadastrar", (req, res) => {
  //criando as variáveis que irão armazenar os dados vindos do formulário
  const usuario = req.body.usuario;
  const senha = req.body.senha;
  // enviando os dados para o banco
  // o método create cadastra as informações no banco
  Usuario.create({
    // primeiro é a coluna, segundo é a variável
    usuario: usuario,
    senha: senha,
    // se a promessa for bem sucedida, o usuário será redirecionado para a página de login
  })
    .then(() => {
      res.redirect("/");
      // falha
    })
    .catch((error) => {
      console.log("Ocorreu um erro ao cadastrar o cliente" + error);
    });
});





export default router;