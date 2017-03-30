Vue.component('task-list', {
  template: `
    <div>
      <h1 v-show="pastDueTasks.length > 0">Past due tasks</h1>
      <task
        v-for="task in pastDueTasks"
        :key="task.id"
        :id="task.id"
        :description="task.description"
        :completed="task.completed"
        @task-updated="updateTask"
        @task-removed="removeTask">
      </task>
      <h1>Today's tasks</h1>
      <task
        v-for="task in todaysTasks"
        :key="task.id"
        :id="task.id"
        :description="task.description"
        :completed="task.completed"
        @task-updated="updateTask"
        @task-removed="removeTask">
      </task>

      <task-form
        @task-created="addTask">
      </task-form>
    </div>
  `,

  mounted() {
    this.$http.get('http://api.tinylog.dev/items/').then(response => {
      this.tasks = response.body;
    });
  },

  data() {
    return {
      tasks: [],
    };
  },

  computed: {
    todaysTasks() {
      return this.tasks.filter(task => {
        return new Date(task.due_to).setHours(0, 0, 0, 0) ===
               new Date().setHours(0, 0, 0, 0);
      });
    },

    pastDueTasks() {
      return this.tasks.filter(task => {
        return (new Date(task.due_to).setHours(0, 0, 0, 0) <
                new Date().setHours(0, 0, 0, 0) && !task.completed)
      });
    }
  },

  methods: {
    removeTask(newTask) {
      this.tasks = this.tasks.filter(task => {
        return task.id !== newTask.id;
      })
    },

    updateTask(task, attributes) {
      index = this.tasks.map(el => { return el.id; }).indexOf(task.id);
      this.tasks.splice(index, 1, attributes);
    },

    addTask(task) {
      this.tasks.push(task);
    }
  }
});
