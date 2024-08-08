const jwt = require("jsonwebtoken");
const User = require('../../db/models/user/User');

exports.login = async (req, res) => { 
    
    let params = req.body;
    
    if(!params.email || !params.password) {
        res.send({
            resp: 0,
            msg: 'Missing email or password'
        });
        return;
    }

    let user = await User.findOne({where: { email: params.email }});

    if (!user) {
        res.send({
            resp: 0,
            msg: 'User not found'
        });
        return;
    }

    if (!user.mobile) {
        res.send({
            resp: 0,
            msg: 'Mobile number not provided'
        });
        return;
    }

    const isPasswordValid = (user.password === params.password); 

    if (!isPasswordValid) {
        res.send({
            resp: 0,
            msg: 'Incorrect password'
        });
        return;
    }

    let token = jwt.sign(
        { name: user.name, email: user.email}, 
        process.env.JWT_SECRET_KEY, 
        { expiresIn: 60 * 60 }
    );

    res.send({
        resp: 1,
        data: {
            name: user.name,
            email: user.email,
            token: token
        },
        msg: 'User logged in Successfully'
    });
}

exports.signup = async (req, res) => { 

    let params = req.body;
    
    if(!params.email || !params.password || !params.name) {
        res.send({
            resp: 0,
            msg: 'Missing email or password'
        });
        return;
    }

    let userData = await User.findOne({where: { email: params.email }});

    if(userData && (userData.email == params.email)) {
        res.send({
            resp: 0,
            msg: 'The email id already exists'
        });
        return;
    }

    if(userData && (userData.mobile === params.mobile)) {
        res.send({
            resp: 0,
            msg: 'Mobile number already exists'
        });
        return;
    }

    let user = await User.create(params);

    console.log('ssfs',user);

    if(!user) {
        res.send({
            resp: 0,
            msg: 'Internal server error'
        });
    } 
    else {
        let token = jwt.sign(
            { data: {name: user.name, email: user.email} }, 
            process.env.JWT_SECRET_KEY, 
            { expiresIn: 60 * 60 }
        );

        res.send({
            resp: 1,
            data: {
                name: user.name,
                email: user.email,
                token: token
            },
            msg: 'User created Successfully'
        });
    }
}
