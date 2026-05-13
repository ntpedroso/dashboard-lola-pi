import express from "express";

const router = express.Router();

import Paciente from "../models/Paciente.js";

import Auth from "../middlewares/Auth.js";

const listaPacientes = [
    {
        id: 1,
        nome: "Pedro",
        sobrenome: "Henrique",
        nivel: 1,
        status: "Em progresso",
        data_nasc: "07/08/2019",
        img: "/imgs/profile.jpg"
    },
    {
        id: 2,
        nome: "Maria",
        sobrenome: "Eduarda",
        nivel: 1,
        status: "Em progresso",
        data_nasc: "07/08/2019"
    },
    {
        id: 3,
        nome: "Maria",
        sobrenome: "Eduarda",
        nivel: 1,
        status: "Em progresso",
        data_nasc: "07/08/2019"
    },
    {
        id: 4,
        nome: "Maria",
        sobrenome: "Eduarda",
        nivel: 1,
        status: "Em progresso",
        data_nasc: "07/08/2019"
    },
    {
        id: 5,
        nome: "Maria",
        sobrenome: "Eduarda",
        nivel: 1,
        status: "Em progresso",
        data_nasc: "07/08/2019"
    },
    {
        id: 6,
        nome: "Maria",
        sobrenome: "Eduarda",
        nivel: 1,
        status: "Em progresso",
        data_nasc: "07/08/2019"
    }
];
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

    req.session.mensagemExcluir = null;

    Paciente.findAll()
    .then((pacientes) => {
      res.render("pacientes", {
        pacientes: pacientes,
        mensagemExcluir: mensagemExcluir
      });
    })
    .catch((error) => {
      console.log("Ocorreu um erro ao buscar os clientes." + error);
    });
});


//rota de cadastro de usuario (subrota /cadastrar)
router.post("/pacientes/cadastrar", (req, res) => {
  //criando as variáveis que irão armazenar os dados vindos do formulário
  const nome = req.body.nome;
  const sobrenome = req.body.sobrenome;
  const endereco = req.body.endereco;
  const sexo = req.body.sexo;
  const responsavel = req.body.responsavel;
  const data_nascimento = req.body.data_nascimento;
  const nivel_gravidade = req.body.nivel_gravidade;
  const contato = req.body.contato;
  const cpf = req.body.cpf;
  // enviando os dados para o banco
  // o método create cadastra as informações no banco
  Paciente.create({
    // primeiro é a coluna, segundo é a variável
    nome: nome,
    sobrenome: sobrenome,
    endereco: endereco,
    data_nascimento: data_nascimento,
    nivel_gravidade: nivel_gravidade,
    contato: contato,
    cpf: cpf,
    sexo: sexo,
    responsavel: responsavel,
    // se a promessa for bem sucedida, o usuário será redirecionado para a página de login
  })
    .then(() => {
      res.redirect("/pacientes");
      // falha
    })
    .catch((error) => {
      console.log("Ocorreu um erro ao cadastrar o cliente" + error);
    });
});

router.get("/pacientes/excluir/:id", (req,res) => {
    const id = req.params.id;
    Paciente.destroy({
        where: {
            id: id,
        },
    }).then(() => {
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
    res.redirect("/pacientes");
  });
});

export default router;