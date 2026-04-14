import { Globe, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import ukFlag from '../assets/united-kingdom.webp';
import deFlag from '../assets/germany.webp';

function Languages (){
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("en");

    const languages = [
        {id: "en", label: "English", flag: ukFlag},
        {id: "de", label: "Deutsch", flag: deFlag},
    ]

    const current = {
        en: "English",
        de: "Deutsch",
    }
    
    return (

          <>
        <style>{`
        .language-container {
            position: relative;
            display: inline-block;
            margin-left: auto;
        }

        .language-trigger {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: none;
          cursor: pointer;
          color: #38bdf8; /* sky blue text */
        }

        .language-trigger span {
          color: #38bdf8;
          font-weight: 500;
        }

        .language-dropdown {
          position: absolute;
          top: 120%;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          border-radius: 16px;
          padding: 0.5rem;
          width: 220px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          z-index: 100;
          background: #38bdf8;
        }

        .language-dropdown::before {
          content: "";
          position: absolute;
          top: -8px;
          left: 50%;
          transform: translateX(-50%);
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-bottom: 8px solid white;
        }

        .language-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
          padding: 0.6rem;
          border-radius: 10px;
          background: none;
          border: none;
          cursor: pointer;
        }

        .language-item:hover {
          background: #f1f5f9;
        }

        .language-item.active {
          background: #212c33; 
        }

        .language-item img {
          width: 24px;
          height: 16px;
          object-fit: cover;
          border-radius: 3px;
        }
        `}</style>
            <div className="language-container">
            <h3>Sprache</h3>
            <button
                className="language-trigger"
                onClick={() => setOpen(!open)}
            >
                <Globe size={18} />
                <span>{current[selected]}</span>
                <ChevronDown size={16} />
            </button>

            {open && (
                <div className="language-dropdown">
                {languages.map((lang) => (
                    <button
                    key={lang.id}
                    className={
                        selected === lang.id
                        ? "language-item active"
                        : "language-item"
                    }
                    onClick={() => {
                        setSelected(lang.id);
                        setOpen(false);
                    }}
                    >
                    <img src={lang.flag} alt={lang.label} />
                    <span>{lang.label}</span>
                    </button>
                ))}
                </div>
            )}

            </div>
        </>
        );
    

}

export default Languages