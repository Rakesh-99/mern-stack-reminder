


// Signup User  ; 


export const addSignupUser = async (req, res) => {

    try {
        const findUserExist = await userModel.findOne({ email: req.body.email });

        if (findUserExist) {
            return res.status(400).json({ 'res': 'User is already registered' });
        }
        // Generate a random 6-digit OTP


        if (req.body.password === '') {
            return res.status(400).json({ "res": 'Password is empty' });
        } else {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            const addSignupUser = new userModel({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                userrole: 0,
                isVerified: false
            });

            const newUser = await addSignupUser.save();
            res.status(200).json({ res: 'User has been registered successfully', newUser });

        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ res: 'Error while signing up user', err });
    }
};





// Login User  :

export const loginUser = async (req, res) => {

    try {
        const user = await userModel.findOne({ email: req.body.email });


        if (!user) {
            return res.status(400).json({ "res": 'Invalid credential' })
        } else if (user?.isVerified === false) {
            return res.status(404).json({ 'res': 'You are not Verified' });
        }

        const match = await bcrypt.compare(req.body.password, user.password);

        if (match) {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN, { expiresIn: '10m' });
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_TOKEN);

            const token = new TokenModel({ token: refreshToken });
            await token.save();

            return res.status(200).json({ myAccessToken: accessToken, myRefreshToken: refreshToken, username: user.username, email: user.email, userrole: user.userrole })

        } else {
            return res.status(400).json({ 'res': 'Invalid credential' });
        }
    } catch (error) {
        return res.status(500).json({ 'res': 'Error occurred occurred while login' });
    };
}