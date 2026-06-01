import express from "express";

const router = express.Router();

import Usuario from "../models/Usuario.js";
import Fonoaudiologo from "../models/Fonoaudiologo.js";

import Auth from "../middlewares/Auth.js";

//importando bcrypt
import bcrypt from "bcrypt";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/fono");
  },

  filename: (req, file, cb) => {
    const nomeArquivo = Date.now() + "-" + file.originalname;

    cb(null, nomeArquivo);
  }
});

const upload = multer({ storage });

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
  try {
    const { nome, email, crfa, telefone, usuario, senha } = req.body;

    const usuarioExistente = await Usuario.findOne({
      where: { usuario: usuario }
    });

    if (usuarioExistente) {
      return res.render("cadastroUsuario", {
        erro: "Esse nome de usuário já está em uso."
      });
    }

    const senhaHash = bcrypt.hashSync(senha, 10);

    const novoUsuario = await Usuario.create({
      usuario: usuario,
      email: email,
      senha: senhaHash,
      tipo: "Fono",
      ativo: true
    });

    await Fonoaudiologo.create({
      nome: nome,
      email: email,
      crfa: crfa,
      telefone: telefone,
      id_login: novoUsuario.id
    });

    res.redirect("/");
  } catch (error) {
    console.log("Erro ao cadastrar usuário:", error);

    res.render("cadastroUsuario", {
      erro: "Ocorreu um erro ao cadastrar o usuário."
    });
  }
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
      foto_perfil: fono.foto_perfil
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

  const fono = await Fonoaudiologo.findByPk(
    req.session.usuario.id_fono
  );

  res.render("perfil", {
    fono: fono,
    usuario: req.session.usuario
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

router.get("/perfil/editar", Auth, async (req, res) => {

  const idFono = req.session.usuario.id_fono;

  const fono = await Fonoaudiologo.findByPk(idFono);

  res.render("editarPerfil", {
    fono: fono,
    usuario: req.session.usuario
  });

});

router.post(
  "/perfil/editar",
  Auth,
  upload.single("fotoPerfil"),

  async (req, res) => {

    const idFono = req.session.usuario.id_fono;

    const dadosAtualizacao = {
      nome: req.body.nome,
      email: req.body.email,
      crfa: req.body.crfa,
      telefone: req.body.telefone
    };

    if (req.file) {
      dadosAtualizacao.foto_perfil =
        "/uploads/fono/" + req.file.filename;
    }

    await Fonoaudiologo.update(
      dadosAtualizacao,
      {
        where: {
          id: idFono
        }
      }
    );

    req.session.usuario.nome = req.body.nome;

    res.redirect("/perfil");
  }
);

export default router;
