class ApiResponse {
    constructor(
        statusCode,
        message="Sucess",
        data
    ) {
        this.message=message;
        this.statusCode=statusCode;
        this.data=data;
        this.success=statusCode<400
    }
}

export { ApiResponse}