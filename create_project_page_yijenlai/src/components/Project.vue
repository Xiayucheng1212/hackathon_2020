<template>
    <div @click="handleClick" class="album">
        <div class="name"><h4>{{res.projectName}}</h4></div>
        <h4>地點：{{res.place}}</h4>
        <h4>時間：{{res.createTime}}</h4>
    </div>
</template>

<script>
export default {
    name: 'project',
    props:{
        res:Object,
        index:Number
    },
    methods:{
        handleClick(){
            this.$emit('projectClicked',this.index)
        }
    }
}
</script>

<style scoped>
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
.album{
    margin-left: 5px;
    margin-right: 5px;
    margin-top: 5px;
    border-style: groove;
    /* padding: 5px; */
    border-width: 2px;
    border-color: #B399FF;
    border-radius: 14px;
}
.name{
    background-color: #B399FF;
    border-radius: 10px;

}
h4{
    /* margin-top: 5px; */
    margin-bottom: 5px;
    font-size: 20px;
    padding-left: 10px;
    padding-top: 3px;
    padding-bottom: 3px;
}
</style>