Vue.component('task-list', {
  template: `
    <div>
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

  data() {
    return {
      tasks: {},
    };
  },

  mounted() {
    this.$http.get('http://api.tinylog.dev/items/').then(response => {
      this.tasks = response.body;
    });
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
