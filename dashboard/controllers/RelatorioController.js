import express from "express";
import Auth from "../middlewares/Auth.js";

const router = express.Router();

router.get("/relatorios", Auth, function(req,res) {
    res.render("relatorios");
});

router.get("/relatorios/fonema", Auth, (req, res) => {
  const dadosFonema = [
    { fonema: "/s/", erros: 32, acertos: 68, dificuldade: "Alta" },
    { fonema: "/r/", erros: 25, acertos: 75, dificuldade: "Média" },
    { fonema: "/l/", erros: 12, acertos: 88, dificuldade: "Baixa" },
    { fonema: "/ch/", erros: 40, acertos: 60, dificuldade: "Alta" }
  ];

  res.render("relatorioFonema", {
    dadosFonema
  });
});

router.get("/relatorios/atividade", Auth, (req, res) => {
  const dadosAtividade = [
    { data: "01/05", minutos: 35, paciente: "Joana Oliveira" },
    { data: "02/05", minutos: 50, paciente: "Joana Oliveira" },
    { data: "03/05", minutos: 28, paciente: "Joana Oliveira" },
    { data: "04/05", minutos: 65, paciente: "Joana Oliveira" },
    { data: "05/05", minutos: 42, paciente: "Joana Oliveira" }
  ];

  res.render("relatorioAtividade", {
    dadosAtividade
  });
});

router.get("/relatorios/acertos", Auth, (req, res) => {
  const dadosAtividade = [
    { data: "01/05", minutos: 35, paciente: "Joana Oliveira" },
    { data: "02/05", minutos: 50, paciente: "Joana Oliveira" },
    { data: "03/05", minutos: 28, paciente: "Joana Oliveira" },
    { data: "04/05", minutos: 65, paciente: "Joana Oliveira" },
    { data: "05/05", minutos: 42, paciente: "Joana Oliveira" }
  ];

  res.render("relatorioAcertos", {
    dadosAtividade
  });
});

router.get("/relatorios/evolucao", Auth, (req, res) => {
  const dadosEvolucao = [
    { semana: "Sem 1", paciente: "João", acertos: 40, erros: 60, evolucao: "Inicial" },
    { semana: "Sem 2", paciente: "João", acertos: 55, erros: 45, evolucao: "Boa" },
    { semana: "Sem 3", paciente: "João", acertos: 49, erros: 51, evolucao: "Oscilação" },
    { semana: "Sem 4", paciente: "João", acertos: 75, erros: 25, evolucao: "Alta" },
    { semana: "Sem 5", paciente: "João", acertos: 80, erros: 20, evolucao: "Alta" }
  ];

  res.render("relatorioEvolucao", {
    dadosEvolucao
  });
});

export default router;