import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const router = express.Router();
const app = express();

const corsOptions = {
  origin: '*', 
  credential: true, 
}
app.use(cors(corsOptions))
app.use(bodyParser.json());

app.use((req, res, next) => {
  next();
});
const todo_db = {
  todos: [
    {
      id: 1,
      task: "자바스크립트 다시 보기",
    },
    {
      id: 2,
      task: "타입스크립트 마스터 하기",
    },
    {
      id: 3,
      task: "리액트 마스터 하기",
    },
  ]
};
const createMassTodos = (count) => {
  for(let i = 4; i < count; i++) {
    todo_db.todos.push({id: i, task: "task"+i})
  }
}
// createMassTodos(10000);

app.use(router);
router.get("/api/v1/todos", (req, res) => {
  res.send(todo_db.todos).status(200);
});
router.get("/api/v1/todos/:id", (req, res) => {
  const todo = todo_db.todos.find((todo) => todo.id == req.params.id);
  if(typeof todo === 'undefined') {
    res.sendStatus(404);
  } else {
    res.send(todo);
  } 
});
router.post("/api/v1/todos", (req, res) => {
  const todo = req.body;
  todo_db.todos.push(todo);
  res.sendStatus(200);
});
router.put("/api/v1/todos/:id", (req, res) => {
  const index = todo_db.todos.findIndex((todo) => todo.id == req.params.id);
  if(index != -1) {
    todo_db.todos[index] = req.body;
    res.sendStatus(200);
  }
  else {
    res.sendStatus(404);
  }
});
router.delete("/api/v1/todos/:id", (req, res) => {
  todo_db.todos = todo_db.todos.filter((todo) => todo.id != req.params.id);
  res.sendStatus(200);
});
app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

app.listen({ port: 8000 }, () => {
  console.log("todos REST API 서버가 localhost:8000 에서 실행됩니다...");
});
