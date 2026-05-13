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

export default router;