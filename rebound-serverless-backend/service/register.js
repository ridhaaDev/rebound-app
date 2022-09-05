const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1'
});
const userTable = 'rebound-users';
const dynamodb = new AWS.DynamoDB.DocumentClient();

const util = require('../utils/util');
const bcrypt = require('bcryptjs')

async function register(userInfo) {
    console.log("Start register")
    const name = userInfo.name;
    const email = userInfo.email;
    const username = userInfo.username;
    const password = userInfo.password;

    if (!username || !name || !email || !password) {
        return util.buildResponse(401, {
            message: 'All fields are required.'
        })
    }

    const dynamoUser = await getUser(username);
    if (dynamoUser && dynamoUser.username) {
        return util.buildResponse(401, {
            message: 'Username already exists. Please choose a different username.'
        })
    }
    
    console.log("Username doesn't exist")

    const encryptedPW = bcrypt.hashSync(password.trim(), 10);
    const user = {
        name, email,
        username: username.toLowerCase().trim(),
        password: encryptedPW
    };

    const saveUserResponse = await saveUser(user)
    if (!saveUserResponse) {
        return util.buildResponse(503, {
            message: 'Server Error. Please try again later.'
        })
    }

    return util.buildResponse(200, { username });
}

async function saveUser(user) {
    const params = {
        TableName: userTable,
        Item: user
    }

    return await dynamodb.put(params).promise().then(() => {
        return true;
    }, error => {
        console.log('There is an error saving the user', error);
    })
}

async function getUser(username) {
    const params = {
        TableName: userTable,
        Key: {
           "username": username
        }
    }

    return await dynamodb.get(params).promise().then(
        response => {
            return response.Item
        },
        error => {
            console.log('There is an error', error);
        }
    )
}


module.exports.register = register