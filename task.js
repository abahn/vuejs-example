Vue.component('task', {
  template: `
    <div class="panel" :class="stateClass">
      <div class="panel-heading"></div>
      <div class="panel-body">
        {{ description }}
        <div class="pull-right">
          <a @click="toggleCompleted">
            <i class="fa fa-check"></i>
          </a>
          <a @click="remove">
            <i class="fa fa-times"></i>
          </a>
        </div>
      </div>
    </div>
  `,

  props: ['id', 'index', 'description', 'completed'],

  computed: {
    stateClass() {
      return this.completed
        ? 'panel-success'
        : 'panel-default'
    }
  },

  methods: {
    remove() {
      this
        .$http
        .delete(`${Utils.apiHost}${this.id}`)
        .then(response => {
          this.$emit('task-removed', this);
        });
    },

    update(attributes = this) {
      this
        .$http
        .put(`${Utils.apiHost}${this.id}`, attributes)
        .then(response => {
          this.$emit('task-updated', this, response.body);
        });
    },

    toggleCompleted() {
      this.update({ completed: !this.completed });
    }
  }
});
