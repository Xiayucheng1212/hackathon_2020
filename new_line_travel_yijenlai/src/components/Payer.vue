<template>
  <div class="project">
    <div id="nav">
      <span>Who paid?</span>
      <span><i>${{amount}}</i></span>
    </div>
    <ul class="member_list_wrapper" id="member_list_wrapper">
      <Member v-for="(mem,index) in member" :key=mem.name :index=index :name=mem.name :state=mem.state :paidAmount=mem.paidAmount v-on:checkbox="handleCheckboxChanged" v-on:amountEdited="updateAmount"></Member>
    </ul>
  </div>
</template>

<script>
import Member from '@/components/Member.vue'
export default {
  name: "payer",
  components: {
    Member
  },
  props: {
    amount: Number,
    member: Array
  },
  methods: {
    handleCheckboxChanged(index){
      // console.log('handleCheckboxChanged')
      this.member[index].state = !this.member[index].state;
      if (!this.member[index].state) {
        this.member[index].edited = false;
        this.member[index].paidAmount = null;
      } 
      this.calculateAmount();
    },
    calculateAmount(){
      var sum = 0;
      this.member.filter(e=>e.edited).forEach(ele=>{
        sum += ele.paidAmount
      })
      var memberPaid = this.member.filter(e=>e.state&&!e.edited)
      this.member.forEach(e=>{
        if (e.state&&!e.edited){
          var per_amount = (this.amount-sum)/memberPaid.length;
          e.paidAmount = Number(per_amount.toFixed(2));
        }
        else if (!e.state) e.paidAmount = null;
      })
    },
    updateAmount(data){
      // console.log('updateAmount')
      // console.log(data[1])
      if (Number(data[1]) != 0){
        this.member[data[0]].edited = true
        this.member[data[0]].paidAmount = Number(data[1])
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

a {
  font-weight: bold;
  color: #2c3e50;
}

a.router-link-exact-active {
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
</style>