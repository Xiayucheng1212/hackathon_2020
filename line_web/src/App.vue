<template>
  <div id="app">
    <form>
      <input type="file" ref="files" @change="submitForm" />
      <button type="submit" class="btn btn-primary" @click="uploadImages">Submit</button>
    </form>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  components: {
    HelloWorld
  },
  data() {
    return {
      res: "",
      fileList: [],
      src: ""
    };
  },
  created() {
    this.getdata();
     $('.calendar').pignoseCalendar({multiple:true,buttons:true});
  },
  methods: {
    async getdata() {
      this.res = await this.$http.get("test");
      console.log(this.res);
    },
    async uploadImages() {
      const params = new FormData();
      params.append("images", this.$refs.files.files[0]);
      var res = await this.$http.post("getImages",params, {
        headers: {
          "Content-Type": "multipart/form-data" //更改成 FormData 的格式
        }
      });
      if(res){
        console.log("成功接收");
        
      }

    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
