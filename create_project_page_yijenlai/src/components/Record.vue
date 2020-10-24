<template>
    <div>
        <div class="row" @click="()=>this.popup = !this.popup">
            <span>{{data.itemName}}</span>
            <span>${{data.amount}}</span>
        </div>
        <div class="detail" v-if="popup==true">
            <div class="banner">Who Paid?</div>
            <div v-for="user in userWhoPaid()" :key="user.name">
                <span>{{user.name}}</span>
                <span>${{user.paidAmount}}</span>
            </div>
            <div class="banner">For Who?</div>
            <div v-for="user in userWhoCost()" :key="user.name">
                <span>{{user.name}}</span>
                <span>${{user.cost}}</span>
            </div>
            <div class="banner">Memo</div>
            <div>{{data.memo}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name:"record",
    props:{
        data: Object
    },
    data(){
        return{
            popup:false,
            // itemName:this.data["itemName"],
            // date:this.data["date"],
            // amount:this.data["amount"],
            // memo:this.data["memo"],
            // user:this.data["user"]
        }
    },
    methods:{
        userWhoPaid(){
            let user_paid = [];
            user_paid = this.data.user.filter(e=>e.paidAmount!=null)
            return user_paid
        },
        userWhoCost(){
            let user_cost = [];
            user_cost = this.data.user.filter(e=>e.cost!=null)
            return user_cost
        }
    }
}
</script>

<style scoped>
.row{
    cursor: pointer;
}
.banner{
    background-color: rgba(00, 00, 00, 0.3);
}
.detail{
    border: 1px solid #555555;
    border-radius: 10px;
    overflow: hidden;
}
</style>