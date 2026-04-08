import {House,SquarePlus, Settings} from 'lucide-react'

function Navigation (){

    return(
        <>
     <style>{`
        .desktop-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .mobile-bottom-nav {
          display: none;
        }
  
        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }
          .mobile-bottom-nav {
            display: block;
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            background-color: var(--pico-background-color);
            box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
            padding: 0.5rem 0;
            z-index: 1000;
          }
          .mobile-bottom-nav ul {
            display: flex;
            justify-content: space-around;
            list-style: none;
            margin: 0;
            padding: 0;
          }
         .mobile-bottom-nav li{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: centre;
            gap: 0.25rem;
         }

        .mobile-bottom-nav a {
            display: block;
            padding: 0.75rem;
            text-align: center;
        }

      `}</style>
        <nav className="desktop-nav container-fluid">
            <ul>
                <li><strong>Pet tracker</strong></li>
            </ul>
            <ul>
                <li><a href="#"className="pico-color-indigo-600">Start</a></li>
                <li><a href="#"className="pico-color-indigo-600">Neu</a></li>
                <li><a href="#"className="pico-color-indigo-600">Einstellungen</a></li>
            </ul>
        </nav>
      

        
        <nav className="mobile-bottom-nav">
            <ul>
                <li>
                    <House></House>
                    <a href="#" className="pico-color-indigo-600">Start</a>
                </li>
                <li>
                    <SquarePlus></SquarePlus>
                    <a href="#" className="pico-color-indigo-600">Neu</a>
                </li>
                <li>
                    <Settings></Settings>
                    <a href="#" className="pico-color-indigo-600">Einstellungen</a>
                </li>
            </ul>
        </nav>
        </>
    )
}

export default Navigation