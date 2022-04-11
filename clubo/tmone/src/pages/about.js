import processingImage from './process.gif'
import dateFormat from "dateformat";
import React from 'react';  
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,  faTrash} from '@fortawesome/free-solid-svg-icons';
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
  fetch("/deleteEvent",{
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
   return promise;
  });
 
  }
const About = () => {
  const [clickDate, setClickDate] = React.useState("");
 const [clickChangeDate,setClickChangeDate]=React.useState("");
 const [onChangeSelectedEvent,setOnChangeSelectedEvent]=React.useState([])
 const [viewMode,setViewMode]=React.useState("process")
  const [events,setEvents]=React.useState([])
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
  }, [])
  
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
  backgroundColor: "DodgerBlue",
  padding: "10px",
  fontFamily: "Arial",
marging:"50px",
  
};
const styleShowOnTime=  {
  color: "white",
  width:"50%",
  height:"200px",
  position:"absolute",
  top:"100px",
  right:"10px",
  backgroundColor: "DodgerBlue",
  padding: "10px",
  fontFamily: "Arial",
};

const deleteingEvent=(id)=>{
  setViewMode("process");
deleteEventByID(id).then((resolve)=>{
  console.log(resolve.success);
}).then((reject)=>{
  alert("Event not delete ,due to some Error")
})
setViewMode("showAllEvent");
}
  return (    
      <div >
       <div className={calenderStyle} >
       <Calendar onChange={onChange} value={clickDate} tileContent={tileContent} 
 />
      </div>
     
     <div style={styleShowOnTime}> 
     
     <ShowEventOntime  events={onChangeSelectedEvent} clickDate={clickDate}  />
     </div>
      {viewMode==="process" && <Processing />}
     {viewMode==="showAllEvent" && <ShowAllEvent events={events} deleteingEvent={deleteingEvent}/>}
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


const ShowAllEvent=({events,deleteingEvent})=>{
 
  const [entryAdmin,setEntryAdmin]=React.useState(true);
  const iconStyle={
    position:"absolute",
    right:"15px",
    cursor:"pointer"
  }
  const editEvent=()=>{
alert("d")
  }
  const deleteEvent=(ev)=>{
    alert(ev.currentTarget.id)
deleteingEvent(ev.currentTarget.id)
  }
  return(
    <div>
    <h3>All Events</h3>
<ul>
  {
events.map((event)=>{
  return( 
    <div>
    <hr/>
    <li key={event.eventId}>{event.eventId}</li>
    <h3>{event.eventName}</h3>
    <span>{event.eventDate} ({event.eventTime})</span>
    {entryAdmin && <span style={iconStyle}>
   <FontAwesomeIcon icon={faEdit} onClick={editEvent} id={event.eventId}/>&nbsp; 
     <FontAwesomeIcon icon={faTrash} onClick={deleteEvent} id={event.eventId}/>
   </span>}
    <hr/>
    </div>
    
    )
})
  }
</ul>
    </div>
  )
}
export default About;