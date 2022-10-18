import './App.css'
import './index.css';
import Employee from './component/Empolyee';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [role, setRole] = useState('dev')
  const [employees, setEmployees] = useState([
    {
      name: 'Ihsan',
      role: "Intern",
      img: "https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg"
    },
    {
      name: 'Zack',
      role: "Intern",
      img: "https://images.pexels.com/photos/3748221/pexels-photo-3748221.jpeg"
    },
    {
      name: 'Abby',
      role: "Intern",
      img: "https://images.pexels.com/photos/1840608/pexels-photo-1840608.jpeg"
    },
    {
      name: 'Qeis',
      role: "Intern",
      img: "https://images.pexels.com/photos/2530775/pexels-photo-2530775.jpeg"
    }

  ])
  const showEmployee = true;
  return (
    <div className="App bg-blue-900">
      {showEmployee ? (
        <>
          <header className="App-header bg-blue-900">
            <input className='caret-blue-500 focus:caret-indigo-500 text-black' type="text" onChange={(e) => {
              // console.log(e.target.value)
              setRole(e.target.value)
            }} />
            <div className='flex flex-wrap justify-center'>

              {employees.map((employee) => {
                return (
                  <Employee key={uuidv4()} name={employee.name} role={employee.role} img={employee.img} />

                )
              })}
            </div>

          </header>


        </>
      ) : (
        <>
          <header className="App-header">
            <p>You canot see the Employee</p>
          </header>
        </>
      )}

    </div>
  );
}

export default App;
