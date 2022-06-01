<template>
  <div class="home">
    <div>
      <h3>To-Do-List</h3>
      <hr />
      <!-- <AddToDo /> -->
      <input
        type="text"
        class="w-50"
        placeholder="할 일을 입력해주세요."
        @keyup.enter="addToDo"
        v-model="todoText"
        element-test="todoInput"
      />
      <hr />
      <h6>오늘 할 일</h6>
      <ToDoList
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @toggle-Checkbox="toggleCheckbox"
        @click-delete="deleteToDo"
      />
    </div>
    <hr />
    <div>
      <h6>완료 목료</h6>
      <p v-for="done in dones" :key="done.id">
        {{ done.text }} <span>{{ done.date }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import ToDoList from "@/components/ToDoList";
export default {
  components: {
    ToDoList,
  },
  data() {
    return {
      todos: [
        { id: 1, text: "buy a car", checked: false, date: "2020/9/15" },
        // { id: 2, text: "play the game", checked: false, date: "2020/9/15" },
      ],
      dones: [],
      todoText: "",
    };
  },
  methods: {
    addToDo(e) {
      var date = new Date();
      this.todos.push({
        id: this.todos.length + 1,
        text: e.target.value,
        checked: false,
        date:
          date.getFullYear() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getDate(),
      });
      this.todoText = "";
    },
    toggleCheckbox({ id, checked }) {
      console.log(id, checked);
      const index = this.todos.findIndex((todo) => {
        return todo.id == id;
      });
      this.todos[index].checked = checked;
      this.dones.push({
        id: id,
        text: this.todos[index].text,
        date: this.todos[index].date,
      });
      this.todos = this.todos.filter((todo) => todo.id != id);
    },
    deleteToDo(id) {
      this.todos = this.todos.filter((todo) => todo.id != id);
    },
  },
};
</script>
