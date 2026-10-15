import { useState, useEffect} from "react";

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [text, setText] = useState("");
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  },[todos])

  function handleAdd() {
    if (text.trim() === "") return;
    setTodos([...todos,{ id: Date.now(), text: text }]);
    setText("");
  }
 
  function handleDelete(id){
    setTodos(todos.filter((todo) => todo.id !== id));
  }
  
  function handleToggle(id){
    setTodos(
      todos.map((todo) =>
        todo.id === id ? {...todo, done: !todo.done} : todo
      
      )
    );
  }

  return (
    <div>
      <h1>나의 할 일 목록</h1>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="할 일을 입력하세요"
        />
      <button onClick={handleAdd}>추가</button>
      <ul>
        {todos.map((todo)=>(
          <li key={todo.id}>
            <span
             onClick={()=> handleToggle(todo.id)}
             style={{
              textDecoration:todo.done ? "line-through" : "none",
              cursor : "pointer"
             }}
             >
              {todo.text}
             </span>
          
            <button onClick={() => handleDelete(todo.id)}>삭제</button>  
          </li>
      ))}
      </ul>
    </div>
  );
}

export default App;
