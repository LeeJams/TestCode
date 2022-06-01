import { mount, shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";

describe("ToDoList Test", () => {
  const wrapper = mount(HelloWorld);

  it("delteBtn element 존재 테스트", async () => {
    const delteBtn = wrapper.findAll('[element-test="delteBtn"]').at(0);
    expect(delteBtn.exists()).toBe(true);
  });

  it("todo 삭제 테스트", async () => {
    const delteBtn = wrapper.findAll('[element-test="delteBtn"]').at(0);
    await delteBtn.trigger("click");
    expect(wrapper.vm.$data.todos.length).toBe(0);
  });

  it("input element 존재 테스트", () => {
    const todoInput = wrapper.find('[element-test="todoInput"]');
    expect(todoInput.exists()).toBe(true);
  });
  
  it("todo 등록 테스트", async () => {
    const todoInput = wrapper.find('[element-test="todoInput"]');
    wrapper.vm.$data.todoText = "todo 등록 테스트";
    await todoInput.trigger("keyup.enter");
    expect(wrapper.vm.$data.todos.length).toBe(1);
  });

  it("doneCheckBox element 존재 테스트", () => {
    const doneCheckBox = wrapper.find('[element-test="doneCheckBox"]');
    expect(doneCheckBox.exists()).toBe(true);
  });

  it("todo 완료 테스트", async () => {
    const doneCheckBox = wrapper.find('[element-test="doneCheckBox"]');
    await doneCheckBox.trigger("change");
    expect(wrapper.vm.$data.dones.length).toBe(1);
  });
});
