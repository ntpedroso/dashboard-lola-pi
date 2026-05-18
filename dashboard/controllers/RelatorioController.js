import express from "express";
import Auth from "../middlewares/Auth.js";
import Paciente from "../models/Paciente.js"

const router = express.Router();

router.get("/relatorios", Auth, async (req, res) => {

  const pacientes = await Paciente.findAll({
    where: {
      ativo: true,
    }
  });

  const top5 = pacientes.slice(0, 5);

  res.render("relatorios", {
    pacientes: top5,
  });
});

router.get("/relatorios/fonema", Auth, async (req, res) => {
  const dadosFonema = [
    { fonema: "/s/", erros: 32, acertos: 68, dificuldade: "Alta" },
    { fonema: "/r/", erros: 25, acertos: 75, dificuldade: "Média" },
    { fonema: "/l/", erros: 12, acertos: 88, dificuldade: "Baixa" },
    { fonema: "/ch/", erros: 40, acertos: 60, dificuldade: "Alta" }
  ];

  const pacientes = await Paciente.findAll({
    where: {
      ativo: true,
    }
  });

  res.render("relatorioFonema", {
    dadosFonema,
    pacientes : pacientes
  });
});

router.get("/relatorios/atividade", Auth, async (req, res) => {
  const dadosAtividade = [
    { data: "01/05", minutos: 35, paciente: "Joana Oliveira" },
    { data: "02/05", minutos: 50, paciente: "Joana Oliveira" },
    { data: "03/05", minutos: 28, paciente: "Joana Oliveira" },
    { data: "04/05", minutos: 65, paciente: "Joana Oliveira" },
    { data: "05/05", minutos: 42, paciente: "Joana Oliveira" }
  ];

  const pacientes = await Paciente.findAll({
    where: {
      ativo: true,
    }
  });

  res.render("relatorioAtividade", {
    dadosAtividade,
    pacientes : pacientes
  });
});

router.get("/relatorios/evolucao", Auth, async (req, res) => {
  const dadosAtividade = [
    { data: "01/05", minutos: 35, paciente: "Joana Oliveira" },
    { data: "02/05", minutos: 50, paciente: "Joana Oliveira" },
    { data: "03/05", minutos: 28, paciente: "Joana Oliveira" },
    { data: "04/05", minutos: 65, paciente: "Joana Oliveira" },
    { data: "05/05", minutos: 42, paciente: "Joana Oliveira" }
  ];

  const pacientes = await Paciente.findAll({
    where: {
      ativo: true,
    }
  });

  res.render("relatorioEvolucao", {
    dadosAtividade,
    pacientes: pacientes
  });
});


export default router;