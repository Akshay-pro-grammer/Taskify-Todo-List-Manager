import { useState,useEffect } from 'react'
import Navbar from './components/Navbar'
import Message1 from './components/Message1'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [finished, setFinished] = useState(true)

  useEffect(() => {
    let todoString =localStorage.getItem("todos")
    if(todoString){
      let todos=JSON.parse(todoString)
      setTodos(todos)
    }
  }, [])
  
  const toggleFinished = () => {
    setFinished(!finished)
  }
  
  const saveTodos = (params) => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  
  const handleCheckbox = (e) => {
    let id=e.target.name
    const index=todos.findIndex(todo=>todo.id==id)
    let newTodos=[...todos];
    newTodos[index].isCompleted=!newTodos[index].isCompleted
    setTodos(newTodos)
    saveTodos()
  }
  const handleEdit = (e,id) => {
    let t=todos.filter(item=>item.id==id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(todo => todo.id != id)
    setTodos(newTodos)
    saveTodos()
  }
  const handleDelete = (e,id) => {
    if (confirm("Are you sure you want to delete?")) {
      let newTodos = todos.filter(todo => todo.id != id)
      setTodos(newTodos)
      saveTodos()
    }
  }
  const handleAdd = () => {
    setTodos([...todos,{id:uuidv4(),todo,isCompleted:false}])
    setTodo("")
    saveTodos()
  }
const handleChange = (e) => {
  setTodo(e.target.value)
}
  return (
    <>
    <Navbar/>
      <div className='mx-5 md:container md:mx-auto my-5 rounded-xl bg-blue-200 p-5 min-h-[80vh] md:w-1/2'>
        <h1 className='font-bold text-center text-2xl'>Taskify - Tasks Management made easy!!!</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-lg font-bold my-3'>
            Add a Todo
          </h2>
          <div className="flex gap-1">
           <input onChange={handleChange} value={todo} className='w-full rounded-lg py-1 px-5' type="text" />
           {console.log(todo)}
           <button onClick={handleAdd} disabled={todo.length<=3} className='disabled:bg-slate-500 text-blue-100 bg-blue-700 hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-bold'>Save</button>
          </div>
        </div>
          <input onChange={toggleFinished} type="checkbox" id=''show checked={finished} /><label className='mx-2' htmlFor="show">Show Finished</label> 
          <h1 className='text-lg font-bold'>
              Your Todo list
          </h1>
        <div className='todos'>
          {todos.length === 0 && <Message1/>}
          {todos.map(item => {
            
          
          return (finished || !item.isCompleted) && <div key={item.id} className="todo flex my-3 justify-between">
            <div className="flex gap-5">
              <input type="checkbox" onChange={handleCheckbox} checked={item.isCompleted} name={item.id} />
              <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
              <button onClick={(e)=>{handleEdit(e,item.id)}} className='text-blue-100 bg-blue-700 hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-bold mx-2'><FaEdit /></button>
              <button onClick={(e)=>{handleDelete(e,item.id)}} className='text-blue-100 bg-blue-700 hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-bold mx-2'><MdDelete/></button>
            </div>
          </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
