import express from "express";

const router = express.Router();

router.get("/relatorios", function(req,res) {
    res.render("relatorios");
});

export default router;