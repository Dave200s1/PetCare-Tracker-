import { useEffect,useState } from "react"
import { Footprints, Utensils, HeartPlus,ClipboardList } from "lucide-react";

function TastFeed (){
    const [tasks,setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pets, setPets] = useState([]);
    const [petsLoaded, setPetsLoaded] = useState(false);
    
    useEffect(()=>{
      

        fetch("./meta_data/tasks.xml")
        .then((res)=> res.text())
        .then((xmlString) =>{
            const parser = new DOMParser();
            const xml = parser.parseFromString(xmlString, "text/xml");

            const taskNodes = xml.getElementsByTagName("task");

            const parsedTasks = Array.from(taskNodes).map((task)=>({
                time: task.getElementsByTagName("time")[0].textContent,
                title: task.getElementsByTagName("title")[0].textContent,
                pet: task.getElementsByTagName("pet")[0].textContent,
            }));


        
            setTasks(parsedTasks);
            
            setTimeout(()=>{
                setIsLoading(false);
            },1500)

        fetch("/meta_data/pets.json")
            .then((res)=> res.json())
            .then((data)=> {
                setPets(data.pets);
                setPetsLoaded(true);
            })
            
        })
        .catch(err=>{
            console.error("Fehler beim Laden:", err);
            setIsLoading(false);
        })
    },[]);

    const getPetImage = (petName) =>{
        const pet = pets.find((p)=> p.name.toLowerCase().trim() == petName.toLowerCase().trim());
        return pet ? pet.image : "/imgs/dog1.webp";
    }

    // Auswahl-Logik, Filterleiste
    const getTaskIcon = (title) =>{
        const lowerTitle = title.toLowerCase();
        if(lowerTitle.includes("gassie")) return <Footprints size={20} color="#3b82f6"/>;
        if(lowerTitle.includes("füttern")) return <Utensils size={20} color="#f59e0b"/>;
        if(lowerTitle.includes("gesundheit")) return <HeartPlus size={20} color="#ef4444"/>;
        return <ClipboardList size={20} color="#6b7280" />;

    };

    if(isLoading || !petsLoaded){
        return(
            <section className="LoadingScreen text-center">
                <span aria-busy="true">Lade gespeicherte Aufgaben...</span>
            </section>
        )
    }

    return(
        <>
        <style>{`
            #PetPic{
                width: 90px;
                height: 90px;
                object-fit: cover;
                border-radius: 50%;
            }

            
            .task-card{
                width: 100%;
                display: flex;
            }

            .task-card__layout {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                flex: 1;
            }

                
            .task-card__content{
                display: flex;
                flex-direction: column;
            }
        `}    
        </style>
        <section className="TaskFeed">
            <h3 className="title">
                Bevorstehende Tasks <small className="text-muted">({tasks.length} gesamt)</small>
            </h3>

            <div className="task-list">
                {tasks.map((task, index) => (
                <article 
                    key={index} 
                    className="task-card" 
                    style={{ borderRadius: "12px" }}
                >
                    <div className="task-card__layout">
                    <div className="task-card__content">
                        <div className="task_card__content_left">
                            <strong className="task-card__time">{task.time}</strong> 
                            <p className="task-card__tile">{task.title}</p> 
                            <div className="task-card_meta">
                            {getTaskIcon(task.title)} 
                            <small className="task-card__pet">@ {task.pet}</small> 
                            </div>
                        </div>

                    </div>
                            <div className="task-card__image">
                                <img id="PetPic" src={getPetImage(task.pet)} alt={task.pet}></img>
                            </div>
                    </div>
                </article>
                ))}
            </div>
            </section>
        </>
    )

}

export default TastFeed