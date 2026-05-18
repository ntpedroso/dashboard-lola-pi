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

router.get("/alterarSenha", function (req, res) {
  res.render("alterarSenha", {
    usuarioEncontrado: null,
    erro: null,
    sucesso: null
  });
});

router.post("/alterarSenha/procurar", async (req, res) => {
  const usuario = req.body.usuario;

  const usuarioEncontrado = await Usuario.findOne({
    where: {
      usuario: usuario
    }
  });

  if (!usuarioEncontrado) {
    return res.render("alterarSenha", {
      usuarioEncontrado: null,
      erro: "Usuário não encontrado."
    });
  }

  res.render("alterarSenha", {
    usuarioEncontrado: usuarioEncontrado,
    erro: null
  });
});

router.post("/alterarSenha/salvar", async (req, res) => {
  const id = req.body.id;
  const novaSenha = req.body.novaSenha;
  const confirmarSenha = req.body.confirmarSenha;

  if (novaSenha !== confirmarSenha) {
    return res.render("alterarSenha", {
      usuarioEncontrado: {
        id: id,
        usuario: req.body.usuario
      },
      erro: "As senhas não coincidem."
    });
  }

  const senhaHash = bcrypt.hashSync(novaSenha, 10);

  await Usuario.update(
    {
      senha: senhaHash
    },
    {
      where: {
        id: id
      }
    }
  );

  res.redirect("/");
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

router.post("/cadastroUsuario/cadastrar", async (req, res) => {
  const { usuario, email, senha } = req.body;

  const usuarioExistente = await Usuario.findOne({
    where: {
      usuario: usuario
    }
  });

  if (usuarioExistente) {
    return res.render("cadastroUsuario", {
      erro: "Esse nome de usuário já está em uso."
    });
  }

  await Usuario.create({
    usuario: usuario,
    email: email,
    senha: senhaHash
  });

  res.redirect("/");
});

// rota de autenticação (login)
router.post("/autenticacao", async (req, res) => {
  const { usuario, senha } = req.body;

  try {
    const usuarioEncontrado = await Usuario.findOne({
      where: {
        usuario: usuario,
      },
    });

    if (!usuarioEncontrado) {
      return res.render("index", {
        erro: "Usuário ou senha incorretos.",
      });
    }

    if (usuarioEncontrado.ativo === false || usuarioEncontrado.ativo === 0) {
      return res.render("index", {
        contaDesativada: true,
        usuario: usuarioEncontrado.usuario,
        erro: "Essa conta está desativada."
      });
    }

    const correct = bcrypt.compareSync(senha, usuarioEncontrado.senha);

    if (!correct) {
      return res.render("index", {
        erro: "Usuário ou senha incorretos.",
      });
    }

    if (usuarioEncontrado.tipo !== "Fono") {
      return res.render("index", {
        erro: "Acesso permitido apenas para fonoaudiólogos.",
      });
    }

    const fono = await Fonoaudiologo.findOne({
      where: {
        id_login: usuarioEncontrado.id,
      },
    });

    if (!fono) {
      return res.render("index", {
        erro: "Fonoaudiólogo não encontrado para esse login.",
      });
    }

    req.session.usuario = {
      id: usuarioEncontrado.id,
      usuario: usuarioEncontrado.usuario,
      tipo: usuarioEncontrado.tipo,
      id_fono: fono.id,
      nome: fono.nome,
    };

    res.redirect("/home");
  } catch (error) {
    console.log("Erro ao autenticar usuário: " + error);

    res.render("index", {
      erro: "Ocorreu um erro ao tentar fazer login.",
    });
  }
});

//encerrar a sessão
router.get("/logout", Auth, (req, res) => {
  req.session.destroy((erro) => {
    if (erro) {
      console.log("Erro ao encerrar sessão:", erro);
      return res.redirect("/home");
    }

    res.clearCookie("connect.sid");

    res.redirect("/");
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

router.post("/usuario/desativar", Auth, async (req, res) => {
  const id = req.session.usuario.id;

  await Usuario.update(
    {
      ativo: false
    },
    {
      where: {
        id: id
      }
    }
  );

  req.session.destroy(() => {
    res.redirect("/");
  });
});

//reativar a conta
router.post("/usuario/reativar", async (req, res) => {
  const usuario = req.body.usuario;

  await Usuario.update(
    {
      ativo: true
    },
    {
      where: {
        usuario: usuario
      }
    }
  );

  res.render("index", {
    sucesso: "Conta reativada com sucesso!"
  });
});

export default router;
