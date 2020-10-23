<template>
  <div class="project">
    <div id="nav">
      <span>For who?</span>
      <span><i>${{amount}}</i></span>
    </div>
    <ul class="member_list_wrapper" id="member_list_wrapper">
      <MemberCost v-for="(mem,index) in member" :key=mem.name :index=index :name=mem.name :state=mem.state :cost=mem.cost v-on:checkbox="handleCheckboxChanged" v-on:amountEdited="updateAmount"></MemberCost>
    </ul>
  </div>
</template>

<script>
import MemberCost from '@/components/MemberCost.vue'
export default {
  name: "paidfor",
  components: {
    MemberCost
  },
  props: {
      amount: Number,
      member: Array
  },
  created(){
    this.member.forEach(e=>{
      e.edited = false;
      e.state = false;
    })
  },
  methods: {
    handleCheckboxChanged(index){
      // console.log('handleCheckboxChanged')
      this.member[index].state = !this.member[index].state;
      if (!this.member[index].state) {
        this.member[index].edited = false;
        this.member[index].cost = null;
      } 
      this.calculateAmount();
    },
    calculateAmount(){
      var sum = 0;
      this.member.filter(e=>e.edited).forEach(ele=>{
        sum += ele.cost
      })
      var memberCost = this.member.filter(e=>e.state&&!e.edited)
      this.member.forEach(e=>{
        if (e.state&&!e.edited){
          var per_amount = (this.amount-sum)/memberCost.length;
          e.cost = Number(per_amount.toFixed(2));
        }
        else if (!e.state) e.cost = null;
      })
    },
    updateAmount(data){
      // console.log('updateAmount')
      // console.log(data[1])
      if (Number(data[1]) != 0){
        this.member[data[0]].edited = true
        this.member[data[0]].cost = Number(data[1])
      }
      this.calculateAmount();
    }
  }
}
</script>

<style scoped>
#nav {
  padding: 10px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.member_list_wrapper {
    list-style: none;
    padding: 0;
    margin: 0;
    /* 5*5=25 */
    max-height: 23em;
    overflow: auto;
}
#btn_next{
  width: 110px;
  height: 30px;
  border-radius: 10px;
  background-color: #42b983;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  font-weight: bold;
  color: #2c3e50;
}
#btn_next:hover{
  cursor: pointer;
}
</style>