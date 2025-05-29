const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    username: String,
    name: String,
    email: String,
    password: String,
    profilePicture : {
        type: String,
        default: "default.jpg"
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        }
    ]
})

module.exports = mongoose.model('user', userSchema);