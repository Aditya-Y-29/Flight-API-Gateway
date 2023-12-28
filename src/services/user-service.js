const {StatusCodes}=require('http-status-codes')

const {UserRepository, RoleRepository}=require('../repositories')
const AppError=require('../utils/errors/app-error')
const {Auth,Enums}=require('../utils/common')
const {CUSTOMER,ADMIN}=Enums.USER_ROLES
const userRepository=new UserRepository()
const roleRepository=new RoleRepository()

async function create(data){
    try {
        const user=await userRepository.create(data)
        const role=await roleRepository.getRoleByName(CUSTOMER)
        user.addRole(role)
        return user
    } catch (error) {
        if(error.name=='TypeError'){
            throw new AppError('Something went wrong while creating city',StatusCodes.BAD_REQUEST)
        }
        throw new AppError('Cannot create city',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function signin(data){
    try {
        const user=await userRepository.getUserByEmail(data.email)
        if(!user){
            throw new AppError('No user found for given email',StatusCodes.NOT_FOUND)
        }
        const passwordMatch=Auth.checkPassword(data.password,user.password)
        if(!passwordMatch){
            throw new AppError('Password not matching',StatusCodes.BAD_REQUEST)
        }
        const jwt=Auth.createToken({id: user.id,email: user.email})
        return jwt
    } catch (error) {
        if(error instanceof AppError){
            throw error
        }
        console.log(error)
        throw new AppError('Something went wrong',StatusCodes.INTERNAL_SERVER_ERROR)        
    }
}

async function isAuthenticated(token){
    try {
        if(!token){
            throw new AppError('JWT token not found',StatusCodes.BAD_REQUEST)
        }
        const response=Auth.verifyToken(token)
        const user=await userRepository.get(response.id)
        if(!user){
            throw new AppError('No user found',StatusCodes.BAD_REQUEST)
        }
        return user.id
        
    } catch (error) {
        if(error instanceof AppError) throw error
        if(error.name=='JsonWebTokenError'){
            throw new AppError('Invalid jwt token',StatusCodes.INTERNAL_SERVER_ERROR)
        }
        if (error.name=='TokenExpiredError'){
            throw new AppError('Jwt Token expired',StatusCodes.INTERNAL_SERVER_ERROR)
        }
        throw new AppError('Something went wrong',StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function addRoleToUser(data){
    try {
        const user=await userRepository.get(data.id)
        if(!user){
            throw new AppError('No user found with given Id',StatusCodes.NOT_FOUND)
        }
        const role=await roleRepository.getRoleByName(data.role)
        if(!role){
            throw new AppError('This role does not exist',StatusCodes.NOT_FOUND)
        }
        user.addRole(role)
        return user
    } catch (error) {
        console.log(error)
        if(error instanceof AppError) return error
        throw new AppError('Something went wrong',StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function isAdmin(id){
    try {
        const user=await userRepository.get(id)
        if(!user){
            throw new AppError('No user found with given Id',StatusCodes.NOT_FOUND)
        }
        const adminRole=await roleRepository.getRoleByName(ADMIN)
        if(!adminRole){
            throw new AppError('This role does not exist',StatusCodes.NOT_FOUND)
        }
        return user.hasRole(adminRole)
    } catch (error) {
        console.log(error)
        if(error instanceof AppError) return error
        throw new AppError('Something went wrong',StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports={
    create,
    signin,
    isAuthenticated,
    isAdmin,
    addRoleToUser
}