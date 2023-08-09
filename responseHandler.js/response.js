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
        return res.send({ ...responseText.studentsFetchedSuccessfully, data: detail });
    }
    else {
        return res.send(responseText.noDataToFetch)
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
            return res.send({ ...responseText.getOneStudent, data: detail })
        }
        else {
            return res.send(responseText.noOneStudent)
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
            res.status(500).json(responseText.noFirst);
        }
        if (!email) {
            res.status(500).json(responseText.noEmail);
        }
        await details.createDetails(fname, lname, email, marks)
        res.status(201).json({
            Message: "Student name with their marks created successfully",
        });
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
            return res.send({ ...responseText.deleted, count: detail })
        }
        else {
            return res.send(responseText.noDataToDelete)
        }
    } catch (err) {
        res
            .status(500)
            .json({ message: "Error in invocation of API: /delete" })
    }
};

const update = async (req, res) => {
    const { email, updatedMarks, updateName } = req.body;
    try {
        if (!email) {
            res.status(500).json(responseText.updateNoEmail);
        }
        await details.updateDetails(email, updatedMarks, updateName);
        if (email) { res.status(200).json(responseText.updatedSuccessfully); }
    }
    catch (err) {
        res
            .status(500)
            .json({ message: "Error in invocation of API: /update" })
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

        res.json({
            ...responseText.categoryNotNull,
            data: allStudents,

        });
    } catch (err) {
        res
            .status(500)
            .json({ message: "Error in invocation of API: /category" })
    }
};

module.exports = {
    showStudents: showStudents,
    getOne: getOne,
    destroy: destroy,
    update: update,
    category: category,
    create: create,
    showEntri: showEntri
};
