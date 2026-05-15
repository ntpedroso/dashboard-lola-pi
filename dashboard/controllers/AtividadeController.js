import express from "express";
import Paciente from "../models/Paciente.js";
import Auth from "../middlewares/Auth.js";

const router = express.Router();

router.get("/atividades", Auth, async (req, res) => {

    const mensagemAtualizar = req.session.mensagemAtualizar;

    req.session.mensagemAtualizar = null;

    const pacientes = await Paciente.findAll({
        where: {
            ativo: true
        }
    });

    res.render("atividades", {
        pacientes: pacientes,
        mensagemAtualizar: mensagemAtualizar,
    });
});

router.post("/atividades/atualizar", Auth, (req, res) => {
  req.session.mensagemAtualizar = "Atividades atualizadas com sucesso!";
  res.redirect("/atividades");
});

export default router;