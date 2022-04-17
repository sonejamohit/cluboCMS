import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit,  faTrash} from '@fortawesome/free-solid-svg-icons';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
const getDetailFromServerSide=()=>{
  const promise=new Promise((resolve,reject)=>{
    fetch("/getMemDetail").then((response)=>{
if(!response.ok) throw Error("Unable to fetch All detail");
return response.json();
    }).then((getAllDetailEvents)=>{resolve(getAllDetailEvents)}).catch((error)=>{
      reject(error);
    })
  });
  return promise;
}
const deleteMemberFromServer=(id)=>{
const datastring=`memId=${encodeURIComponent(id)}`;
  const promise=new Promise((resolve,reject)=>{
  fetch("/deleteMember",{
    "method":"POST",
"headers":{
"Content-Type":"application/x-www-form-urlencoded"
},
"body":datastring
  }).then((response)=>{
if(!response.ok) throw Error ("Unable to delete this Event");
    return response.json();
  }).then((deleteEvent)=>{
resolve(deleteEvent)
  }).catch((error)=>{
    alert("bye")
    reject(error.message)
  })
   
  });
  return promise;
}
 function Contact() {
   const [membertDetail,setmembertDetail]=React.useState([]);
   const [accessID,setAccessId]=React.useState(true);
   const [editDetail,setEditDetail]=React.useState(false);
   const [editById,setEditById]=React.useState("");
   const [Fname,setFname]=React.useState("");
      const [Lname,setLname]=React.useState("");
   const [email,setEmail]=React.useState("");
   const [contact,setContact]=React.useState("");
   const [role,setRole]=React.useState("");
   const [teamName,setTeamName]=React.useState("");
  React.useEffect(()=>{
    getDetailFromServerSide().then((getAllDetailEvents)=>{
      setmembertDetail(getAllDetailEvents);
    },(error)=>{
      console.log("Unable to came details from server side")
    })
  },[])
  const iconStyle={
    position:"absolute",
    right:"10px", 
    cursor:"pointer"
  }
  function detailCome(){
    getDetailFromServerSide().then((getAllDetailEvents)=>{
      setmembertDetail(getAllDetailEvents);
    },(error)=>{
      console.log("Unable to came details from server side")
    })
  }
  const getInitailValue=(id)=>{
    membertDetail.forEach((member)=>{
      if(member.memId===id)
      {
        setFname(member.memFname);
        setLname(member.memLname);
        setEmail(member. memEmail);
        setContact(member.contact);
        setRole(member.roleName);
        setTeamName(member.teamName);
      
      }
    })
  }
  const deleteHandle=(ev)=>{
    deleteMemberFromServer(ev.currentTarget.id).then(()=>{
     
    })
    getDetailFromServerSide().then((getAllDetailEvents)=>{
      setmembertDetail(getAllDetailEvents);
    },(error)=>{
      console.log("Unable to came details from server side")
    })
  }
  const editHandle=(ev)=>{
    getInitailValue(ev.currentTarget.id)
setEditById(ev.currentTarget.id);
setEditDetail(true);
  }
  const cancelDetailHandle=()=>{
    setEditDetail(false);
    setEditById("");
  }
 const saveDetailHandle=(ev)=>{
 }
  return (
   <div>
   <h1>Members</h1>
   <ul>
     {
       membertDetail.map((member)=>{
      if(!editDetail)   return(
           <div>
           <hr/>
          Name : <span>{member.memFname} {member.memLname}</span><br></br>
          Contact : <span>{member.contact}</span><br></br>
          Email : <span>{member.memEmail}</span><br></br>
          Role :  <span>{member.roleName}</span><br></br>
          {
            accessID && <span style={iconStyle}>
            <FontAwesomeIcon icon={faEdit} onClick={editHandle} id={member.memId}/> &nbsp;  
            <FontAwesomeIcon icon={faTrash} onClick={deleteHandle} id={member.memId}/>
            </span>
          }
           Team Name :  <span>{member.teamName}</span><br></br>
             <hr/>
          </div>
         )
          if(editDetail)   return(
           <div>
           <hr/>
           {
             editById===member.memId && <span>
          <TextField
        label="First Name"
        variant="filled"
        value={Fname}
        onChange={e => setFname(e.target.value)}
      /> 
         <TextField
        label="Last Name"
        variant="filled"
        value={Lname}
        onChange={e => setLname(e.target.value)}
      />
       <TextField
        label="Mobile"
        variant="filled"
        value={contact}
        onChange={e => setContact(e.target.value)}
      />
       <TextField
        label="Email"
        variant="filled"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
       <TextField
        label="Role"
        variant="filled"
        value={role}
        onChange={e => setRole(e.target.value)}
      />
       <TextField
        label="Team Name"
        variant="filled"
        value={teamName}
        onChange={e => setTeamName(e.target.value)}
      /><br></br>
      <Button variant="contained" onClick={cancelDetailHandle} style={{"margin":"8px"}}>
          Cancel
        </Button>
         <Button variant="contained" onClick={saveDetailHandle} id={member.memId} style={{"margin":"8px"}}>
          Save
        </Button>
             </span>
           }
            {
             editById!==member.memId && <span>
         Name : <span>{member.memFname} {member.memLname}</span><br></br>
          Contact : <span>{member.contact}</span><br></br>
          Email : <span>{member.memEmail}</span><br></br>
          Role :  <span>{member.roleName}</span><br></br>
          {
            accessID && <span style={iconStyle}>
            <FontAwesomeIcon icon={faEdit} onClick={editHandle} id={member.memId}/> &nbsp;  
            <FontAwesomeIcon icon={faTrash} />
            </span>
          }
           Team Name :  <span>{member.teamName}</span><br></br>
             </span>
           }
             <hr/>
          </div>
         )


       }
       )
     }
   </ul>
   </div>
  );
}
export default Contact;