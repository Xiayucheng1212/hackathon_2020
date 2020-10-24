<template>
    <div>
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