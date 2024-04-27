//requiring the mysql package
const mysql = require('mysql2');
//requing the fakers data package
const { faker } = require('@faker-js/faker');

let  createRandomUser=() => {
    return [
      faker.string.uuid(),
      faker.internet.userName(),
      faker.internet.email(),
      faker.internet.password(),
    ];
  }
let data=[];

for(i=1;i<=20;i++){
    data.push(createRandomUser())
}

//establishing the connection beetween node and sql
const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'fakedata',
    password:'Mahi@7781'
})

let q=`INSERT INTO fakeusersInfo (id,username,email,password) VALUES ?`;

try{
    connection.query(q,[data],(err,result)=>{
        if(err)throw err
        console.log(result);
    })
}catch(err){
    console.log(err);
}

connection.end();