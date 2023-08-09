const response = (message) => {
  return {
    message: message,
  }
}
module.exports = {
  //GETALL STUDENTS
  studentsFetchedSuccessfully: response("Students name fetched successfully"),
  noDataToFetch: response("There is no data to fetch from the database"),
  //GET ONE STUDENT
  getOneStudent: response("Detail of the student fetched successfully....."),
  noOneStudent: response("There is no student ID to get that students details"),
  //CREATE
  noFirst: response("The firstName of the student cannot be empty"),
  noEmail: response("The email-id of the student cannot be empty"),
  //UPDATE
  updateNoEmail: response("Please provide the email of the student to update the marks"),
  updatedSuccessfully: response('Marks updated successfully'),
  //CATEGORY
  categoryIsEmpty: response('There are no students to fetch from the database'),
  categoryNotNull: response('Students data fetched successfully'),
  //DELETE
  deleted: response("Student's details has been Deleted successfully"),
  noDataToDelete: response("Please give the existing student's Id to delete"),
}