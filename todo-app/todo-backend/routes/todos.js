const express = require('express');
const { Todo } = require('../mongo');
const router = express.Router();
const { getAsync, setAsync } = require('../redis/index');

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({});
  await setAsync('counter', todos.length);
  res.send(todos);
});

router.get('/statistics', async (_, res) => {
  const todoCount = await getAsync('counter');
  res.json({
    added_todos: todoCount
  });
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  });
  let todoCount = await getAsync('counter');
  if (!todoCount) await setAsync('counter', 0);
  todoCount++;
  await setAsync('counter', todoCount);
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  try {
    await Todo.findByIdAndUpdate(req.todo.id, req.body);
    res.send(req.body);
  } catch (error) {
    console.log('Todo ID not found.');
  }
});

// the below will trigger with any path that is /todos/:id
// it will then run the findByIdMiddleware which adds the req.todo prop
// then the next() will call the singleRouter either delete, get or put
router.use('/:id', findByIdMiddleware, singleRouter);

module.exports = router;
