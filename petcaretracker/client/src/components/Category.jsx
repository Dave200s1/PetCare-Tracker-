import { useState } from 'react'
import { Utensils, Footprints, HeartPlus, Scissors } from 'lucide-react'

function Category() {
  const [active, setActive] = useState('feeding')

  const categories = [
    { id: 'feeding', lebel: 'Fütern', icon: <Utensils></Utensils> },
    { id: 'walking', lebel: 'Gassie gehen', icon: <Footprints></Footprints> },
    { id: 'medical', lebel: 'Medical', icon: <HeartPlus></HeartPlus> },
    { id: 'grooming', lebel: 'Kemen', icon: <Scissors></Scissors> },
  ]

  return (
    <>
      <style>
        {`
            .category h3 {
                margin-bottom: 1rem;
            }

            .category-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 1rem;
            }

            .category-card {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                padding: 0.45rem;
                border-radius: 16px;

                background: #3b82f6;
                border: 1px solid #e5e7eb;

                cursor: pointer;
                transition: all 0.2s ease;
            }

            .category-card:hover {
                transform: translateY(-2px);
            }

            .category-icon {
                width: 48px;
                height: 48px;
                border-radius: 50%;

                display: flex;
                align-items: center;
                justify-content: center;

                background: #b7d4f0;
                margin-bottom: 0.5rem;
            }

            /* ACTIVE STATE */
            .category-card.active {
                border: 2px solid #010214;
                background: #b7d4f0;
                color: #000;
            }

            .category-card.active .category-icon {
                background: #010214;
                color: white;
            } `}
      </style>

      <section className="category">
        <h3>Was kommt als nächstes ?</h3>
        <div className="category-grid">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={
                active === cat.id ? 'category-card active' : 'category-card'
              }
              onClick={() => setActive(cat.id)}
            >
              <div className="category-icon">{cat.icon}</div>
              <span>{cat.lebel}</span>
            </button>
          ))}
        </div>
      </section>
    </>
  )
}

export default Category
