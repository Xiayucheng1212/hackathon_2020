<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Hello</router-link>
      <router-link to="/about">About</router-link>
      <el-upload
        class="upload-demo"
        ref="upload"
        action="http://localhost:3000/getImages"
        :limit="9"
        list-type="picture-card"
        :auto-upload="false"
      >
        <i slot="default" class="el-icon-plus" @click="update"></i>
        <div slot="file" slot-scope="{file}">
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
        </div>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <el-button
          style="margin-left: 10px;"
          size="small"
          type="success"
          @click="uploadImages"
        >上传到服务器</el-button>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: new FormData(),
      fileList:[],
      tagNameList: ["圖片一", "圖片二","圖片三"]
    };
  },
  created() {
    // this.trans();
  },
  methods: {
    trans() {
      this.$router.push("/");
    },
    update(){
      console.log(1111);
      
    },
    async uploadImages() {
      const file = this.$refs.upload.uploadFiles;
      console.log(file);
      for (let i = 0; i < this.$refs.upload.uploadFiles.length; i++) {
        this.formData.append("photo" + i, file[i].raw);
      }
      // this.formData.append("images[]", this.$refs.files.files[0], "圖片一");
      // this.formData.append("images", this.$refs.files.files[0], "圖片二");
      this.formData.append("place", "丹丹早餐店")
      this.formData.append("project_id", "5f8dc0554cedb7a3e8380970");
      var res = await this.$http.post("updateAlbum", this.formData, {
        headers: {
          "Content-Type": "multipart/form-data" //更改成 FormData 的格式
        }
      });
      if (res) {
        console.log(this.formData);
        console.log("成功接收");
      }
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
