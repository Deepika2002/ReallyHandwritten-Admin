export const errorHandler = (data,res,code=400)=>{
    res.status(code).json({
        hasError:true,
        errorMessage: data
    })
}
