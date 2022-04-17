import processingImage from './process.gif'
import dateFormat from "dateformat";
import React from 'react';  
import Calendar from 'react-calendar'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import 'react-calendar/dist/Calendar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit,  faTrash, faAdd, faSearch} from '@fortawesome/free-solid-svg-icons';
import { red } from '@material-ui/core/colors';

const getEvent=()=>{
  const promise=new Promise((resolve,reject)=>{
    fetch("/getEvent").then((response)=>{
if(!response.ok) throw Error("Unable to fetch event");
return response.json();
    }).then((events)=>{resolve(events)}).catch((error)=>{
      reject(error);
    })
  });
  return promise;
}
const deleteEventByID=(id)=>{
  
  const datastring=`EventId=${encodeURIComponent(id)}`;
  const promise=new Promise((resolve,reject)=>{
  fetch("/deleteDetail",{
    "method":"POST",
"headers":{
"Content-Type":"application/x-www-form-urlencoded"
},
"body":datastring
  }).then((response)=>{
if(!response.ok) throw Error ("Unable to delete this Event");
    return response.json;
  }).then((deleteEvent)=>{
resolve(deleteEvent)
  }).catch((error)=>{
    reject(error.message)
  })
   
  });
  return promise;
  }
  const editEventByServer=(event)=>{
    var datastring=`eventId=${event.eventId}&eventName=${encodeURIComponent(event.eventName)}&eventDate=${encodeURIComponent(event.eventDate)}&eventTime=${encodeURIComponent(event.eventTime)}&mgrId=${encodeURIComponent(event.eventMgrId)}&description=${encodeURIComponent(event.eventDescription)}`
    // alert(datastring)
    const promise=new Promise((resolve,reject)=>{
    fetch("/editEvent",{
      "method":"POST",
      "headers":{
      "Content-Type":"application/x-www-form-urlencoded"
      },
      "body":datastring
    }).then((response)=>{
      if(!response.ok) throw Error("Unable to Edit this Event");
      return response.json()}).then((event)=>{resolve (event)}).catch((error)=>{
      reject(error.message)
    })
    });
    return promise;
  }
  const saveNewEventOnServerSide=(event)=>{
    var datastring=`eventId=${event.eventId}&eventName=${encodeURIComponent(event.eventName)}&eventDate=${encodeURIComponent(event.eventDate)}&eventTime=${encodeURIComponent(event.eventTime)}&mgrId=${encodeURIComponent(event.eventManagerId)}&description=${encodeURIComponent(event.eventDescription)}`
    // alert(datastring)
    const promise=new Promise((resolve,reject)=>{
    fetch("/addNewEvent",{
      "method":"POST",
      "headers":{
      "Content-Type":"application/x-www-form-urlencoded"
      },
      "body":datastring
    }).then((response)=>{
      if(!response.ok) throw Error("Unable to add New Event  Event");
      return response.json()}).then((event)=>{resolve (event)}).catch((error)=>{
      reject(error.message)
    })
    });
    return promise;
  }
  function convertTo24HrsFormat(time) {
    const slicedTime = time.split(/(PM|AM)/gm)[0];
 
    let [hours, minutes] = slicedTime.split(':');
 
    if (hours === '12') {
       hours = '00';
    }
 
    let updateHourAndMin;
 
    function addition(hoursOrMin) {
       updateHourAndMin =
          hoursOrMin.length < 2
             ? (hoursOrMin = `${0}${hoursOrMin}`)
             : hoursOrMin;
 
       return updateHourAndMin;
    }
 
    if (time.endsWith('PM')) {
       hours = parseInt(hours, 10) + 12;
    }
 
    return `${addition(hours)}:${addition(minutes)}`;
 }
 function convertDate(date){
  const input = date
  const [day, month, year] =  input.split('/');
  return (`${year}/${month}/${day}`);
 }
 const searchEventFromServerSide=(value)=>{
   var datastring= `searchByCharacter=${value}`;
  
   const promise=new Promise((resolve,reject)=>{
    fetch("/searchEvent",{
      "method":"POST",
      "headers":{
      "Content-Type":"application/x-www-form-urlencoded"
      },
      "body":datastring
    }).then((response)=>{
      if(!response.ok) throw Error("Unable to aConnect  Event");
      return response.json()}).then((events)=>{resolve (events)}).catch((error)=>{
      reject(error.message)
    })
   })
   return promise;
 }
 const getAllEventDetailFromServerSide=(id)=>{
  var datastring= `getId=${id}`;
  const promise=new Promise((resolve,reject)=>{
   fetch("/getAllDetail",{
     "method":"POST",
     "headers":{
     "Content-Type":"application/x-www-form-urlencoded"
     },
     "body":datastring
   }).then((response)=>{
     if(!response.ok) throw Error("don't get a full detail Event");
     return response.json()}).then((getAlldetail)=>{resolve (getAlldetail)}).catch((error)=>{
     reject(error.message)
   })
  })
  return promise;
}
 




