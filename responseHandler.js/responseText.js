const successResponse = (message,data) =>{
  return{
    message:message,
    data:data
  }
}

const failureResponse = (message) =>{
  return{
    message:message,
    data:null
  }
}

module.exports={
  successResponse:successResponse,
  failureResponse:failureResponse
}
