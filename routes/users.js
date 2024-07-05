// step-1 => importing express and Router

const express = require("express");
const router = express.Router();
const validate = require("../utils/validator");

// step-2 =>  importing function from the controller

const {
  createUser,
  getAllUsers,
  getOneUser,
  updateOneUser,
  deleteOneUser,
  login,
} = require("../controller/user-controller.js");

// step-3 => define the function the you import from the controller on the route

router.post("/register", validate, createUser);
router.post("/login", validate, login);

// router.get("/:limit/:skip", getAllUsers);
// router.get("/:id", getOneUser);
// router.put("/:id", updateOneUser);
// router.delete("/:id", deleteOneUser);

module.exports = router;
