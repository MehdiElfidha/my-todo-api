<template>
    <div id="todo-container">
      <h1 id="header">To Do List</h1>
      <input v-model="newTask" @keyup.enter="addTask" placeholder="Enter new task..." id="input-box" />
      <button @click="addTask" id="input-button">Add</button>
  
      <h2>Task List</h2>
      <ul>
        <li v-for="todo in todos" :key="todo.id" :class="{ completed: todo.completed }">
          <input type="checkbox" v-model="todo.completed" @change="updateTask(todo)" />
          <span>{{ todo.text }}</span>
          <button class="edit-btn" @click="editTask(todo)">Edit</button>
          <button class="delete-btn" @click="deleteTask(todo.id)">Delete</button>
        </li>
      </ul>
  
      <p>Completed: {{ completedCount }} | Uncompleted: {{ uncompletedCount }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import axios from 'axios'
  
  const newTask = ref('')
  const todos = ref([])
  
  const fetchTodos = async () => {
    const res = await axios.get('http://localhost:3000/todos')
    todos.value = res.data
  }
  
  const addTask = async () => {
    if (!newTask.value.trim()) return
    const newTodo = {
      id: Date.now(),
      text: newTask.value,
      completed: false
    }
    await axios.post('http://localhost:3000/todos', newTodo)
    newTask.value = ''
    fetchTodos()
  }
  
  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:3000/todos/${id}`)
    fetchTodos()
  }
  
  const updateTask = async (todo) => {
    await axios.put(`http://localhost:3000/todos/${todo.id}`, todo)
    fetchTodos()
  }
  
  const editTask = (todo) => {
    const newText = prompt('Edit Task:', todo.text)
    if (newText !== null) {
      todo.text = newText
      updateTask(todo)
    }
  }
  
  const completedCount = computed(() => todos.value.filter(todo => todo.completed).length)
  const uncompletedCount = computed(() => todos.value.filter(todo => !todo.completed).length)
  
  onMounted(() => {
    fetchTodos()
  })
  </script>
  
  <style>
body { 
  min-height: 100vh;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle, rgba(0,0,0,0.0281) 0%, rgba(253,187,45,1) 100%);
  font-family: Arial, sans-serif;
}

#todo-container {
  background: rgb(41, 33, 33);
  width: 400px;
  border: 2px solid #0033ff;
  padding: 20px;
  color: white;
  border-radius: 15px;
  box-sizing: border-box;
  text-align: center;
  margin-left: 60px;
}

#header {
  margin: 5px;
  font-size: 20px;
  text-align: center;
}

h1 {
  margin-bottom: 20px; 
}

#input-box {
  width: 200px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 5px;
  font-size: 20px;
}

#input-button {
  font-size: 20px;
  cursor: pointer;
  transition: 0.4s;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #2e60ea;
  color: white;
}

#input-button:hover {
  background-color: #9eb7fd; 
}

ul {
  list-style: none;
  padding: 0;
  margin-top: 20px;
  text-align:left;
}

li {
  border: 1px solid white;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px;
  margin-top: 10px;
}

.edit-btn, .delete-btn {
  float: right;
  color:crimson;
  cursor: pointer;
  margin: 3px 5px;
  border: none;
  padding: 3px 5px;
  background: none;
}

.completed {
  text-decoration: line-through;
  color: gray;
  border: 1px solid gray;
}
</style>