const express = require('express');
const user = require('./controllers/users');
const multer = require('multer');
const uploads = multer({dest: 'uploads/', preservePath: false})
const path = require('path');

const upload = require('./config');

const app = express();

app.use(express.json({urlEncoded: false}));

const userRecord = {
    id: 1001,
    name: "vara",
    ade: 20,
    address: "iwofe road"
}

app.put('/user/:id', uploads.single('avatar'), user.updateUser);
// app.put('/user/:id',user.updateUser);
app.get("/user/all", user.getAllUsers)

app.get("/user/:id",user.getUsers)

app.post("/user", user.createUser);

app.delete('/user/:id', user.deleteUser);

app.listen(5000,() => {
    console.log("running");
});
