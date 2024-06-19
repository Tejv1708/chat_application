import User from "../model/userModel.js";

export const createUser = async ( req, res, next ) => {
    const newUser = await User.create( {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    } )
    return res.status( 201 ).json( {
        data: newUser
    } )
}

export const getUser = async ( req, res, next ) => {
    const user = await User.findById( req.params.id );
    return res.status( 200 ).json( {
        user
    } )
}

export const getAllUser = async ( req, res, next ) => {
    const users = await User.find();
    return res.status( 201 ).json( {
        data: users
    } )
}