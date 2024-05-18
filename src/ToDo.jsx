import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';


export default function Todo()  {
let [todos,setTodos] = useState([{task:"sample Task",id:uuidv4(),isDone:false}]);
let [newTodo,setNewTodo] = useState("");

function addTask(){
    setTodos((prevTodos)=>{
        return [...prevTodos,{task:newTodo,id:uuidv4(),isDone:false}];
    });
    setNewTodo("");
}

let updateTodo = (event)=>{
    setNewTodo(event.target.value);
}

let handleDelete = (id)=>{
    setTodos((prevTodos) => prevTodos.filter((e)=> e.id !== id))
}

let upperCaseAll = () => {
  setTodos((prevTodos) =>
    prevTodos.map((e) => {
      return {
        ...e,
        task: e.task.toUpperCase()
      };
    })
  );
};

let upperCaseIt = (id)=>{
    setTodos((prevTodos)=>
        prevTodos.map((e)=>{
            if(e.id == id){
                return {
                    ...e,task:e.task.toUpperCase()
                };
            }else{
                return e;
            }
        })
    )
}

let isTaskDone = (id)=>{
    setTodos((prevTodos)=> prevTodos.map((e)=>{
        if(e.id==id){
            return {...e,isDone:!e.isDone};
        }else{
            return e;
        }
    }))
}

let allTaskDone = ()=>{
    setTodos((prevTodos)=>
        prevTodos.map((e)=>{
            return {...e,isDone:!e.isDone};
        })
    )
}
    return <div className="todo-container">
    
     <h1>TO-DO List</h1>
        <input value={newTodo} onChange={updateTodo} className="todo-input" type="text" placeholder='Enter your to-do work'/><br /><br />
        <button onClick={addTask} className="add-button">Add Task</button>
        <br /><br /><br /><br /><br /><hr />

        <h4>Todo tasks :</h4>
        <ul> {
            todos.map((e) => (
                <li key={e.id}><span style={{textDecoration:e.isDone?"line-through":"none"}}><b>&rarr;</b> {e.task}</span>&nbsp;
                    <button onClick={() => handleDelete(e.id)} className="delete-button">Delete</button><br />
                    <button onClick={() => upperCaseIt(e.id)} className="uppercase-button">UpperCase it</button>
                    <button onClick={() => isTaskDone(e.id)} className="done-button">Task Done !</button>

                </li>
            ))
        }
        </ul>
        <br /><br />
        <button className="uppercase-all-button" onClick={upperCaseAll}>UpperCase All..</button>
        <button className="done-all-button" onClick={allTaskDone}>Done all Task..</button>
    </div>
}