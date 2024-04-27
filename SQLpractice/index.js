const mysql = require("mysql2"); //requiring mysql connector
const { faker } = require("@faker-js/faker"); //requiring fakers to create a fake data
const express = require("express");
const path = require("path");
const app = express();
const methodOverride = require("method-override");
const { emit } = require("process");
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
const port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
//establishing the connection beetween server and database using CreateConnection funtion
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "library",
  password: "Mahi@7781",
});

//creating the random users
let createRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

app.listen(port, () => {
  console.log(`app is listening on the port ${port}`);
});
//home route
app.get("/", (req, res) => {
  let q = `SELECT count(*) FROM user;`;
  try {
    connection.query(q, (err, result) => {
      if (err) {
        throw err;
      }
      let count = result[0]["count(*)"];
      res.render("home.ejs", { count });
    });
  } catch (err) {
    res.send("some error in database");
  }
});
//show route

app.get("/user", (req, res) => {
  let q = `SELECT * FROM user`;
  try {
    connection.query(q, (err, users) => {
      res.render("showusers.ejs", { users });
    });
  } catch (err) {
    res.send("erroe occure", err);
  }
});
//Edit route

app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id = '${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0]; //the 0th index of array
      res.render("edit.ejs", { user });
    });
  } catch (err) {
    res.send("some error occured in database");
  }
});

//Update route

app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let { s_name: formUser, password: formPass } = req.body;
  let q = `SELECT * FROM user WHERE id = '${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0]; //the 0th index of array
      if (formPass != user.password) {
        res.send("incoreencct password");
      } else {
        let q2 = `UPDATE user SET s_name='${formUser}' WHERE id = '${id}';`;
        try {
          connection.query(q2, (err, result) => {
            if (err) throw err;
            res.redirect("/user");
          });
        } catch (err) {
          console.log(err);
        }
      }
    });
  } catch (err) {
    res.send("some error occured in database");
  }
});

//add new student to the database
app.get("/user/addStudent", (req, res) => {
  res.render("addStudent.ejs");
});
app.post("/user", (req, res) => {
  let {
    id: newId,
    s_name: newStudent,
    email: newEmail,
    password: newPass,
  } = req.body;
  let q = `INSERT INTO user (id,s_name,email,password) VALUES ('${newId}','${newStudent}','${newEmail}','${newPass}')`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.redirect("/user");
    });
  } catch (err) {
    console.log(err);
  }
});
//DELETE FORM
app.get("/user/:id/delete", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id ='${id}'`;
  try {
    connection.query(q, (err, result) => {
      let user = result[0];
      res.render("deleteuser.ejs", { user });
    });
  } catch (err) {
    console.log(err);
  }
});

app.delete("/user/:id", (req, res) => {
  let { id } = req.params;
  let { email: checkEmail, password: checkPass } = req.body;
  let q = `SELECT * FROM user WHERE id ='${id}'`;
  try {
     connection.query(q, (err, result) => {
      let user = result[0];
        if(checkEmail !=user.email && checkPass !=user.password){
            res.send("wrong deatails")
        }
        else{
            let q2=`DELETE FROM user WHERE id ='${id}'`;
            connection.query(q2,(err,result)=>{
                res.redirect("/user");
                console.log(result);
            })
        }
    });
  } catch (err) {
    console.log(err);
  }
});

// let q="INSERT INTO user (id,s_name,email,password) VALUES ?";
// try {
//   connection.query(q,[data], (err, result) => {
//     if (err) {
//       throw err;
//     }
//     console.log(result);
//   });
// } catch (err) {
//   console.log(err);
// }

// connection.end();
