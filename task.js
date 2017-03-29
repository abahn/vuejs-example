Vue.component('task', {
  template: `
    <div class="panel panel-default">
      <div class="panel-body">
        {{ description }}
        <button
          class="close"
          @click="remove">
          &times;
        </button>
      </div>
    </div>
  `,

  props: ['id', 'description'],

  methods: {
    remove() {
      this
        .$http
        .delete(`http://api.tinylog.dev/items/${this.id}`)
        .then(response => {
          this.$emit('task-removed', this);
        });
    },
  }
});
