import express from "express";

const router = express.Router();

router.get("/atividades", function(req,res) {
    res.render("atividades")
});

export default router;