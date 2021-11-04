const allUserRecords = require('../models/database');

exports.getUsers = function (req, res){
  const id = req.params.id;
  console.log(id);
  const user = allUserRecords.find(user => { 
      console.log(user.id === Number(id));
      if (user.id === Number(id)){
          return user
      }else {
         return false;
      }
  });
  if(user){
      res.send(user);
  }else{
      res.send("user not found");
  }
};

exports.getAllUsers = function(req, res){
  if (allUserRecords.length > 0){
      res.status(200).send(allUserRecords)
  }else {
      res.status(404).send("no user at the moment")
  }
}


exports.updateUser = function(req, res) {
  const id = parseInt(req.params.id);
  const user = allUserRecords.find((user, index) => {
      if (user.id === id) {
          user.dataId = index;
          return user;
      }
      else return false;
  });

  if (user) {
      let updatedUserRecord = {};
      updatedUserRecord.id = user.id;
      updatedUserRecord.name = req.body.name || user.name;
      updatedUserRecord.age = req.body.age || user.age;
      updatedUserRecord.age = req.body.age || user.age;
      updatedUserRecord.address = req.body.address || user.address;

      updatedUserRecord.photo = req.file.path || user.photo;
      allUserRecords.splice(user.dataId, 1, updatedUserRecord);
      res.status(201).json({ success: true, data: updatedUserRecord, message: "User updated successfully" });
  } else res.status(404).json({ success: false, message: "User not found" });
};


exports.deleteUser = function(req, res){
  const id = parseInt(req.params.id)
  // filter through the user records
  const user = allUserRecords.find((user, index) => {
      // check er records matches each other
      if(user.id === id){
          // attach the user index to the user details
          user.dataId = index;
          return user;
      }else {
          // else return false if the user doesnt natch
          return false;
      }
  });
  if(user){
      // delete the user using their index
      allUserRecords.splice(user.dataId, 1);

      // send out response to the cleint
      res.status(200).send({ success: true, data: user, message: "user deleted succesfully" });
  }else {
      res.status(404).json({success: false, message: "user not found"});
  }
};

exports.createUser = function (req, res) {
  const {name, address , age} = req.body;
  // check if the request data isnt empty
  if(name && address && age){
    let id = 1000;
    // get the last user id and increament it by one if the array is not empty
    if(allUserRecords.length > 0)
    id = allUserRecords[allUserRecords.length-1].id + 1
    // set the user id
    req.body.id = id;
    // save record in your data base
    allUserRecords.push(req.body);

    // send out response to the client
    res.status(201).json({ success: true, data: req.body});
  }else {
    // send out error if the request data  is empty  or missing some rquired data
    res.status(400).json({success: false, message: "bad input"});
  }
}