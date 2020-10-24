<template>
    
    <div>
        <div class="title"><h1>所有相簿</h1></div>
        <ul>
            <Project v-for="(project,index) in project_list" :key="index" :res='project' :index='index' v-on:projectClicked='handleClick'></Project>
        </ul>
    </div>
</template>

<script>
import Project from '@/components/Project.vue'
export default {
    name:'search',
    components:{
        Project
    },
    data(){
        return{
            project_list: null,
            line_id: 'testtest',
            res: null
        }
    },
    created(){
        // var liffID = '1655093786-Joa47Erb';
        // window.liff.init({
        // liffId: liffID
        // })
        // .then(()=> {
        // console.log('LIFF init');

        // if (!window.liff.isLoggedIn()) {
        //     window.liff.login();
        // }
        // else{
        //     window.liff.getProfile()
        //     .then((profile)=>{
        //     this.line_id = profile.userId;
        //     });
        // }
        // });
        this.getProjects();
    },
    methods: {
        async getProjects(){
            var res =await  this.$http.get("getProjects?lineId="+this.line_id)
            this.project_list = res.data.result[0].projects_list;
            console.log(this.project_list);
        },
        handleClick(index){
            console.log(this.project_list[index]._id);
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

ul{
    padding: 0;
}
.title{  
    padding-top: 10px;
    height: 60px;
    background-color: #6633cc;
}
h1{
    text-align: center;
    font-size: 30px;
    color: rgb(255, 255,255);
    margin: 0;
}
</style>
