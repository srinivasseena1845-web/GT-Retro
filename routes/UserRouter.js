const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware.js");

const { createUser, login,updateUser,deleteUser } = require("../controllers/UserController.js");


router.post("/register", createUser);
router.post("/login", login);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);
router.get("/profile", authMiddleware, (req, res) => {
    res.json(req.user);
});

module.exports = router;