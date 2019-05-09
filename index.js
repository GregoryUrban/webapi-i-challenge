// implement your API here

// require the express npm module, needs to be added to the project using "yarn add" or "npm install"
const express = require('express'); // require ONLY works within node

// create an express application using the express module
const db = require('./data/db.js');
const server = express();
const { users } = db;

const PORT = 9090;


//middleware to see whats on body
server.use(express.json());

// Endpoints

server.get('/', (req, res) => {
  res.json({ message: 'request recieved'});
});

// Show all Users find()
server.get('/api/users', (req, res) => {
  db.find()
  .then((users) => {
      res.json(users); 
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: "The users information could not be retrieved." });
  });
}) 

// Show one User findById()

server.get('/api/users/:id', (req, res)  => {
  const { id } = req.params;
  db.findById(id)
  .then(user => {
    if (user) {
      res.json(user);
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist."});
    }

  })
  .catch(err => {
    res
    .status(500)
    .json({ message: "Failed to get user" });
  });
}) 

//create
server.post("/api/users",(req,res)=>{
  const user=req.body;
  if(user.name && user.bio){
      res.status(201).json(user);
   } else {
       res
       .status(400)
       .json({ errorMessage:"Please provide name and bio for the user." })
       return;
     }   
       db
  .insert(user)
  .then( user => {
      console.log("New User",user);
      res
      .status(201)
      .json(user);
    })
  .catch( err => {
      res
      .status(500)
      .json({error: "There was an error while saving the user to the database" })

  })


})

server.listen(PORT, () => console.log(`API running on port ${PORT} son`));