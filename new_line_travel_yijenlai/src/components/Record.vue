<template>
    <div>
        <table @click="()=>this.popup = !this.popup ">
            <tr>
                <td rowspan="2" valign="top">
                    <div class="box row" >
                        <h5>{{itemName}}</h5>
                        <h5>${{amount}}</h5>
                    </div>
                </td>
                <td>
                    <div v-if="popup==false">
                        <h6 valign="bottom">--------點擊以查看詳細記錄--------</h6>
                    </div>
                    <div v-if="popup==true">
                        <div class="banner" >誰付的?</div>
                        <div v-for="user in userWhoPaid()" :key="user.name">
                            <h6>{{user.name}} : ${{user.paidAmount}}</h6>
                        </div>
                        <div class="banner">為誰?</div>
                        <div v-for="user in userWhoCost()" :key="user.name">
                            <h6>{{user.name}} : ${{user.cost}}</h6>
                        </div>
                        <div class="banner">備註：</div>
                            <h6>{{memo}}</h6>
                    </div>
                    
                </td>
            </tr>
            
        </table>
        
        
        
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
            itemName:this.data["name"],
            date:this.data["date"],
            amount:this.data["amount"],
            memo:this.data["memo"],
            user:this.data["user"]
        }
    },

    methods:{
        userWhoPaid(){
            let user_paid = [];
            user_paid = this.user.filter(e=>e.paidAmount!=null)
            return user_paid
        },
        userWhoCost(){
            let user_cost = [];
            user_cost = this.user.filter(e=>e.cost!=null)
            return user_cost
        },
        
    }
}
</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-align: center;
}
.row{
    cursor: pointer;
}
.banner{
    font-size: 10px;
    font-weight: bold;
    background-color:#E6E6FA;
    text-align:left;
    margin-top: 7px;
    padding-left: 5px;
}
.box{
    
    background-color:  #E6E6FA;
    /* margin-right: 0%; */
    width: 100%;
    border-radius: 10px;
    margin-bottom: 5px;
    margin-top: 5px;
    
    
}
table{
    margin-top: 10px;
    margin-left: 0%;
    text-align:center;
}
td{
    width:20%;
}
/* hr{
    color: #E6E6FA;
    margin-left: 40%;
    width: 50%;
} */
</style>