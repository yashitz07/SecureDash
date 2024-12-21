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
    origin: process.env.CLIENT_URL.split(','),
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



app.get('/getAccessToken', async function(req,res){
    console.log(req.query.code);
    const params="?client_id=" + clientId + "&client_secret=" + clientSecret + "&code=" + req.query.code;
    await fetch("https://github.com/login/oauth/access_token" + params,{
        method: "POST",
        headers: {
            "Accept": "application/json"
        }
    }).then((response)=>{
        return response.json();
    }).then((data)=>{
        console.log(data);
        res.json(data);
    })
});

//getUserData
//access token is going to passed in as a authorization header
app.get('/getUserData', async function(req, res) {
    const accessToken = req.headers.authorization.split(' ')[1]; // Extract access token from Authorization header
    try {
        const githubResponse = await axios.get("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        const userData = githubResponse.data;
        res.json(userData); // Send GitHub user data back to the client
    } catch (error) {
        console.error('Error fetching GitHub user data:', error);
        res.status(500).json({ error: 'Failed to fetch GitHub user data' });
    }
});

app.post("/saveUser", async (req, res) => {
    const { name, email } = req.body;
  
    try {
      let user = await UserModel.findOne({ email });
  
      if (!user) {
        // If user doesn't exist, create a new one
        user = new UserModel({ name, email });
        await user.save();
        res.status(201).json({ message: "User saved successfully" });
      } else {
        // If user exists, send a success response
        res.status(200).json({ message: "User already exists" });
      }
    } catch (error) {
      console.error("Error saving user:", error);
      res.status(500).json({ error: "Error saving user" });
    }
  });

app.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: 'Logout successful' });
  });
//   app.options('/register', cors());
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
