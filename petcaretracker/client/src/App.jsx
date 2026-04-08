
import Navigation from './components/Navigation';
import TastFeed from './components/TaskFeed';
import Dashboard from './pages/Dashboard';

function App() {

  /**
   *     <main className="container-fluid">
      <Navigation></Navigation>
      <TastFeed></TastFeed>
    </main>
   */

  return (
    <>
    <main className="container-fluid">
      
      <Navigation></Navigation>
    </main>
      <Dashboard></Dashboard>
    </>
  )
}

export default App
