import express from "express";
import cors from "cors";
import services from "./user-services.js";


//constants
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

//default endpoint
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// id search
app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  services.findUserById(id)
  .then((result) => 
  {
    res.send(result);
  })
  .catch((error) => {
    console.log(error)
    res.status(404).send("Resource not found.");})
});


// add user
app.post("/users", (req, res) => {
  const userToAdd = req.body;
  services.addUser(userToAdd)
  .then((result) => { 
    res.status(201).send(result)})
  .catch((error) => 
  {console.log(error)
    res.status(500).send("User Not Added")
  });
});


// delete user by id
app.delete("/users/:id",(req,res) => {
    const id = req.params["id"]; //or req.params.id

    services.deleteUser(id)
    .then((result) => 
    {
      if(result){
        res.status(204).send()
      }
      else{
        res.status(404).send("User Not Found")
      }
    })

});

// name and job search
app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  services.getUsers(name,job)
    .then((data) => {return data})
    .then((json) => {res.send(json)})
    .catch((error => {console.log(error)}))
});

// port selection
app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});