const express = require("express");
const authMiddleware = require("../middleware/authMiddleware.js");

const { createCustomer, login, getCustomers, getCustomerById, updateCustomer, deleteCustomer } = require("../controllers/CustomerController");

const router = express.Router();

router.post("/register", createCustomer);
router.post("/login", login);
router.get("/", authMiddleware, getCustomers);
router.get("/:id", authMiddleware, getCustomerById);
router.put("/:id", authMiddleware, updateCustomer);
router.delete("/:id", authMiddleware, deleteCustomer);
router.get("/profile", authMiddleware, (req, res) => {
    res.json(req.user);
});

module.exports = router;