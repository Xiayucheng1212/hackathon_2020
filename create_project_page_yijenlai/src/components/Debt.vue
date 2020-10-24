<template>
    <div>
        <div v-for="user in debt_array" :key="user.name">
            <span>{{user.name}}</span>
            <span>{{user.debt}}</span>
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

</style>