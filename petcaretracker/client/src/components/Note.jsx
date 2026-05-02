import { useState } from 'react'
import { NotebookText } from 'lucide-react'

function Note() {
  //  const [state, setState] = useState(null);
  return (
    <>
      <style>{`
      .SaveBtn{
          background: #3b82f6;
          border-radius: 14px;
          cursor: pointer;
      }

      .SaveBtn:hover{
        background: #0e3169;
      }
    `}</style>
      <div className="container">
        <form>
          <p>
            <NotebookText></NotebookText>
            <label>Notiz hinterlegen</label>
          </p>
          <textarea className="Message"></textarea>
          <input className="SaveBtn" type="submit" value={'Speichern'}></input>
        </form>
      </div>
    </>
  )
}

export default Note
