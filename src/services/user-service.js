const {StatusCodes}=require('http-status-codes')

const {UserRepository}=require('../repositories')
const AppError=require('../utils/errors/app-error')

const userRepository=new UserRepository()

async function create(data){
    try {
        const user=await userRepository.create(data)
        return user
    } catch (error) {
        if(error.name=='TypeError'){
            throw new AppError('Something went wrong while creating city',StatusCodes.BAD_REQUEST)
        }
        throw new AppError('Cannot create city',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports={
    create,
}