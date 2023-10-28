const express = require("express");
const router = express.Router();
const Student = require("../models/student");

// get all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ mesage: error.mesage });
  }
});

// create one
router.post("/", async (req, res) => {
  const student = new Student({
    name: req.body.name,
    course: req.body.course,
    student_id: req.body.student_id,
    age: req.body.age,
  });
  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router
  .route("/:id")
  .get(async (req, res) => {
    // get one student
    const student = await getStudent(req, res);
    try {
      if (student) {
        res.status(200).json(student);
      } else {
        res.status(404).json({ message: "student not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
  .patch(async (req, res) => {
    // updates a student
    const student = await getStudent(req, res);
    if (student) {
      for (const field in student) {
        update(req, res, student, field);
      }
      try {
        const updatedStudent = await student.save();
        res.status(202).json(updatedStudent);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    } else {
      res.status(404).send("student not found");
    }
  })
  .delete(async (req, res) => {
    // deletes one
    const student = await getStudent(req, res);
    try {
      if (student) {
        await Student.deleteOne({ student_id: student.student_id });
        res.send(`student successfuly deleted :${student}`);
      } else {
        res.status(404).json({ message: "student not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// utility & middlewares
async function getStudent(req, res) {
  const id = req.params.id;
  const student = await Student.findOne({ student_id: id });
  return student;
}

function update(req, res, obj, field) {
  obj[field] = req.body[field] || obj[field];
}
module.exports = router;
