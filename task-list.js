Vue.component('task-list', {
  template: `
    <div>
      <task
        v-for="(task, index) in tasks"
        :key="task.id"
        :id="task.id"
        :index="index"
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

    updateTask(taskIndex, attributes) {
      this.tasks.splice(taskIndex, 1, attributes);
    },

    addTask(task) {
      this.tasks.push(task);
    }
  }
});
