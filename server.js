const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieparser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

const userModel = require('./models/user.models');
const postModel = require('./models/post.models')

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieparser());

app.get('/', (req, res) => {
    res.render("index");
})

// Authentication and Authorization 
//SignUp
app.post('/signup', async (req, res) => {
    const { name, username, email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (user) res.send("User already registered");

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            const user = await userModel.create({
                name,
                username,
                email,
                password: hash
            })

            let token = jwt.sign({ email, userID: user._id }, process.env.JWT_SECRET);
            res.cookie("token", token);
            res.redirect("/login");
        })

    })
})

//Login GET
app.get('/login', (req, res) => {
    res.render("login");
})

//Login POST
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) res.send("Something went wrong");

    bcrypt.compare(password, user.password, (err, result) => {
        if (!result) res.send("Sonething webt wrong");

        let token = jwt.sign({ email, userID: user._id }, process.env.JWT_SECRET);
        res.cookie("token", token);
        res.redirect("/profile")

    });
});

//Profile
app.get('/profile', isLoggedIn, async (req, res) => {
    const { email, userID } = req.user;

    const user = await userModel.findOne({ email: email }).populate("posts");


    res.render("profile", { user });
})

//Logout
app.get('/logout', isLoggedIn, (req, res) => {
    res.cookie("token", "");
    res.redirect("/login");
})

// Middleware to verify if loggedIn 
function isLoggedIn(req, res, next) {
    if (req.cookies.token === "") res.redirect("/login");
    else {
        let data = jwt.verify(req.cookies.token, "zxc379");
        req.user = data;
    }
    next();
}

//Create Posts
app.post('/post', isLoggedIn, async (req, res) => {
    const data = req.user;
    const { content } = req.body;
    const user = await userModel.findOne({ email: data.email });

    if (content) {
        const post = await postModel.create({
            content,
            user: user._id
        })

        user.posts.push(post._id);
        await user.save();

        res.redirect("/profile")
    } else {
        res.redirect("/profile")
        return
    }


})

//Like Post
app.get('/like/:id', isLoggedIn, async (req, res) => {
    let post = await postModel.findOne({ _id: req.params.id }).populate("user");

    if (post.likes.indexOf(req.user.userID) === -1) {
        post.likes.push(req.user.userID);
    } else {
        post.likes.splice(post.likes.indexOf(req.user.userID), 1)
    }

    await post.save();
    res.redirect("/profile");
})

//Edit Post
app.get('/edit/:id', isLoggedIn, async (req, res) => {
    let post = await postModel.findOne({ _id: req.params.id }).populate("user");
    res.render("edit", { post });
})

//Update Post
app.post('/update/:id', isLoggedIn, async (req, res) => {
    let post = await postModel.findOneAndUpdate({ _id: req.params.id }, { content: req.body.content });
    res.redirect("/profile");
})

app.listen(PORT, () => {
    console.log(`Server si running on http://localhost:${PORT}`);

})


