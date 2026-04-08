import { useEffect,useState } from "react"
import { Footprints } from "lucide-react";

function TastFeed (){
    const [tasks,setTasks] = useState([]);

    useEffect(()=>{
        fetch("/tasks.xml")
        .then((res)=> res.text())
        .then((xmlString) =>{
            const parser = new DOMParser();
            const xml = parser.parseFromString(xmlString, "text/html");

            const taskNodes = xml.getElementsByTagName("task");

            const parsedTasks = Array.from(taskNodes).map((task)=>({
                time: task.getElementsByTagName("time")[0].textContent,
                title: task.getElementsByTagName("title")[0].textContent,
                pet: task.getElementsByTagName("pet")[0].textContent,
            }));

            setTasks(parsedTasks);
        })
    },[]);

    return(
        <>
        <section className="container">
            <h3>
            Bevorstehende Tasks <small>({tasks.length} gesamt)</small>
            </h3>
        

        {tasks.map((task,index)=>(
            <article key={index}>
            <strong>{task.time}</strong>
            <p>{task.title}</p>
            <Footprints></Footprints>
            <small>@ {task.pet}</small>
            </article>
        ))}
        </section>
        </>
    )

}

export default TastFeed