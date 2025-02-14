import { useState } from "react";

const TodoApp = () => {
  const [todos, setTodos] = useState([]); // prenting the Todos dynamically when user creates a todo
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  console.log(editText)

//   function to create Todo
const addTodo=()=>{
    if(input.trim()){
        setTodos([...todos,{id:Date.now(),text:input,done:false}])
        setInput("")
    }
}

//   function to Remove Todo
const removeTodo=(id)=>{
    setTodos(todos.filter(todo=>todo.id!==id))
}

//   function to Toggle Todo
const toggleTodo=(id)=>{
    setTodos(todos.map(todo=>todo.id===id?{...todo,done:!todo.done}:todo))
}

//   function to Edit Todo
const StartEdit=(id,text)=>{
    setEditId(id)
    setEditText(text)
}

//   function to save-Edit Todo
const SaveEdit=(id)=>{
    setTodos(todos.map(todo=>todo.id===id?{...todo,text:editText}:todo))
    setEditId(null)
    // setEditText("")      
}

  

  return (
    <div className="container">
      {/* input start  */}
      <div className="d-flex p-3">
        <input
          className="form-control border border-success"
          type="text"
          value={input}
          placeholder="enter todo..."
          onChange={(e)=>setInput(e.target.value)}
        />
        {/* input start  */}
        {/* addbtn-start */}
        <button className="btn btn-success mx-3 " onClick={()=>addTodo()}>
          addtodo
        </button>
        {/* addbtn-end */}
      </div>

      {/* Todolist items start */}
      <div className="">
        {todos.map((todo) => (
          <li key={todo.id} className="list-group-item">
            {/* editing the text */}
              {
                editId===todo.id?(
                    <input
                    className="form-control border border-danger"
                    type="text"
                    value={editText}
                    placeholder="enter todo..."
                    onChange={(e)=>setEditText(e.target.value)}
                  />
                ):(
                    <span className={todo.done?"text-decoration-line-through text-secondary":"text-dark"}>{todo.text}</span>
                )
              }
              {/* buttons */}
              {
                editId===todo.id?(
                    <button className="btn btn-success" onClick={()=>SaveEdit(todo.id)}>save</button>
                ):(
                    <>
                     <button className="btn btn-success" onClick={()=>StartEdit(todo.id,todo.text)}>edit</button>
                     <button className="btn btn-success" onClick={()=>toggleTodo(todo.id)}>{todo.done?"undo":"done"}</button>
                    </>
                )
              }
         <button className="btn btn-success" onClick={()=>removeTodo(todo.id)}>Delete</button>

          </li>
        ))}
      </div>
      {/* Todolist items end */}
    </div>
  );
};

export default TodoApp;
