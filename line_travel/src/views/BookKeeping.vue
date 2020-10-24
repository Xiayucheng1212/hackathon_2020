<template>
    <div>
        <div v-if="state == 3">//過往的紀錄
            <div class="btn_next" @click="()=>this.state = 4">Debts</div>
            <Record v-for="record in records" :key="record.name" :data="record"></Record>
        </div>
        <div class="btn_next" v-if="state==3" @click="handleClick(0)">+</div>

        <div v-if="state == 4">//所有人的欠債
            <div class="btn_next" @click="()=>this.state = 3">＜</div>
            <Debt :data="records"></Debt>
        </div>

        <div v-if="state == 0">//紀錄
            <h4>帳單金額：</h4>
            <input v-model="amount">
            <h4>輸入品項：</h4>
            <input v-model="item_name">
            <h4>備註：</h4>
            <input v-model="memo">
            <h4>日期：</h4>
            <input type="text" id="text-calendar" class="calendar" name="date"/>
        </div>
        <div class="btn_next" v-if="state==0&&amount!=null" @click="handleClick(1)">Who Paid >></div>
        
        //支付者
        <Payer v-if="state==1" :amount='Number(amount)' :member='member'></Payer>
        <div class="btn_next" v-if="state==1&&checkValid(1)" @click="()=>this.state = 2">Paid For >></div>

        //要付錢的人
        <Paidfor v-if="state==2" :amount='Number(amount)' :member='member'></Paidfor>        
        <div class="btn_next" v-if="state==2&&checkValid(2)" @click="uploadRecord">Save</div>
    </div>
</template>

<script>
import Record from '@/components/Record.vue'
import Debt from '@/components/Debt.vue'
import Paidfor from '@/components/Paidfor.vue'
import Payer from '@/components/Payer.vue'
export default {
    name: "bookkeeping",
    components: {
        Payer,
        Paidfor,
        Record,
        Debt
    },
    data(){
        return{
            state: 3,
            amount: null,
            item_name: null,
            memo: null,
            date: null,
            member: null,
            //要從server取得
            records: [
                {name:"apple",date:"2020-10-23",amount:1000,memo:"hi",user:[{name:'user1',paidAmount:1000,cost:500},{name:'user2',paidAmount:null,cost:500}]},
                {name:"cake",date:"2020-10-24",amount:1000,memo:"hi",user:[{name:'user1',paidAmount:500,cost:1000},{name:'user2',paidAmount:500,cost:null}]}
            ]
        }
    },
    created(){
        this.requestRecords();
    },
    methods: {
        requestRecords(){
            //請求紀錄
            let userinfo = []
            for (var i = 0;i<this.records[0]["user"].length;i++){
                userinfo.push(Object.assign({}, this.records[0]["user"][i]))
            }
            userinfo.forEach(e=>{
                e.paidAmount = null;
                e.cost = null;
                e.state = false;
                e.edited = false;
            })
            this.member = userinfo;
        },
        handleClick(i){
            switch (i){
                case 0:
                    this.state = 0;
                    this.amount = null;
                    this.item_name = null;
                    this.date = null;
                    this.memo = null;
                    window.$( document ).ready(()=>{
                        window.$('.calendar').pignoseCalendar();
                    })
                    break;
                case 1:
                    this.date = document.getElementsByName("date")[0].value;
                    this.state = 1;
                    break;
            } 
        },
        checkValid(state){
            let sum = 0;
            if (state == 1){
                this.member.forEach(e=>{
                sum += e.paidAmount;
                })
            }
            else if (state == 2){
                this.member.forEach(e=>{
                sum += e.cost;
                })
            }
            if (Math.round(sum) == this.amount) return true;
            else return false;
        },
        uploadRecord(){
            this.member.forEach(e=>{
                delete e.edited;
                delete e.state;
            })
            var item = {name:this.item_name, date:this.date, amount:this.amount, memo:this.memo, user:this.member}
            this.records.push(item);
            //上傳到server

            this.state = 3;
        }
    }
}
</script>

<style scoped>
.member_list_wrapper {
    list-style: none;
    padding: 0;
    margin: 0;
    /* 5*5=25 */
    max-height: 23em;
    overflow: auto;
}
.btn_next{
  width: 110px;
  height: 30px;
  border-radius: 10px;
  background-color:  #2fabb7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  cursor: pointer;
}
</style>