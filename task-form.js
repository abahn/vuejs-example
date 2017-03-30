Vue.component('task-form', {
  template: `
  <input
    type="text"
    class="form-control"
    placeholder="Add task"
    v-model="description"
    @keyup.enter="createTask">
  `,

  data() {
    return {
      description: ''
    };
  },

  methods: {
    createTask() {
      this
        .$http
        .post(Utils.apiHost, {
          item: {
            description: this.description,
            due_to: Utils.dateToString(),
            completed: false
          }
        })
        .then(response => {
          this.$emit('task-created', response.body);
          this.description = '';
        });
    }
  }
});
