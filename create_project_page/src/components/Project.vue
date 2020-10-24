<template>
    <div @click="handleClick">
        <div>{{res.projectName}}</div>
        <span>{{res.place}}</span>
        <span>{{res.createTime}}</span>
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