const { usersCollection } = require("../db/db")
const bcrypt = require('bcrypt');
const { generateToken } = require("../utils/generateToken");

const loginController = async (req, res, next) => {
    const { email, password } = req.body

    if (typeof email === undefined && typeof password === undefined) {
        res.status(400)
        try {
            throw new Error('Email and password must be of type string')
        }
        catch (err) {
            next(err)
        }
    }

    const user = await usersCollection.findOne({ email })
    console.log(user,"user")
    if (user) {
        const data = await bcrypt.compare(password, user.password).then((result) => {
            console.log(result)
            return result
        })
        if (data)
          {

            res.status(200).json({
                _id:user._id,
                username: user.username,
                email: user.email,
                role:user.role,
                token: await generateToken(user._id)

            })}
        else {
            res.status(401)
            try {
                throw new Error("Incorrect password")

            }
            catch (err) {
                next(err)
            }
        }
    }
    else{
        res.status(500)
        next({message:'user does\'t exist please signup'})
    }
}


module.exports={loginController}