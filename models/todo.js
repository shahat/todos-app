const mongoose = require("mongoose");

const todo = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
      // required:true,
    },
    title: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 20,
    },
    status: {
      type: String,
      enum: ["to-do", "in progress", "done"],
      default: "to-do",
    },
  },
  { timestamps: true }
);

//Pre-save hook to generate userId if not provided
// todo.pre("save", function (next) {
//   if (!this.userId) {
//     this.userId = new mongoose.Types.ObjectId();
//   }
//   next();
// });

module.exports = mongoose.model("todos", todo);
