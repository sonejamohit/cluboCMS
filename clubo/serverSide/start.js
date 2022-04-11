const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const urlEncodedBodyParser=bodyParser.urlencoded({extended:false});
const mariadb=require("mariadb");
const port=5050;
const { body, validationResult } = require('express-validator');
app.get("/getMembers",async function(request,response){
class Member{
constructor( memId,memFname,memLname,contact,memPassword,memEmail,memRoleId){
this.memId=memId;
this.memFname=memFname;
this.memLname=memLname;
this.contact=contact;
this.memPassword=memPassword;
this.memEmail=memEmail;
this.memRoleId=memRoleId;
}
}
const connection=await mariadb.createConnection({
"user":"root",
"password":"12345678",
"database":"clubo",
"host":"localhost",
"port":5506
})
var members=[];
var resultSet=await connection.query(`select * from members;`);
var i=0,member;
var memId,memFname,memLname,contact,memPassword,memEmail,memRoleId;

while(i<resultSet.length){
memId=resultSet[i].memId;
memFname=resultSet[i].memFname;
memLname=resultSet[i].memLname;
contact=resultSet[i].contact;
memPassword=resultSet[i].memPassword;
memEmail=resultSet[i].memEmail;
memRoleId=resultSet[i].memRoleId;

member=new Member(memId,memFname,memLname,contact,memPassword,memEmail,memRoleId);
console.log(member)
members.push(member);
i++;
}

await connection.end();
response.send(members);
})

app.get("/",function(request,response){
response.send("Hi");
})

app.use(express.json())
app.post('/createMember',urlEncodedBodyParser,async function(request,response){
  const connection=await mariadb.createConnection({
    "user":"root",
    "password":"12345678",
    "database":"clubo",
    "host":"localhost",
    "port":5506
    })
    var firstName=request.body.firstName;
    var lastName=request.body.lastName;
    var Email=request.body.Email;
    var password=request.body.password;
    console.log("Email"+Email)
var resultSet=await connection.query(`insert into addMember values('${firstName}','${lastName}','${Email}','${password}')`);
if(resultSet.affectedRows===0)
{
    await connection.end();
    return response.send({"error":"failure"});
}
await connection.end();
response.send(resultSet);
});

app.get("/getEvent",async function(request,response){
  class Event{
  constructor( eventId,eventName,eventDate,eventTime,mgr_id){
  this.eventId=eventId;
  this.eventName=eventName;
  this.eventDate=eventDate;
  this.eventTime=eventTime;
  this.mgr_id=mgr_id;
  }
  }
  const connection=await mariadb.createConnection({
  "user":"root",
  "password":"12345678",
  "database":"clubo",
  "host":"localhost",
  "port":5506
  })
  var events=[];
  var resultSet=await connection.query(`select * from event;`);
  var i=0,event;
  var eventName,eventDate,eventTime,mgr_id;
  var eventId;
  while(i<resultSet.length){
  eventId=resultSet[i].eventId;
 eventName=resultSet[i].eventName;
  eventDate=resultSet[i].eventDate;
  eventTime=resultSet[i].eventTime;
  mgr_id=resultSet[i].mgr_Id;
  console.log(typeof(eventName))
  console.log(typeof(eventDate))
console.log(mgr_id);
  event= new Event(eventId,eventName,eventDate,eventTime,mgr_id);
  console.log(event)
 events.push(event);
  i++;
  }
  await connection.end();
  response.send(events);
  })
  app.use(express.json())
  app.post('/deleteEvent',urlEncodedBodyParser,async function(request,response){
    const connection=await mariadb.createConnection({
      "user":"root",
      "password":"12345678",
      "database":"clubo",
      "host":"localhost",
      "port":5506
      })
      var eventId=request.body.id;
      console.log(request.body.name)
      console.log(request.body)
      console.log(eventId)
      var beforeDelete=connection.query(`select * from event;`);
  var resultSet=await connection.query(`delete from event where eventId="${eventId}";`);
  var afterDelete=connection.query(`select * from event;`);
  if(beforeDelete.length===afterDelete.length)
  {
      await connection.end();
      return response.send({"error":"failure"});
  }
  await connection.end();
  response.send({"success":true});
  });

app.listen(port,function(error){
if(error) return console.log("Something is wrong...."+error)
return console.log("Server is starting on port "+port);
})