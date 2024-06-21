const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const UserModel = require('./models/Users')
const axios = require('axios');
const { query } = require('./models/huggingface');
require('dotenv').config();
const port = process.env.PORT || 5001
const app = express()
app.use(express.json())
app.use(cors({
    // for jwt cookies
    origin:[process.env.ORIGINS],
    methods: ["GET", "POST"],
    credentials: true
}))
app.use(cookieParser())

mongoose.connect(process.env.MONGODB_URI, {

}).then(() => {
    console.log('MongoDB connected');
}).catch(err => console.error('MongoDB connection error:', err));

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;


// app.get("/auth/github", (req, res) => {
//     const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user`;
//     res.redirect(githubAuthUrl);
// });

app.get("/auth/github/callback", async (req, res) => {
    const code = req.query.code;

    try {
        const tokenResponse = await axios.post("https://github.com/login/oauth/access_token", {
            client_id: clientId,
            client_secret: clientSecret,
            code: code
        }, {
            headers: {
                accept: "application/json"
            }
        });
        console.log("Token Response:", tokenResponse.data); 
        const accessToken = tokenResponse.data.access_token;
        if (!accessToken) {
            throw new Error("Access token not received");
        }
        const userResponse = await axios.get("https://api.github.com/user", {
            headers: {
                Authorization: `token ${accessToken}`
            }
        });

        const { login, email } = userResponse.data;

        let user = await UserModel.findOne({ email: email });
        if (!user) {
            user = new UserModel({ name: login, email: email });
            await user.save();
        }

        const token = jwt.sign({ email: user.email, role: user.role }, "jwt-secret-key", { expiresIn: "1d" });
        res.cookie("token", token);

        res.redirect(`${process.env.ORIGINS}/github-login-success?token=${token}`);
    } catch (error) {
        console.error("GitHub OAuth error:", error);
        res.redirect(`${process.env.ORIGINS}/other-login?error=github_auth_failed`);
    }
});


app.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: 'Logout successful' });
  });
  
app.post('/register', (req, res) => {
    const {name, email, password} = req.body;
    bcrypt.hash(password, 10)
    //promise generate kara hae
    .then(hash => {
        UserModel.create({name, email, password: hash})
        // if got succedd
        .then(user => res.json("Success"))
        .catch(err => res.json(err))
    }).catch(err => res.json(err))
})
//post api for login 
app.post('/login', (req, res) => {
    const {email, password} = req.body;
    UserModel.findOne({email: email})
    .then(user => {
        if(user) {
            //agar user existed then check for password
            bcrypt.compare(password, user.password, (err, response) => {
                if(response) {
                    // agar password is correct
                  const token = jwt.sign({email: user.email, role: user.role},
                        "jwt-secret-key", {expiresIn: '1d'})  // jo token generate kara hae usko cookies mei store kiya hae  
                    res.cookie('token', token)
                    return res.json({Status: "Success"})
                }else {
                    
                    return res.json("The password is incorrect")
                }
            })
        } else {
            // agar user ne signup nhi kiya hae toh
            return res.json("No record existed")
        }
    })
})

app.post('/ask', async (req, res) => {
    try {
        const userInput = req.body.inputs;
        const response = await query({ inputs: userInput });
    //    console.log("Response from Hugging Face API:", response); // Log the response to the terminal
        res.json(response); // Send the response back to the client
    } catch (error) {
        console.error(error);
        res.status(500).send('Error querying the Hugging Face model');
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
