import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let todos = [
    { id:1 , text: "밥 먹기", done: false},
    { id:2 , text: "공부하기", done: false},
];

app.get("/hello", (req, res)=>{
    res.send("안녕하세요");
});

app.get("/todos", (req, res) => {
    res.json(todos);
})

app.post("/todos", (req,res) => {
    const { text } = req.body;

    if(!text || text.trim() === "") {
        return res.status(400).json({message : "text 가 필요합니다."})
    }

    const newTodo = { id: Date.now(), text : text, done : false };
    todos.push(newTodo);

    res.status(201).json(newTodo);
});

app.patch("/todos/:id" , (req, res) => {
    const id = Number(req.params.id);
    const todo = todos.find((t) => t.id === id);

    if (!todo) {
        return res.status(404).json({ message: "없는 항목입니다."});
    }

    todo.done = !todo.done;
    res.json(todo);
});

app.delete("/todos/:id", (req,res) => {
    const id = Number(req.params.id);
    const exists = todos.some((t) => t.id === id);

    if (!exists) {
        return res.status(404).json({message: "없는 항목입니다." });
    }

    todos = todos.filter((t) => t.id !== id);
    res.status (204).send();
});

app.listen(3000,() => {
    console.log("서버 실행 중 : http://localhost:3000");
});