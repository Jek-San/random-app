import './App.css'
import './index.css';
import Employee from './component/Empolyee';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AddEmployee from './component/AddEmployee';
import EditEmployee from './component/EditEmployee';


function App() {
  const [role, setRole] = useState('dev')
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'Ihsan',
      role: "Intern",
      img: "https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg"
    },
    {
      id: 2,
      name: 'Zack',
      role: "Intern",
      img: "https://images.pexels.com/photos/3748221/pexels-photo-3748221.jpeg"
    },
    {
      id: 3,
      name: 'Abby',
      role: "Intern",
      img: "https://images.pexels.com/photos/1840608/pexels-photo-1840608.jpeg"
    },
    {
      id: 4,
      name: 'Qeis',
      role: "Intern",
      img: "https://images.pexels.com/photos/2530775/pexels-photo-2530775.jpeg"
    }

  ])

  function updateEmployee(id, newName, newRole) {
    const updateEmployees = employees.map((employee) => {
      if (id == employee.id) {
        return { ...employee, name: newName, role: newRole }
      }
      return employee
    })
    setEmployees(updateEmployees)
    console.log("updateEmployee inside of the app.js")
  }

  function newEmployee(name, role, img) {
    const newEmployee = {
      id: uuidv4(),
      name: name,
      role: role,
      img: img

    }
    console.log(" data yang fitangkap di app.js", name, role, img)
    setEmployees([...employees, newEmployee])
  }


  const showEmployee = true;
  return (
    <div className="App bg-blue-900">
      {showEmployee ? (
        <>
          <header className="App-header bg-blue-900">
            {/* <input className='caret-blue-500 focus:caret-indigo-500 text-black' type="text" onChange={(e) => {
              // console.log(e.target.value)
              setRole(e.target.value)
            }} /> */}

            <AddEmployee newEmployee={newEmployee} />
            <div className='flex flex-wrap justify-center'>

              {employees.map((employee) => {
                const editEmployee = (<EditEmployee
                  id={employee.id}
                  name={employee.name}
                  role={employee.role}
                  updateEmployee={updateEmployee} />)
                return (
                  <Employee
                    key={employee.id}
                    id={employee.id}
                    name={employee.name}
                    role={employee.role}
                    img={employee.img}
                    editEmployee={editEmployee} />

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
