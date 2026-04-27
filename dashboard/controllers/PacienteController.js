import express from "express";

const router = express.Router();

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

router.get("/pacientes", function(req,res) {
    res.render("pacientes", {
        listaPacientes : listaPacientes
    });
});

router.get("/pacientes/:id", function(req,res) {
    const paciente = listaPacientes.find(p => p.id == req.params.id);
    res.render("detalhePaciente", {
        paciente : paciente
    })
})

export default router;