Vue.component('task-list', {
  template: `
    <div>
      <task
        v-for="task in tasks"
        :id="task.id"
        :description="task.description"
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

    addTask(task) {
      this.tasks.push(task);
    }
  }
});
