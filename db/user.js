const { faker } = require('@faker-js/faker/locale/ru');

let userList = [
        {
        id: 0,
        name: faker.name.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number('+7 ### ### ## ##'),
        password: faker.internet.password(),
        vehicle: faker.vehicle.vehicle()
        },  
    ]

for (let i = 1; i < 20; i++) {
    const user = {
        id: i,
        name: faker.name.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number('+7 ### ### ## ##'),
        password: faker.internet.password(),
        vehicle: faker.vehicle.vehicle()
    }   
    userList.push(user)
}


const getUserList = () => {
    return userList
}

const findUserById = (id) =>{
    const users = userList
    const userFound = users.filter((user) => {
        if (user.id === id) {
             return user
        }   
    });
    if (userFound.length>0){
        return userFound
    }
    return false
}

module.exports = { getUserList, findUserById }