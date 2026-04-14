
import { useState } from 'react';
import Navigation from './components/Navigation';
import TastFeed from './components/TaskFeed';
import Dashboard from './pages/Dashboard';
import Reminder from './pages/Reminder';
import Setting from './pages/Setting';

function App() {

  /**
   *     <main className="container-fluid">
      <Navigation></Navigation>
      <TastFeed></TastFeed>
    </main>
   */

  const [page,setPage] = useState("dashboard");
  return (
    <>
    <main className="container-fluid">
      
      <Navigation setPage={setPage}/>
        {page === "dashboard" && <Dashboard/>}
        {page === "reminder" && <Reminder/>}
        {page === "settings" && <Setting/>}
      
    </main>
      
      
    </>
  );
}

export default App
