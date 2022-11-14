const express = require("express");
const app = express();
var bodyParser = require('body-parser')
const { faker } = require('@faker-js/faker/locale/ru');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
const fs = require('fs')
const { getUserList, findUserById } = require('./db/user.js')
const userList = getUserList();

app.get('/api/users', (req, res) => {

	return res.status(200).json({
    success: "true",
    message: "users",
    users: userList,
  });
})

app.post('/api/users', (req, res) => {
	const user = {
		id: userList.length,
		name: req.body.name,
		email: req.body.email,
		phone: req.body.phone,
		password: req.body.password,
		vehicle: req.body.vehicle
	}
	userList.push(user)
	return res.status(200).json({
	    success: "true",
	    message: "user added successfully",
	    user: user,
  	});
})

app.put('/api/users/:id', (req, res) => {
	const id = parseInt(req.params.id, 10);
	const userFound = findUserById(id);
	if (!userFound) {
	    return res.status(404).json({
	      success: 'false',
	      message: 'user not found',
	    });
  	}
	const updatedUser= {
	  	id: id,
		name: req.body.name || userFound.body.name,
		email: req.body.email || userFound.body.email,
		phone: req.body.phone || userFound.body.phone,
		password: req.body.password || userFound.body.password,
		vehicle: req.body.vehicle || userFound.body.vehicle
  	};
  for (let i = 0; i < userList.length; i++) {
      if (userList[i].id === id) {
          userList[i] = updatedUser;
          return res.status(201).json({
            success: 'true',
            message: 'user updated successfully',
            updatedUser
          });
      }
  }
})

app.delete('/api/users/:id', (req, res) => {
	const id = parseInt(req.params.id, 10);
	for(let i = 0; i < userList.length; i++){
	  if(userList[i].id === id){
	       userList.splice(i,1);
	       return res.status(201).json({
	        success: 'true',
	        message: 'user deleted successfully'
	      });
	  }
	}
})

app.listen(3000, () => {
	console.log("server listen to port 3000")
})