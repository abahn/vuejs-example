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
        .post('http://api.tinylog.dev/items', { description: this.description })
        .then(response => {
          this.$emit('task-created', response.body);
          this.description = '';
        });
    }
  }
});
