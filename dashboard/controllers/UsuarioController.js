import express from "express";

const router = express.Router();

import Usuario from "../models/Usuario.js";
import Fonoaudiologo from "../models/Fonoaudiologo.js";

import Auth from "../middlewares/Auth.js";

//importando bcrypt
import bcrypt from "bcrypt";

router.get("/cadastroUsuario", (req, res) => {
  res.render("cadastroUsuario");
});

router.get("/alterarSenha", Auth, function (req, res) {
  res.render("alterarSenha");
});

router.get("/cadastroUsuario", Auth, function (req, res) {
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

router.post("/cadastroUsuario/cadastrar", async (req, res) => {
  try {

    const { nome, email, crfa, telefone, usuario, senha } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(senha, salt);

    const novoUsuario = await Usuario.create({
      usuario: usuario,
      senha: hash,
      tipo: "Fono",
      ativo: true
    });

    await Fonoaudiologo.create({
      nome: nome,
      email: email,
      crfa: crfa,
      telefone: telefone,
      id_login: novoUsuario.id,
    });

    res.redirect("/");
  } catch (error) {
    console.log("Erro ao cadastrar usuário: " + error);
    res.redirect("/cadastroUsuario");
  }
});

//rota de autenticação (login)
router.post("/autenticacao", (req, res) => {
  //capturarando os dados do formulário
  const usuario = req.body.usuario;
  const senha = req.body.senha;

  //buscando o usuário no banco de dados
  Usuario.findOne({
    where: {
      usuario: usuario,
    },
  }).then((usuario) => {
    //se o usuário existir
    if (usuario != undefined) {
      //validar a senha ------------- senha do form --- senha do banco
      const correct = bcrypt.compareSync(senha, usuario.senha);

      //se a senha for válida
      if (correct) {

        if(usuario.tipo != "Fono") {
          return res.render("index", {
            erro: "Acesso permitido apenas para fonoaudiólogos"
          });
        }
        //procure na tabela fono o registro cujo id_login seja igual ao id do usuário que acabou de logar
        Fonoaudiologo.findOne({
          where: {
            id_login: usuario.id
          }
        }).then((fono) => {

          if(!fono) {
            return res.render("index", {
              erro: "Fonoaudiólogo não encontrado para esse login."
            });
          }
          //autoriza o login
          //cria a sessão para o usuário
          req.session.usuario = {
            //inserindo as informações do usuário na sessão
            id: usuario.id,
            usuario: usuario.usuario,
            tipo: usuario.tipo,
            id_fono: fono.id,
            nome: fono.nome,
          };

          res.redirect("/home");
        });
  //se a senha estiver incorreta
} else {
  res.render("index", {
    erro: "Usuário ou senha incorretos."
  })
}
    //caso o usuário não exista
    } else {
    res.render("index", {
      erro: "Usuário ou senha incorretos."
    })
  }
  });
});

router.get("/perfil", Auth, async (req, res) => {

  const fono = await Fonoaudiologo.findOne({
    where: {
      id: req.session.usuario.id_fono
    }
  });

  res.render("perfil", {
    fono: fono,
    usuario: req.session.usuario,
  });
});

export default router;
