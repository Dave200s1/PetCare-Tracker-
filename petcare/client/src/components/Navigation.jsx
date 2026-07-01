import {
  House,
  SquarePlus,
  Settings,
  Camera,
  FolderOpen,
  Album,
} from 'lucide-react'

function Navigation({ setPage }) {
  return (
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
            padding: 0.5rem 0 0.6rem;
            z-index: 1000;
          }
          .mobile-bottom-nav ul {
            display: flex;
            justify-content: space-around;
            list-style: none;
            margin: 0;
            padding: 0;
            gap: 0.3rem;
          }
         .mobile-bottom-nav li{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: centre;
            gap: 0.2rem;
            flex: 1;
         }

        .mobile-bottom-nav a {
            display: block;
            padding: 0.1rem 0.25rem;
            font-size: 0.8rem;
            text-align: center;
            text-decoration: none;
        }

      .mobile-bottom-nav svg {
            width: 25px;
            height: 25px;
        }

      `}</style>
      <nav className="desktop-nav container-fluid">
        <ul>
          <li>
            <strong>Pet tracker</strong>
          </li>
        </ul>
        <ul>
          <li>
            <a
              href="#"
              onClick={() => setPage('dashboard')}
              className="pico-color-indigo-600"
            >
              Start
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => setPage('reminder')}
              className="pico-color-indigo-600"
            >
              Neu
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => setPage('snaptshot')}
              className="pico-color-indigo-600"
            >
              Foto
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => setPage('album')}
              className="pico-color-indigo-600"
            >
              Album
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => setPage('settings')}
              className="pico-color-indigo-600"
            >
              Einstellungen
            </a>
          </li>
        </ul>
      </nav>

      <nav className="mobile-bottom-nav">
        <ul>
          <li>
            <House size={30}></House>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                setPage('dashboard')
              }}
              className="pico-color-indigo-600"
            >
              Start
            </a>
          </li>
          <li>
            <SquarePlus size={30}></SquarePlus>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                setPage('reminder')
              }}
              className="pico-color-indigo-600"
            >
              Neu
            </a>
          </li>
          <li>
            <Camera size={30}></Camera>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                setPage('snaptshot')
              }}
              className="pico-color-indigo-600"
            >
              Foto
            </a>
          </li>
          <li>
            <Album size={30}></Album>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                setPage('album')
              }}
              className="pico-color-indigo-600"
            >
              Album
            </a>
          </li>
          <li>
            <Settings size={30}></Settings>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                setPage('settings')
              }}
              className="pico-color-indigo-600"
            >
              Einstellungen
            </a>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Navigation
