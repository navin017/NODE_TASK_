const express = require('express')
const app = express()
const details = require('../dao/operation');
const responseText = require('./responseText')
const cors = require('cors');
app.use(cors({
    origin: '*',
}));

app.use(express.json())
const showStudents = async (req, res) => {
    let detail = await details.getStudents();
    if (detail && detail.length > 0) {
        return res.send(responseText.successResponse("Students name fetched successfully",detail));
    }
    else {
        return res.send(responseText.failureResponse("There is no data to fetch from the database"))
    }

};
const showEntri = async (req, res) => {
    let detail = await details.getEntri();
    if (detail && detail.length > 0) {
        return res.send({ ...responseText.studentsFetchedSuccessfully, data: detail });
    }
    else {
        return res.send(responseText.noDataToFetch)
    }

};
const getOne = async (req, res) => {
    const id = req.query.id;
    try {
        let detail = await details.getStudentsById(id);
        if (detail) {
            return res.send(responseText.successResponse("Detail of the student fetched successfully.....",detail))
        }
        else {
            return res.send(responseText.failureResponse("There is no student ID to get that students details"))
        }
    }
    catch (err) {
        res
            .status(500)
            .json({ message: "Error in invocation of API: /get-one" })
    }

};
const create = async (req, res) => {
    const { fname, lname, marks, email } = req.body;
    try {

        if (!fname) {
            res.status(500).json(responseText.failureResponse("The firstName of the student cannot be empty"));
        }
        if (!email) {
            res.status(500).json(responseText.failureResponse("The email-id of the student cannot be empty"));
        }
      await details.createDetails(fname, lname, email, marks)
        res.status(201).json(responseText.successResponse("Details of the students created Successfully"));
    }
    catch (err) {

        if (err.message === "Email should be unique.") {
            return res.status(400).json({ Message: err.message });
        }
    }
};

const destroy = async (req, res) => {

    const id = req.body.id;
    try {
        let detail = await details.deleteById(id)
        if (detail) {
            return res.send(responseText.successResponse("Student's details has been Deleted successfully"))
        }
        else {
            return res.send(responseText.failureResponse("Please give the existing student's Id to delete"))
        }
    } catch (err) {
        res
            .status(500)
            .json(responseText.failureResponse("Error in invocation of API: /delete"))
    }
};

const update = async (req, res) => {
    const { email, updatedMarks, updateName } = req.body;
    try {
        if (!email) {
            res.status(500).json(responseText.failureResponse("Please provide the email of the student to update the marks"));
        }
        await details.updateDetails(email, updatedMarks, updateName);
        if (email) { res.status(200).json(responseText.successResponse("Marks updated successfully")); }
    }
    catch (err) {
        res
            .status(500)
            .json(responseText.failureResponse("Error in invocation of API: /update"))
    }
};

const category = async (req, res) => {
    try {
        const categories = ['Good', 'Excellence', 'Others'];
        const allStudents = {}

        for (const category of categories) {
            const students = await details.getStudentsByCategory(category);
            allStudents[category] = students;
        }

        res.json(responseText.successResponse("Students data fetched successfully",allStudents));
    } catch (err) {
        res
            .status(500)
            .json(responseText.failureResponse("Error in invocation of API: /category"))
    }
};

module.exports = {
    showStudents: showStudents,
    getOne: getOne,
    destroy: destroy
    update: update,
    category: category,
    create: create,
    showEntri: showEntri
};

// EveryThing is running peacefully...........