import express from "express";

const router = express.Router();

router.get("/alterarSenha", function(req,res) {
    res.render("alterarSenha")
});

export default router;
