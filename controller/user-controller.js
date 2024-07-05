const usersModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= create user ================
const createUser = async (req, res) => {
  const user = req.body;
  console.log(user);

  try {
    // Check if the user already exists
    let existingUser = await usersModel.findOne({ email: user.email });
    console.log("existingUser:", existingUser);

    if (existingUser) {
      return res.status(409).json({ message: "User already exists, please login." });
    }

    // Create a new user
    let newUser = await usersModel.create(user);

    // Convert newUser to an object and exclude the password
    newUser = newUser.toObject();
    delete newUser.password;

    res.status(201).json({ message: "New user is created", data: newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; // =====================================================================================
// ================ login ================

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await usersModel.findOne({ email: email });
  // if the user is not existed
  if (!user)
    return res.status(404).json({ message: "invalide email or password " });

  // check the password using bycryp
  let isValid = bcrypt.compare(password, user.password);
  if (!isValid) res.status(401).json({ message: "invalide email or password" });

  // generate token
  const token = jwt.sign(
    { id: user._id, name: user.email },
    process.env.SECRET,
    { expiresIn: "1h" }
  );
  //sent token to the user
  res.status(200).json({ token: token });
};
// =====================================================================================
// ================ get all users ================
const getAllUsers = async (req, res) => {
  let limit = parseInt(req.params.limit);
  let skip = parseInt(req.params.skip);

  try {
    let users = await usersModel.find().limit(limit).skip(skip);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "something Went rong " });
  }
};

// =====================================================================================
// ================ Get user by : Id =============
const getOneUser = async (req, res) => {
  let id = req.params.id;
  //   console.log(id);
  try {
    let user = await usersModel.findOne({ _id: id }, "firstName");
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: "Cant find this ID " });
  }
};
// =====================================================================================
// ================ update  by id : ============
const updateOneUser = async (req, res) => {
  let { id } = req.params;
  let { username } = req.body;
  try {
    let todos = await usersModel.updateOne({ _id: id }, { username: username });
    res.status(200).json({ message: "the todo is updated ", data: todos });
  } catch (err) {
    res.status(500).json({ message: " Error in update the document" });
  }
};
// =====================================================================================
// ================ Delelte user by id :
const deleteOneUser = async (req, res) => {
  let { id } = req.params;
  try {
    let user = await usersModel.deleteOne({ _id: id });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: " Error in deleting the user  " });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getOneUser,
  updateOneUser,
  deleteOneUser,
  login,
};
