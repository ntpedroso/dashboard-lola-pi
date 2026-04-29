import express from "express";

const router = express.Router();

router.get("/cadastroPaciente", function(req,res) {
    res.render("cadastroPaciente");
});

export default router;