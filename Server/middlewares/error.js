const catchError = (err, req, res, next) => {
    // check error
    // console.log(JSON.stringify(err, null, 2));

    // loi ve Validation
    if (err.name === "ValidationError") {
        const errors = err.errors;
        const keys = Object.keys(errors);
        const errorObj = {};
        keys.map((key) => {
          errorObj[key] = errors[key].message;
        });
        err.statusCode = 400
        err.message = errorObj
    }

    // Bad ID
    if (err.kind === "ObjectId") {
        err.statusCode = 400
        err.message = "Invalid ID"
    }

    // Duplicate email
    if (err.code === 11000) {
        err.statusCode = 400;
        const field = Object.keys(err.keyValue)[0]
        err.message = `This ${field} is already exists!`;
    }

    res.status(err.statusCode || 500).json({
        success: false,
        statusCode: err.statusCode || 500,
        message: err.message || "Internal Server Error"
    })
}

export { catchError };