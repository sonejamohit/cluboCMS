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
  constructor( eventId,eventName,eventDate,eventTime,mgr_id,eventDescription){
  this.eventId=eventId;
  this.eventName=eventName;
  this.eventDate=eventDate;
  this.eventTime=eventTime;
  this.mgr_id=mgr_id;
  this.eventDescription=eventDescription;
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
  var resultSet=await connection.query(` select * from event order by eventDate;`);
  var i=0,event;
  var eventName,eventDate,eventTime,mgr_id,eventDescription;
  var eventId;
  while(i<resultSet.length){
  eventId=resultSet[i].eventId;
 eventName=resultSet[i].eventName;
  eventDate=resultSet[i].eventDate;
  eventTime=resultSet[i].eventTime;
  mgr_id=resultSet[i].mgr_Id;
  eventDescription=resultSet[i].description;
  console.log(typeof(eventName))
  console.log(typeof(eventDate))
console.log(mgr_id);
  event= new Event(eventId,eventName,eventDate,eventTime,mgr_id,eventDescription);
  console.log(event)
 events.push(event);
  i++;
  }
  await connection.end();
  response.send(events);
  })
  // app.use(express.json())
  app.post('/deleteEvent',urlEncodedBodyParser,async function(request,response){
   
    const connection=await mariadb.createConnection({
      "user":"root",
      "password":"12345678",
      "database":"clubo",
      "host":"localhost",
      "port":5506
      })
      var eventId=request.body.EventId;
console.log("Pleasse hoja")
      console.log("body"+request.body.EventId)
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


  app.post('/editEvent',urlEncodedBodyParser,async function(request,response){
   
    const connection=await mariadb.createConnection({
      "user":"root",
      "password":"12345678",
      "database":"clubo",
      "host":"localhost",
      "port":5506
      })
      var eventId=request.body.eventId;
      var eventName=request.body.eventName;
      var eventDate=request.body.eventDate;
      var eventTime=request.body.eventTime;
      var eventMgrId=request.body.mgrId;
      var description=request.body.description;
  var resultSet=await connection.query(`update event set eventName='${eventName}',eventDate='${eventDate}',eventTime='${eventTime}',mgr_Id='${eventMgrId}',description='${description}' where eventId="${eventId}";`);
  if(resultSet.affectedRows===0)
  {
    await connection.end();
    response.send({"error":"failure we can't edit"})
  }
  await connection.end();
  response.send({"success":true});
  });

  app.post('/addNewEvent',urlEncodedBodyParser,async function(request,response){
   
    const connection=await mariadb.createConnection({
      "user":"root",
      "password":"12345678",
      "database":"clubo",
      "host":"localhost",
      "port":5506
      })
      var eventId=request.body.eventId;
      var eventName=request.body.eventName;
      var eventDate=request.body.eventDate;
      var eventTime=request.body.eventTime;
      var eventMgrId=request.body.mgrId;
      var description=request.body.description;
console.log(description)
      var beforeAdding =await connection.query(`select * from event;`);
  var resultSet=await connection.query(`insert into event values("${eventId}",'${eventName}','${eventDate}','${eventTime}','${eventMgrId}','${description}');`);
  var afterAdding=connection.query(`select * from event;`);
  
  if(beforeAdding.length===afterAdding.length)
  {
    await connection.end();
    response.send({"error":"failure we can't edit"})
  }
  await connection.end();
  response.send({"success":true});
  });

  app.post('/searchEvent',urlEncodedBodyParser,async function(request,response){
   
    const connection=await mariadb.createConnection({
      "user":"root",
      "password":"12345678",
      "database":"clubo",
      "host":"localhost",
      "port":5506
      })
      var eventSearch=request.body.searchByCharacter;
    console.log(eventSearch)
  var resultSet=await connection.query(`select * from event where eventName like '${eventSearch}%';`);
  await connection.end();
  response.send(resultSet);
  });

  app.post('/getAllDetail',urlEncodedBodyParser,async function(request,response){
   
    const connection=await mariadb.createConnection({
      "user":"root",
      "password":"12345678",
      "database":"clubo",
      "host":"localhost",
      "port":5506
      })
      var eventSearch=request.body.getId;
    console.log(eventSearch)
  var resultSet=await connection.query(`select memFname,memLname,contact,roleName,teamName from members m,team t,roles r where m.memRoleId=r.roleId and r.teamId=t.teamId where;`);
  await connection.end();
  response.send(resultSet);
  });

app.listen(port,function(error){
if(error) return console.log("Something is wrong...."+error)
return console.log("Server is starting on port "+port);
})