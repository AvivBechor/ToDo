const globalErrorHandler= (err, req, res, next)=>{
    const code = err.statuscode || 500;
    
    res.status(code).json({
        status: 'fail',
        message: err.message
    })

}
module.exports = globalErrorHandler