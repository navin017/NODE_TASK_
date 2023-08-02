// const express = require('express')
// const exp = express()
// const request = require('supertest');
// const app = require('../index');
// const details = require('../dao/operation')
// const data = require('../db-connect')
// describe('Student Details Database', () => {
//     test("Should get the students details from the database", async () => {
//         await request(app).get('/get-students').send({}).expect({
//             "message": "Students name fetched successfully",
//             "code": 200,
//             "data": [
//                 {
//                     "id": 1,
//                     "first_name": "naveen",
//                     "last_name": "elango",
//                     "email_id": "naveen@gmail.com",
//                     "mark": {
//                         "marks_id": 1,
//                         "student_id": 1,
//                         "tamil": 100,
//                         "english": 0,
//                         "maths": 100
//                     }
//                 },
//                 {
//                     "id": 2,
//                     "first_name": "naveen",
//                     "last_name": "elgo",
//                     "email_id": "navin@gmail.com",
//                     "mark": {
//                         "marks_id": 2,
//                         "student_id": 2,
//                         "tamil": 40,
//                         "english": 100,
//                         "maths": 100
//                     }
//                 }
//             ]
//         })
//     })

//     test('should return message when there are no students', async () => {
//         details.getStudents = jest.fn().mockResolvedValue([]);
//         const response = await request(app).get('/get-students');
//         expect(response.status).toBe(200);
//         expect(response.body).toEqual({
//             message: "There is no data to fetch from the database",
//             data: null,
//         });
//     });


//     test('should navigate to /getOneStudent with input data', async () => {
//         await request(app).get('/get-one').query({
//             id: 1
//         }).expect({
//             "message": "Detail of the student fetched successfully.....",
//             "data": {
//                 "id": 1,
//                 "first_name": "naveen",
//                 "last_name": "elango",
//                 "email_id": "naveen@gmail.com",
//                 "mark": {
//                     "marks_id": 1,
//                     "student_id": 1,
//                     "tamil": 100,
//                     "english": 0,
//                     "maths": 100
//                 }
//             }
//         })
//     })

//     test('Error message for /getOneStudent without proper input data', async () => {
//         await request(app).get('/get-one').query({})
//             .expect(
//                 {
//                     message: 'There is no student ID to get that students details',
//                     data: null
//                 }
//             )
//     })

//     test('Error message for /getOneStudent if the id is not exist', async () => {
//         await request(app).get('/get-one').query({ id: 100 })
//             .expect(
//                 { message: "There is no student ID to get that students details", data: null }
//             )
//     })
//     test("Check if using the proper URL", async () => {
//         await request(app).get('/creat').send({
//         }).expect(404)
//     })

//     test('Should show error message if query is not passed in /get-one', async () => {
//         await request(app).get('/get-one').query({}).expect({
//             "message": "Error in invocation of API: /get-one"

//         })
//     })

//     test('should navigate to /create with input data', (done) => {
//         request(app).post('/create').send({
//             "fname": "naveen",
//             "lname": "elango",
//             "email": "naveenelango018@gmail.com",
//             "marks": {
//                 "tamil": 40,
//                 "english": 100,
//                 "maths": 100

//             },
//         }).expect(201)
//             .end((err, res) => {
//                 if (err) return done(err);
//                 done();
//             });
//     })
//     test('To Validate the email', async () => {
//         await request(app).post('/create').send({
//             "fname": "naveen",
//             "lname": "elango",
//             "email": "naveen@gmail.com",
//             "marks": {
//                 "tamil": 40,
//                 "english": 100,
//                 "maths": 100

//             },
//         }).expect({ Message: "Email should be unique." })

//     })
//     test("If there is no first name show error message", async () => {
//         await request(app).post('/create').send({
//             "lname": "elango",
//             "email": "elango@gmail.com",
//             "marks": {
//                 "tamil": 40,
//                 "english": 100,
//                 "maths": 100
//             }
//         }).expect({ "message": "The firstName of the student cannot be empty" })

//     })

//     test('should navigate to /create without email', async () => {
//         await request(app).post('/create').send({
//             fname: "wayne",
//             lname: "bruce"
//         }).expect({ Message: "The email-id of the student cannot be empty" })
//     })

//     test('should navigate to /deleteById with input data', async () => {
//         await request(app).delete('/delete').query({
//             id: 92
//         }).expect({
//             count: 1,
//             message: "Student's details has been Deleted successfully"
//         })
//     })
//     test('should navigate to /deleteById without input data', async () => {
//         await request(app).delete('/delete').query({
//             id: 100
//         }).expect({
//             "message": "Please give the existing student's Id to delete"
//         })
//     })

//     test('Should show error message if query is not passed', async () => {
//         await request(app).delete('/delete').query({

//         }).expect({
//             "message": "Error in invocation of API: /delete"

//         })
//     })

//     test('Should show the text if all input for update in given', async () => {
//         await request(app).put('/update').send({
//             "email": "naveen@gmail.com",
//             "updatedMarks": {
//                 "tamil": 100
//             },
//             "updateName": {
//                 "last_name": "elango"
//             }
//         }).expect({ message: 'Marks updated successfully' })
//     })

//     test('Should show the text if there is no mail id', async () => {
//         await request(app).put('/update').send({
//             "updateName": {
//                 "last_name": "elango"
//             },
//             "updatedMarks": {
//                 "tamil": 100
//             }
//         }).expect({ Message: "Please provide the email of the student to update the marks" })
//     })

//     test('should should the categorised student details', async () => {
//         await request(app).get('/category').send({}).expect({
//             "message": "Students data fetched successfully",
//             "code": 200,
//             "data": {
//                 "good": [],
//                 "average": [
//                     {
//                         "student_id": 1,
//                         "total_mark": 200,
//                         "student": {
//                             "id": 1,
//                             "first_name": "naveen",
//                             "last_name": "elango",
//                             "email_id": "naveen@gmail.com"
//                         },
//                         "category": "average"
//                     },
//                     {
//                         "student_id": 2,
//                         "total_mark": 240,
//                         "student": {
//                             "id": 2,
//                             "first_name": "naveen",
//                             "last_name": "elgo",
//                             "email_id": "navin@gmail.com"
//                         },
//                         "category": "average"
//                     }
//                 ],
//                 "excellence": []
//             }
//         })

//     })
//     test('should return message when there are no students', async () => {
//         details.getStudentsByCategory = jest.fn().mockResolvedValue([]);
//         const response = await request(app).get('/category');
//         expect(response.status).toBe(200);
//     });
// })