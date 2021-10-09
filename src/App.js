import { React } from 'react'
import { Header } from "./componenents/Header";
import { Footer } from "./componenents/Footer";
import { Tasks } from "./componenents/Tasks";
import { useState, useEffect } from "react"
import { AddTask } from './componenents/AddTask';
import { About } from './componenents/About';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import "./index.css"


//export arrow function with No props grabbed
export const App = () => {

  // current state and a function that updates it
  const [showAddTask, setshowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])


  useEffect(() => {

    // Get tasks from server async then use setTasks to update state
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])



  //Fetch Tasks - the server call
  const fetchTasks = async () => {
    const response = await fetch('http://localhost:5000/tasks')
    const data = await response.json()
    return data
  }
  //Fetch Task
  const fetchTask = async (id) => {
    const response = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await response.json()
    return data
  }
  //Add Task
  const addTask = async (task) => {

    const response = await fetch(`http://localhost:5000/tasks`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await response.json()

    setTasks([...tasks, data])
  }
  //Delete a task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter((task) => task.id !== id))
  }


  //Toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const response = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await response.json()

    setTasks(tasks.map((task) =>
      task.id === id ? {
        ...task, reminder:
          data.reminder
      } : task
    )
    )
  }

  return (

    <Router>
      <div>
        {/* container for app */}
        <div className="container">

          {/* Header */}
          <Header onAdd={() => setshowAddTask(!showAddTask)}
            showAdd={showAddTask} />


          <Route path='/' exact render={(props) => (
            <>

              {/* Add Task */}
              {/* && returns true if both values are true - or returns the second argument if the first is true */}
              {showAddTask && <AddTask onAdd={addTask} />}

              {/* If tasks > 0 render tasks else No tasks to Show */}
              {tasks.length > 0 ? (<Tasks tasks={tasks}
                onDelete={deleteTask}
                onToggle={toggleReminder} />
              ) : ('No Tasks to Show')
              }
            </>
          )} />

          <Route path='/about' component={About} />
          <Footer />
        </div>

      </div>
    </Router>

  )
}
