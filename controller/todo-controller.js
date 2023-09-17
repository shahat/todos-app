const todoModel = require("../models/todo");

// create to dos function
const createTodo = async (req, res) => {
  const todo = req.body;
  todo.userId = req.id;
  // this we make after assigned the id of the user on the request object inside the auth middleware
  // here we are using try and catch to handle the server error
  try {
    const newTodo = await todoModel.create(todo);
    res.status(201).json({ message: " to do is saved ", data: newTodo });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all todos
const getAll = async (req, res) => {
  try {
    let todos = await todoModel.find().populate("userId");
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ message: "something Went rong " });
  }
};
// Get all todos
const getOne = async (req, res) => {
  let id = req.params.id;
  // console.log(id);
  try {
    let todos = await todoModel.findOne({ _id: id });
    res.status(200).json(todos);
  } catch (err) {
    res.status(404).json({ message: "Cant find this ID " });
  }
};

// update  by id :
const updateOne = async (req, res) => {
  let { id } = req.params;
  let { title } = req.body;
  //   console.log(entryId);
  try {
    let todos = await todoModel.updateOne({ _id: id }, { title: title });
    res.status(200).json({ message: "the todo is updated ", data: todos });
  } catch (err) {
    res.status(500).json({ message: " Error in deleting the document" });
  }
};

// Delelte by id :
const deleteOne = async (req, res) => {
  let entryId = req.params.id;
  console.log(entryId);
  try {
    let todos = await todoModel.deleteOne({ _id: entryId });
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ message: " Error in deleting the document " });
  }
};

// bouns1
const getUserTodos = async (req, res) => {
  try {
    const { userId } = req.params;
    let todos = await todoModel.find({ userId });
    // check the exist of todos and the length is not equal zero
    if (todos.length === 0) {
      return res.status(404).json({ message: "No todos found for this user" });
    }
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

/* bounes 2 
.limit(limit)
.skip(skip);
*/

module.exports = {
  createTodo,
  getAll,
  deleteOne,
  getOne,
  updateOne,
  getUserTodos,
};
