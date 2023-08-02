module.exports = {
  //GETALL STUDENTS
  studentsFetchedSuccessfully: {
    message: "Students name fetched successfully",
    code: 200,
  },
  noDataToFetch: {
    message: "There is no data to fetch from the database",
    data: null,
  },
  //GET ONE STUDENT
  getOneStudent: {
    message: "Detail of the student fetched successfully.....",
    data: null,
  },
  noOneStudent: {
    message: "There is no student ID to get that students details",
    data: null,
  },
  catchOne: {
    message: "Error in invocation of API: /getOne"
  },
  //DELETE
  deleted: {
    message: "Student's details has been Deleted successfully"
  },
  noDataToDelete: {
    message: "Please give the existing student's Id to delete"
  },

  //CREATE
  noFirst: {
    message: "The firstName of the student cannot be empty"
  },
  noEmail: {
    Message: "The email-id of the student cannot be empty"
  },
  //UPDATE

  updateNoEmail: {
    Message: "Please provide the email of the student to update the marks"
  },
  updatedSuccessfully: { message: 'Marks updated successfully' },
  categoryIsEmpty: {
    message: 'There are no students to fetch from the database',
    data: null,
  },
  categoryNotNull: {
    message: 'Students data fetched successfully',
    code: 200,
  }

}