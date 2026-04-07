import { useEffect,useState } from "react"


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
            Bevorstehende Tasks <small>({tasks.length} Total)</small>
            </h3>
        

        {tasks.map((task,index)=>(
            <article key={index}>
            <strong>{task.time}</strong>
            <p>{task.title}</p>
            <small>@ {task.pet}</small>
            </article>
        ))}
        </section>
        </>
    )

}

export default TastFeed