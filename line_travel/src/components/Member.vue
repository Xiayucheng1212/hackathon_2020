<template>
  <li class="todo-app__item">
    <div class="todo-app__checkbox">
      <input type="checkbox" :id="name" v-model="checkboxState">
      <label :for="name"></label>
    </div>
    <h3 class="todo-app__item-detail">{{name}}</h3>
    <input type="text" ref="inputAmount" v-show="state" :value="paidAmount" @keyup="emitAmount">
    <i class="fas fa-pen" @click="editAmount" v-show="state"></i>
  </li>
</template>

<script>
export default {
  name: 'Member',
  props: {
    index: Number,
    name: String,
    state: Boolean,
    paidAmount: Number
  },
  data(){
    return{
      checkboxState: this.state
    }
  },
  watch: {
    checkboxState(){
      // console.log('checkboxState')
      this.$emit('checkbox',this.index)
    }
  },
  methods: {
    editAmount(){
      // console.log('editAmount')
      this.$refs.inputAmount.focus();
    },
    emitAmount(){
      this.$emit('amountEdited',[this.index,this.$refs.inputAmount.value])
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.todo-app__item {
    position: relative;
    width: 98%;
    /* min-height: 5em; */
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.089);
    border-top: 0;
}
.todo-app__checkbox {
    width: 20px;
    height: 20px;
    background: #ddd;
    margin: 10px;
    border-radius: 100%;
    position: relative;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.312);
}
.todo-app__checkbox label {
    width: 14px;
    height: 14px;
    border-radius: 100px;

    transition: all 0.5s ease;
    cursor: pointer;
    position: absolute;
    top: 3px;
    left: 3px;
    z-index: 1;

    background: rgba(99, 99, 99, 0.698);
    box-shadow: inset 0px 1px 3px rgba(0, 0, 0, 0.312);
}

.todo-app__checkbox input[type='checkbox']:checked + label {
    background: #26ca299b;
}

.todo-app__item-detail {
    font-weight: 300;
    overflow-wrap: break-word;
    transition: opacity 0.3s;
    height: 100%;
}
input[type='checkbox'] {
    visibility: hidden;
}
input[type='text']{
  border: none;
  right: 20px;
}
i{
  right: 20px;
}
</style>
