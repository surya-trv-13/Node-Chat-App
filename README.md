# Node-Chat-App
A Web-Based Chat Application using Node.JS using Socket.IO

>Project is deployed in Heroku 

>[Node-Chat-App](bit.ly/nodeChat)

## Description
The Chat Application is a initial phase of the building with basic operation as sending **text** and **location** to the members in a room.The 
basic concept is 
1. Join the room (By providing Name and Room Name)
2. Chat within that room (Message will be broadcasted to every member of that room)

>Location is fetched from the [Geolcation API of Mozilla](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)

## Geting Started
Install the npm in the command promt inside the project
```
npm install .
```
## Running the tests

For the test, package.json has to be changed

### Break down into end to end tests

using mocha.js,tests can be done, to install mocha:
```
npm i mocha@3.0.2--save-dev
```
Script modifications are necessery:
```
"scripts": {
    "start": "node server/server.js",
    "test": "mocha server/**/*.test.js",
    "test-watch": "nodemon --exec \"npm test\""
  }
```
### Testing the application
Within Command Prompt of the project
``` npm test ``` 

## Running the project Locally
Within the Command prompt write the following code 
```
nodemon server/server.js
```
> This should be run after installing all the npm modules of the project

Open any browser and write the following URL

```
http://localhost:1200/
```

## Built With

* [Atom](http://www.atom.io/) - The text editor used
* [Node.js](https://www.nodejs.org/) - Application compiler used
* [NPM Modules]

# Author
* **Suryanarayan Rath** - *Initial work* - [surya-trv-13](https://github.com/surya-trv-13)

See the list of contributors of the project [here](https://github.com/surya-trv-13/Node-Chat-App/graphs/contributors).

# Acknowledgement
I would like to thank [Andrew J Mead](https://github.com/andrewjmead) for providing guidance to making the initial build of the project.
