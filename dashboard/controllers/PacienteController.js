import express from "express";

const router = express.Router();

import Paciente from "../models/Paciente.js";
import Usuario from "../models/Usuario.js"
import bcrypt from "bcrypt";
import Auth from "../middlewares/Auth.js";

import multer from "multer";

router.get("/cadastroPaciente", Auth, function (req, res) {
  res.render("cadastroPaciente");
});

router.get("/alterarPaciente", Auth, function (req, res) {
  res.render("alterarPaciente");
});

router.get("/pacientes/:id", Auth, (req, res) => {
  const id = req.params.id;

  Paciente.findByPk(id)
    .then((paciente) => {
      res.render("detalhePaciente", {
        paciente: paciente
      });
    })
    .catch((error) => {
      console.log("Erro ao buscar paciente: " + error);
      res.redirect("/pacientes");
    });
});

router.get("/pacientes", function (req, res) {

  const mensagemExcluir = req.session.mensagemExcluir;
  const mensagemCadastrar = req.session.mensagemCadastrar;
  const mensagemAlterar = req.session.mensagemAlterar;
  

  req.session.mensagemExcluir = null;
  req.session.mensagemCadastrar = null;
  req.session.mensagemAlterar = null;

  Paciente.findAll({
    where: {
      ativo : true
    }
  })
    .then((pacientes) => {
      res.render("pacientes", {
        pacientes: pacientes,
        mensagemExcluir: mensagemExcluir,
        mensagemCadastrar: mensagemCadastrar,
        mensagemAlterar: mensagemAlterar
      });
    })
    .catch((error) => {
      console.log("Ocorreu um erro ao buscar os clientes." + error);
    });
});

//para upload de fotos com multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/pacientes");
  },
  filename: (req, file, cb) => {
    const nomeArquivo = Date.now() + "-" + file.originalname;
    cb(null, nomeArquivo);
  }
});

const upload = multer({ storage });

//rota de cadastro de usuario (subrota /cadastrar)
router.post("/pacientes/cadastrar", Auth, upload.single("fotoPerfil"), (req, res) => {
  const foto_perfil = req.file
  ? "/uploads/pacientes/" + req.file.filename
  : "/imgs/profile.png";

  const nomeLimpo = req.body.nome
  .normalize("NFD") // separa os acentos
  .replace(/[\u0300-\u036f]/g, "") // remove acentos
  .replace(/\s+/g, "") // remove espaços
  .toLowerCase();

  const usuarioPaciente = nomeLimpo + Math.floor(Math.random() * 1000);
  const senhaPadrao = "12345";
  const senhaHash = bcrypt.hashSync(senhaPadrao, 10);

  Usuario.create({
    usuario: usuarioPaciente,
    senha: senhaHash,
    tipo: "Paciente",
    ativo: true

  }).then((loginCriado) => {
    return Paciente.create({
      nome: req.body.nome,
      sobrenome: req.body.sobrenome,
      endereco: req.body.endereco,
      data_nascimento: req.body.data_nascimento,
      nivel_gravidade: req.body.nivel_gravidade,
      contato: req.body.contato,
      cpf: req.body.cpf,
      sexo: req.body.sexo,
      responsavel: req.body.responsavel,
      foto_perfil: foto_perfil,
      ativo: true,

      //chaves estrangeiras
      id_fono: req.session.usuario.id_fono,
      id_login: loginCriado.id,
    });
  })
  .then(() => {
    req.session.mensagemCadastrar = "Paciente cadastrado com sucesso!";
    res.redirect("/pacientes");
  })
  .catch((error) => {
    console.log("Ocorreu um erro ao cadastrar o paciente " + error);
  });
});

router.get("/pacientes/excluir/:id", (req, res) => {
  const id = req.params.id;

  Paciente.update(
    {
      ativo : false
    },
    {
      where: {
        id: id
      }
    }
  ).then(() => {
    req.session.mensagemExcluir = "Paciente excluído com sucesso!";
    res.redirect("/pacientes");
  }).catch((error) => {
    console.log("Ocorreu um erro ao excluir o paciente" + error);
  });
});

// rota de edição do paciente
router.get("/pacientes/editar/:id", Auth, (req, res) => {
  const id = req.params.id;
  //buscando o cliente no banco pelo id
  Paciente.findByPk(id).then((paciente) => {
    res.render("alterarPaciente", {
      //passando os dados do cliente para a página
      paciente: paciente,
    });
  });
});

//rota de alteração do paciente
router.post("/pacientes/alterar", Auth, (req, res) => {
  //coletar os dados do formulário
  const id = req.body.id;
  const nome = req.body.nome;
  const sobrenome = req.body.sobrenome;
  const endereco = req.body.endereco;
  const sexo = req.body.sexo;
  const responsavel = req.body.responsavel;
  const data_nascimento = req.body.data_nascimento;
  const nivel_gravidade = req.body.nivel_gravidade;
  const contato = req.body.contato;
  const cpf = req.body.cpf;

  //alterando o cliente no banco
  Paciente.update(
    {
      nome: nome,
      sobrenome: sobrenome,
      endereco: endereco,
      data_nascimento: data_nascimento,
      nivel_gravidade: nivel_gravidade,
      contato: contato,
      cpf: cpf,
      sexo: sexo,
      responsavel: responsavel,
    },
    {
      where: {
        id: id,
      },
    },
  ).then(() => {
    req.session.mensagemAlterar = "Paciente alterado com sucesso!";
    res.redirect("/pacientes");
  });
});

export default router;