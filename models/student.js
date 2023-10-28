const mongoose = require("mongoose");

const students_schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  student_id: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("student", students_schema);
