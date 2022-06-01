<template>
  <div>
    <div id="list" v-show="show">
      <div class="mb-2 d-flex">
        <div>
          <input
            type="checkbox"
            :checked="todo.checked"
            @change="toggleCheckbox"
            element-test="doneCheckBox"
          />
        </div>
        <span
          class="ml-3 flex-grow-1"
          :class="todo.checked ? 'text-muted' : ''"
          :style="todo.checked ? 'text-decoration: line-through' : ''"
          >{{ todo.text }}</span
        >
        <button
          class="btn btn-danger btn-sm"
          @click="clickDelete"
          element-test="delteBtn"
        >
          삭제
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: Boolean,
    };
  },
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  methods: {
    toggleCheckbox(e) {
      //$emit 부모 컴포넌트로 보냄
      this.$emit("toggle-Checkbox", {
        id: this.todo.id,
        checked: e.target.checked,
      });
      this.show = !e.target.checked;
    },
    clickDelete() {
      this.$emit("click-delete", this.todo.id);
    },
  },
};
</script>

<style scoped>
#list {
  margin: 0 auto;
  width: 50%;
  text-align: left;
}
</style>
