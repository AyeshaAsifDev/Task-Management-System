const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ error: "All Fields Are Required!" });
        };
        if(username.length < 5){
            return res.status(400).json({ error: "Username Must have 5 Character!" });
        };

        if(password.length < 6){
            return res.status(400).json({ error: "Password Must have 6 Character!" });
        };

        const checkUsers = await User.findOne({$or: [{email}, {username}] });
        if(checkUsers){
            return res.status(400)
            .json({ error: "Username or Email Already Exist!" });
        } else{
            const hashPass = await bcrypt.hash(password, 10);
            const newUser = new User({username, email, password: hashPass });
            await newUser.save();
            return res.status(200).json({ success: "Registration Successfull!" });
        }

    } catch (error) {
        return res.status(400).json({ error: "Internal server error!" });
    }
};
const login = async(req, res) => {
    try {
        const {email, password} = req.body;
        if ( !email || !password) {
            return res.status(400).json({ error: "All Fields Are Required!" });
        };
        const checkUser = await User.findOne({email});
        if(checkUser){

            bcrypt.compare(password, checkUser.password, (err,data) =>{
                if(data){
                    const token = jwt.sign({id:checkUser._id, email: checkUser.email},process.env.JWT_SECRET, 
                        {expiresIn:"30d"}
                    );
                    res.cookie("taskifyUserToken", token,{
                        httpOnly :true,
                        maxAge:30*24*60*60*1000,
                        secure :process.env.NODE_ENV === "production",
                        sameSit:"None",
                    });
                    return res.status(200).json({success: "Login Successfully"})
                }else{
                    return res.status(400).json({error: "invalid Credentials"})
                }
                
                
                });
        }
    } catch (error) {
        return res.status(400).json({ error: "Password Must have 6 Character!" });
    }
}

//logout
const logout = async (req, res) => {
    try {
        res.clearCookie("taskifyUserToken"), {
            httpOnly: true,
        }}
         catch (error) {
        return res.status(404).json({error: "Internal server error!"})
    }
};
 

const userDetails = async (req, res) => {
    try {
        const {user} = req;
        const getDetails= await User.findById(user._id).populate("tasks").select("-password");
        if(getDetails){
            const allTasks = getDetails.tasks;
            let yetToStart = [];
            let inProgress = [];
            let complated = [];
            allTasks.map((item) =>{
                if(item.status ===  "yetToStart"){
                    yetToStart.push(item);
                }else if(item.status ===  "inProgress"){

                    inProgress.push(item);
                } else{
                 
                    complated.push(item);
                }
            });
            // console.log(getDetails);
            return res
            .status(200)
            .json(("success",tasks= [{ yetToStart },{ inProgress }, { complated } ]));
        }

    } catch (error) {
        return res.status(404).json({error: "Internal server error!"});
    }
}

module.exports = { register , login , logout, userDetails};