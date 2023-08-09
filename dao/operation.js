const { studentsDetails, Marks } = require('../models/db-details')
const { entriDetails } = require('../procedure')
const { Sequelize } = require('sequelize')
const { Op } = require('sequelize');

//To Get data of all the students
const getStudents = async (res) => {
  try {
    let result = await (studentsDetails).findAll({
      include: Marks,
    })
    return JSON.parse(JSON.stringify(result));
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error Occured on getStudents()" })
  }
}
const getEntri = async (res) => {
  try {
    let result = await entriDetails.findAll({})
    return JSON.parse(JSON.stringify(result));
  } catch (err) {
    console.log("&&&", err)
    // res
    //   // .status(500)
    //   .json({ message: "Error Occured on getStudents()" })
  }
}

//To Get data of a particular the students

const getStudentsById = async (id, res) => {
  try {
    let result = await studentsDetails.findOne({
      where: { id: id },
      include: Marks,
    })
    return JSON.parse(JSON.stringify(result));
  } catch (err) {
    throw err;
  }
}

//To Create a new student details into the database

const createDetails = async (fname, lname, email, marks, res) => {
  try {
    const student = await studentsDetails.create({
      first_name: fname,
      last_name: lname,
      email_id: email
    });

    const newMarksData = await Marks.create({
      tamil: marks.tamil,
      english: marks.english,
      maths: marks.maths,
      student_id: student.id
    });
  } catch (err) {
   
    if (err.name === "SequelizeUniqueConstraintError") {
      throw Error("Email should be unique.");
    }
    console.log("..........", err)
  }
};

//To Update the mark of the existing student by using the first name of the student

const updateDetails = async (email, updatedMarks, updateName, res) => {
  try {
    const student = await studentsDetails.findOne({
      where: { email_id: email },
    });
    if (student) {
      await studentsDetails.update(updateName, {
        where: { email_id: email },
      });
      await Marks.update(updatedMarks, {
        where: { student_id: student.id },
      });
    }
  } catch (err) {
    res.send("......", err)
  }
}


const deleteById = async (id, res) => {
  try {
    let result = await studentsDetails.destroy({
      include: studentsDetails,

      where: { id: id },
    })
    return JSON.parse(JSON.stringify(result));
  }
  catch (err) {
    throw err;
  }
}

const getStudentsByCategory = async (category, res) => {
  let minTotalMarks, maxTotalMarks;

  if (category === 'Good') {
    minTotalMarks = 250;
    maxTotalMarks = 280;
  } else if (category === 'Others') {
    minTotalMarks = 0;
    maxTotalMarks = 250;
  } else if (category === 'Excellence') {
    minTotalMarks = 280;
    maxTotalMarks = 301;
  }

  try {
    const students = await Marks.findAll({

      include: studentsDetails,
      attributes: [

        'student_id',
        [
          Sequelize.literal('SUM(tamil + english + maths)'),
          'total_mark',
        ],
      ],
      group: 'student_id',
      having: {
        total_mark: {
          [Op.gte]: minTotalMarks,
          [Op.lt]: maxTotalMarks,
        },
      },
    });
    return students;
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error Occured on getStudentsByCategory()" })
  }
};



module.exports = {
  getStudents: getStudents,
  getStudentsById: getStudentsById,
  deleteById: deleteById,
  getStudentsByCategory: getStudentsByCategory,
  createDetails: createDetails,
  updateDetails: updateDetails,
  getEntri: getEntri
}
