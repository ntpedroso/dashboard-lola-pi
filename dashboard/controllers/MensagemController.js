import express from "express";

const router = express.Router();

router.get("/mensagens", (req,res) => {
    res.render("mensagens");
});

export default router;