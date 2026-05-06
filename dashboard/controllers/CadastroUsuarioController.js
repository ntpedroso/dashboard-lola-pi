import express from "express";

const router = express.Router();

router.get("/cadastroUsuario", function(req,res) {
    res.render("cadastroUsuario")
});

export default router;