"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = [];
const todosRounter = (0, express_1.Router)();
todosRounter.get("/", (req, res, next) => {
    res.json(todos);
});
todosRounter.post("/todo", (req, res, next) => {
    const newTodo = {
        id: new Date().toISOString(),
        text: req.body.text,
    };
    todos.push(newTodo);
    res.status(201).json({ message: "Added Todo!", todos });
});
todosRounter.put("/todo/:todoId", (req, res, next) => {
    const { todoId } = req.params;
    const todoIndex = todos.findIndex((todo) => todo.id === todoId);
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: req.body.text };
        res.status(200).json({ message: "Update Todo!", todos });
    }
    res.status(404).json({ message: "Could not found todo for this  id" });
});
todosRounter.delete("/todo/:todoId", (req, res, next) => {
    const { todoId } = req.params;
    todos = todos.filter((todo) => todo.id !== todoId);
    res.status(200).json({ message: "Deleted Todo!", todos });
});
exports.default = todosRounter;
