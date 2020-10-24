<template>
    <div>
        <div v-for="user in debt_array" :key="user.name">
            <h6 class="user">{{user.name}}</h6>
            <h6 class="debt">$ {{user.debt}}</h6>
        </div>
    </div>
</template>

<script>
export default {
    name: "debt",
    props: {
        data: Array
    },
    data(){
        return{
            debt_array: []
        }
    },
    created(){
        for (let i = 0;i<this.data[0]["user"].length;i++){
            let sum = 0;
            for (let j=0;j<this.data.length;j++){
                sum += this.data[j].user[i].paidAmount;
                sum -= this.data[j].user[i].cost;
            }
            this.debt_array.push({name:this.data[0].user[i].name,debt:sum})
        }
    }
}
</script>

<style scoped>
h6{
    font-size: 15px;
    margin-top: 10px;
    margin-bottom: 10px;
}
.user{
    /* margin-top: 10px; */
    background-color: #E6E6FA;
    text-align: left;
    padding-left: 10%;
}
.debt{
    /* margin-top: 10px; */
}
</style>