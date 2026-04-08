import TastFeed from "../components/TaskFeed"
import FilterHaustiere from "../components/FilterHaustiere"

function Dashboard (){
    return (
        <>

            <main>
                <FilterHaustiere></FilterHaustiere>
                <TastFeed></TastFeed>

            </main>
        </>
    )

}

export default Dashboard