const Event = () => {
  const [clickDate, setClickDate] = React.useState("");
 const [clickChangeDate,setClickChangeDate]=React.useState("");
 const [onChangeSelectedEvent,setOnChangeSelectedEvent]=React.useState([])
 const [viewMode,setViewMode]=React.useState("process")
  const [events,setEvents]=React.useState([]);
  const [getDetailById,setGetDetailById]=React.useState([])
  React.useEffect(()=>{
    //set inital time
    var t=dateFormat(clickDate, "dd/mm/yyyy")
    setClickChangeDate(t);

    //get Event from database
    setViewMode("process");
    getEvent().then((events)=>{
      setViewMode("showAllEvent")
      events.forEach((event)=>{
        //convert into string and data format
        event.eventDate=dateFormat(event.eventDate, "dd/mm/yyyy");
        // alert(event.eventDate)
        //Convert Time to am/pm
          var timeString=event.eventTime;
        const timeString12hr = new Date('1970-01-01T' + timeString + 'Z')
        .toLocaleTimeString('en-US',
          {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
        );
        event.eventTime=timeString12hr;
      })
      setEvents(events);
      clickEvents()
    },(error)=>{
      // viewMode("process")
      console.log(error);
    })
  }
  , [])
  
 function onChange(calDate){
setClickDate(calDate);
var r=calDate;
// var t=format(r, 'yyyy/MM/dd kk:mm:ss')
var t=dateFormat(r, "dd/mm/yyyy")
setClickChangeDate(t)
clickEvents()
 }
 const clickEvents=()=>{
  // alert(clickChangeDate)
   var selectedEvents=[];
   events.forEach((event)=>{
   
     if(event.eventDate===clickChangeDate)
     {
       selectedEvents.push(event);
     }
   })
   setOnChangeSelectedEvent(selectedEvents);
 }
 const  eventsDates=[];
const tileContent=({ date, view })=>{
  date=dateFormat(date, "dd/mm/yyyy")
 events.forEach((event)=>{
   eventsDates.push({"date":event.eventDate,"eventName":event.eventName});
 })
 
 var i=0;
 while(i<eventsDates.length)
 {
if(date===eventsDates[i].date)
{
  return <p>*</p>
}
  i++;
 }
}
const calenderStyle = {
  color: "white",
  width:"35%",
  backgroundColor: "#cf8372",
  padding: "10px",
  fontFamily: "Arial",
marging:"50px",
leftPadding:"100px"
};
const styleShowOnTime=  {
  color: "white",
  width:"50%",
  height:"200px",
  position:"absolute",
  top:"100px",
  right:"10px",
  backgroundColor: "#cf8372",
  padding: "10px",
  fontFamily: "Arial",
};
function gettingEventWhenChange(){
  getEvent().then((events)=>{
    setViewMode("showAllEvent")
    events.forEach((event)=>{
      //convert into string and data format
      event.eventDate=dateFormat(event.eventDate, "dd/mm/yyyy");
      // alert(event.eventDate)
      //Convert Time to am/pm
        var timeString=event.eventTime;
      const timeString12hr = new Date('1970-01-01T' + timeString + 'Z')
      .toLocaleTimeString('en-US',
        {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
      );
      event.eventTime=timeString12hr;
    })
    setEvents(events);
    clickEvents()
  },(error)=>{
    // viewMode("process")
    console.log(error);
  })
}
const deleteingEvent=(id)=>{
  setViewMode("process");
deleteEventByID(id).then((resolve)=>{
setViewMode("showAllEvent");
  console.log(resolve.success);
},(reject)=>{
  console.log("Event not delete ,due to some Error")
})
gettingEventWhenChange();
setViewMode("showAllEvent");
}
const saveEditEvent=(event)=>{
editEventByServer(event).then((suucess)=>{
console.log("success");
}).then((error)=>{
  console.log("unable to edit,please try again")
})
gettingEventWhenChange();
}
const a={
  backgroundColor:"#704340"
}
const addNewEvent=(ev)=>{
  setViewMode("addNewEvent");
}
const cancelAddEvent=(ev)=>{
  setViewMode("showAllEvent")
}
const saveNewEvent=(newEvent)=>{
  setViewMode("process");
  saveNewEventOnServerSide(newEvent).then((newEventAdded)=>{
    events=newEventAdded;
  }).then((error)=>{
    alert("sorry we Can't added,please try again")
  })
  gettingEventWhenChange();
  setViewMode("showAllEvent")
}

async function  serachEvent(value){
  const eventsCome=[];

await searchEventFromServerSide(value).then((eventsComeFromServer)=>{
   var i=0;
   while(i<eventsComeFromServer.length)
{
  eventsCome.push(eventsComeFromServer);
   i++
  }
  },(error)=>{
alert(error);
  })

  return eventsCome;
}

const getAllEventDetail=(id)=>{
  getAllEventDetailFromServerSide(id).then((detailMember)=>{
    // alert(JSON.stringify(detailMember))
  setGetDetailById(events);
  },(error)=>{
    console.log("unable to come data "+error)
  })
}

  return (   
      <div style={a}>
       <div style={calenderStyle} >
       <Calendar onChange={onChange} value={clickDate} tileContent={tileContent} 
 />
      </div>
     
     <div style={styleShowOnTime}> 
     
     <ShowEventOntime  events={onChangeSelectedEvent} clickDate={clickDate}  />
     </div>
      {viewMode==="process" && <Processing />}
     {viewMode==="showAllEvent" && <ShowAllEvent events={events} deleteingEvent={deleteingEvent} savingEditEvent={saveEditEvent} addNewEvent={addNewEvent} serachEvent={serachEvent} getAllEventDetail={getAllEventDetail} getDetailById={getDetailById}/>}
     {viewMode==="addNewEvent" && <AddNewEvent events={events} cancelAddEvent={cancelAddEvent} saveNewEvent={saveNewEvent}/>}
      </div>
  
  );
};

const Processing=()=>{
  return(
    <div>
<img src={processingImage} height="100%" width="100%"/>
    </div>
  )
}
const ShowEventOntime=({events,clickDate})=>{
  // const [eventDate,setEventDate]=React.useState(new Date());
 if(events.length!=0) return(
    <div>
    <h2>Event for this date -{events.eventDate}</h2>
      <ul>
        {
          events.map((event)=>{
   return <li>{event.eventName}</li>

      })
        }
      </ul>
    </div>
) 
if(events.length===0) return(
  <div>
  <hr/>
    <h2>Sorry ... not event found on date</h2>
    <hr/>
  </div>
)
}

const iconStyle={
  position:"absolute",
  right:"15px",
  cursor:"pointer"
}

const ShowAllEvent=({events,getDetailById,deleteingEvent,savingEditEvent,addNewEvent,serachEvent,getAllEventDetail})=>{
 const [changeEvent,setChangeEvent]=React.useState(false);
  const [entryAdmin,setEntryAdmin]=React.useState(true);
  const [eventName,setEventname]=React.useState("");
  const [eventDate,setEventDate]=React.useState("");
  const[eventTime,setEventTime]=React.useState("");
  const [eventMgrId,setEventMenagerId]=React.useState("");
  const [editEventById,setEditEventById]=React.useState("")
  const [eventDescription,setEventDescription]=React.useState("");
  const [addEvent,setAddEvent]=React.useState(false);
  const [knowMore,setKnowMore]=React.useState(false)
  var eventSearch=[];
  // const [eventSearch,setEventSearch]=React.useState([])
  const editEvent=(ev)=>{
// alert(changeEvent+""+addEvent+""+knowMore)
setEditEventById(ev.currentTarget.id)
setChangeEvent(true);
// giveIninitalValue();
events.forEach((event)=>{
  if(event.eventId===ev.currentTarget.id)
  {
    setEventname(event.eventName);
    setEventDate(event.eventDate);
    setEventMenagerId(event.mgr_id);
    setEventTime(event.eventTime);
    setEventDescription(event.eventDescription);
  }
})

  }
 
  const deleteEvent=(ev)=>{
    // alert(ev.currentTarget.id)
deleteingEvent(ev.currentTarget.id)
  }

const cancelEditEvent=(ev)=>{
setChangeEvent(false);
}
const saveEditEvent=(ev)=>{
  const event={
    "eventId":editEventById,
    "eventName":eventName,
    "eventDate":convertDate(eventDate),
    "eventTime":convertTo24HrsFormat(eventTime),
    "eventMgrId":eventMgrId,
    "eventDescription":eventDescription
  }

savingEditEvent(event);
setChangeEvent(false);
}
const EditFormStyle={
  margin:"2.5px",
  padding:"2.5px",
  border:"1px solid #cf8372"
}
const addIconStyle={
  position:"absolute",
  right:"10px",
  border:"1px solid black",
  cursor:"pointer"
}
const addEventClickHandle=(ev)=>{
addNewEvent(ev);
}
function clickKnowMore(ev){
setKnowMore(true)
setEditEventById(ev.currentTarget.id);
getAllEventDetail(ev.currentTarget.id);
}
async function SearchChangeEvent(ev){
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
    var event;
   
  serachEvent(ev.currentTarget.value).then((e)=>{
//  alert(JSON.stringify(e))

var i=0;
while(i<e.length){
event=new Event(e[i].eventId,e[i].eventName,e[i].eventDate,e[i].eventTime,e[i].eventManagerId.e[i].eventDescription)
eventSearch.push(event);
i++;
}
  })
  alert(eventSearch)
}

 if(!changeEvent && !addEvent && !knowMore) return(
  
    <div>
    <h3>All Events{entryAdmin && <span style={addIconStyle}><FontAwesomeIcon onClick={addEventClickHandle} icon={faAdd }/> </span>}</h3>
    <TextField 
  
          id="outlined-basic"
          variant="outlined"
          label="Search"
          onChange={SearchChangeEvent}
          />
    
   <ul>
  {
events.map((event)=>{
  return( 
    <div>
    <hr/>
    <li key={event.eventId}>{event.eventId}</li>
   Event Name <span><b>{event.eventName}</b></span><br></br>
   Event Date - <span>{event.eventDate}</span> <br></br>
   Event Time - {event.eventTime} <br></br>
   Event Manage Id -{event.mgr_id} <br></br>
   Description - {event.eventDescription}
   <button type="button" id={event.eventId} onClick={clickKnowMore}>Know more</button>
    {entryAdmin && <span style={iconStyle}>
   <FontAwesomeIcon icon={faEdit} onClick={editEvent} id={event.eventId}/>&nbsp; 
     <FontAwesomeIcon icon={faTrash} onClick={deleteEvent} id={event.eventId}/>
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
  )
  if(changeEvent && !addEvent && !knowMore){
    return(
      <div>
        <h3>All Event </h3>
        <ul>{
          events.map((event)=>{
            return( 
    <div>
    <hr/>
     <li key={event.eventId}>{event.eventId}</li>
     {editEventById===event.eventId &&
   <div>
   <TextField style={EditFormStyle}
        label="Event Name"
        variant="filled"
        value={eventName}
        onChange={e => setEventname(e.target.value)}
      />
       <TextField style={EditFormStyle}
        label="Event Date"
        variant="filled"
        value={eventDate}
        onChange={e => setEventDate(e.target.value)}
      />
       <TextField style={EditFormStyle}
        label="Event Time"
        variant="filled"
        value={eventTime}
        onChange={e => setEventTime(e.target.value)}
      />
       <TextField style={EditFormStyle}
        label="Event Manager Id"
        variant="filled"
        value={eventMgrId}
        onChange={e => setEventMenagerId(e.target.value)}
      />
       <TextField style={EditFormStyle}
        label="Description"
        variant="filled"
        value={eventDescription}
        onChange={e => setEventDescription(e.target.value)}
      />
      <div>
       <Button variant="contained" onClick={cancelEditEvent} style={{"margin":"8px"}}>
          Cancel
        </Button>
        <Button type="Button" style={{"margin":"10px"}} variant="contained" color="primary" id={editEventById} onClick={saveEditEvent} >
          SAVE
        </Button>
      </div>
   </div>

     }
     {
      editEventById!==event.eventId &&
     <span> <h3>{event.eventName}</h3>
    <span>{event.eventDate} ({event.eventTime})</span>
    </span>
     }
    <hr/>
    </div>
    )
          })
        }</ul>
       
      </div>
    )
  }
 


  if(!changeEvent && !addEvent && knowMore){
    // alert()


    return(
      <div>
        <h3> Event </h3>
        <ul>{
          events.map((event)=>{
            return( 
    <div>
    <hr/>
     <li key={event.eventId}>{event.eventId}</li>
     {editEventById===event.eventId &&
   <div>
   <h3>{event.eventName}</h3>
   <span>{event.eventDate}</span>&nbsp;&nbsp;&nbsp;&nbsp;
   <span>{event.eventTime}</span>  
    {getDetailById[0].memFname}
   </div>

     }
     {
      editEventById!==event.eventId &&
     <span>
     Event Name <span><b>{event.eventName}</b></span><br></br>
   Event Date - <span>{event.eventDate}</span> <br></br>
   Event Time - {event.eventTime} <br></br>
   Event Manage Id -{event.mgr_id} <br></br>
   Description - {event.eventDescription}
   <button type="button" id={event.eventId} onClick={clickKnowMore}>Know more</button>
    </span>
     }
    <hr/>
    </div>
    )
          })
        }</ul>
       
      </div>
    )
  }




}
const AddNewEvent=({cancelAddEvent,saveNewEvent,events})=>{
  const [eventId,setEventId]=React.useState("");
  const [eventName,setEventName]=React.useState("")
  const [eventDate,setEventDate]=React.useState("");
  const [eventTime,setEventTime]=React.useState("");
  const [eventManagerId,setEventMenagerId]=React.useState("");
  const [eventDescription,setEventDescription]=React.useState("");
  const [title,setTitle]=React.useState("");
 
const IdSameTitle={
  color:"red",
  "justify-content": "center",
  padding:"5px",
 margin:"5px",
 "text-align": "center",
"animation":{"effect":"blind","duration":"5000"}
}

  const cancelEvent=(ev)=>{
cancelAddEvent(ev);
  }
  const saveEvent=()=>{
    var i=0;
    while(i<events.length)
    {
      if(events[i].eventId===eventId)
      {
        setTitle("*  Id already exits  *");
        return;
      }
      i++;
    }
    const newEvent={
      "eventId":eventId,
      "eventName":eventName,
      "eventDate":convertDate (eventDate),
      "eventTime":convertTo24HrsFormat(eventTime),
      "eventManagerId":eventManagerId,
      "eventDescription":eventDescription
    }
    setTitle("")
    saveNewEvent(newEvent);
  }
  return(
    <div>
      <h3>You can ADD new Event ,right now</h3>
      <h5>Your Event ID Must Be Unique</h5>
      <div>
      <span style={IdSameTitle}><b>{title}</b></span><br></br>
      <TextField 
        label="Event Id"
        variant="filled"
        value={eventId}
        onChange={e => setEventId(e.target.value)}
      />&nbsp;&nbsp;&nbsp;&nbsp;
   <TextField 
        label="Event Name"
        variant="filled"
        value={eventName}
        onChange={e => setEventName(e.target.value)}
      />&nbsp;&nbsp;&nbsp;&nbsp;
       <TextField 
        label="Event Date"
        variant="filled"
        value={eventDate}
        onChange={e => setEventDate(e.target.value)}
      />&nbsp;&nbsp;&nbsp;&nbsp;
       <TextField 
        label="Event Time"
        variant="filled"
        value={eventTime}
        onChange={e => setEventTime(e.target.value)}
      />&nbsp;&nbsp;&nbsp;&nbsp;
       <TextField 
        label="Event Manager Id"
        variant="filled"
        value={eventManagerId}
        onChange={e => setEventMenagerId(e.target.value)}
      />&nbsp;&nbsp;&nbsp;&nbsp;
       <TextField 
        label="Description"
        variant="filled"
        fullWidth
        value={eventDescription}
        onChange={e => setEventDescription(e.target.value)}
      />
      <div>
       <Button variant="contained" onClick={cancelEvent} style={{"margin":"8px"}}>
          Cancel
        </Button>
        <Button type="Button" style={{"margin":"10px"}} variant="contained" color="primary" 
         onClick={saveEvent} >
          SAVE
        </Button>
      </div>
   </div>

    </div>
  )
}
export default Event;