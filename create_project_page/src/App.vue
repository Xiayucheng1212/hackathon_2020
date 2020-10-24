<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Hello</router-link>
      <router-link to="/about">About</router-link>
      <input
        type="file"
        name="main"
        id="main"
        value
        accept="image/png, image/jpeg, image/gif, image/jpg"
        @change="transtoBase64($event)"
      />
      <img :src="imgsrc" />

      <el-upload
        class="upload-demo"
        ref="upload"
        action="https://hereisanewapp.herokuapp.com"
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
        @click="transtoBase64"
      >上传到服务器</el-button>
    </div> -->
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: new FormData(),
      fileList: [],
      tagNameList: ["圖片一", "圖片二", "圖片三"],
      imgsrc: ""
    };
  },
  created() {
    // this.trans()S;
    // this.getProjects();
    this.getAlbum();
  },
  methods: {
    trans() {
      this.$router.push("/");
    },
    update() {
      console.log(1111);
    },
    async getProjects() {
      var result = await this.$http.get("getProjects", {
        params: {
          lineId: "testtest"
        }
      });

      console.log(result);
    },
    async uploadImages() {
      const file = this.$refs.upload.uploadFiles;
      console.log(file);
    },
    async transtoBase64() {
      const files = this.$refs.upload.uploadFiles;
      console.log(files);

      var reader = new FileReader();
      // var params = {
      //   img0: "",
      //   // 圖片1: "",
      //   // 圖片2: ""
      // };

      reader.readAsDataURL(files[0].raw);
      var imgsrc0 = "";
      var imgsrc1 = "";
      var params = {};
      reader.onload = async e => {
        imgsrc0 = e.target.result;
        console.log("000000" + imgsrc0);

        reader.readAsDataURL(files[1].raw);
        reader.onload = async e => {
          imgsrc1 = e.target.result;
          console.log("111111" + imgsrc1);
          params = this.$qs.stringify({
            
              img0: imgsrc0,
              img1: imgsrc1,
            
            place: "早餐店",
            project_id: "5f8f10f3b70e39b62c939255"
          });
          var res = await this.$http.post("testForCreateAlbum", params, {
            // 设置请求头
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            }
          });
          if (res) {
            console.log(res);
            console.log("成功接收");
          }
        };
      };

      // setTimeout(() => {
      //   reader.readAsDataURL(files[1].raw);
      //   reader.onload = async e => {
      //     imgsrc1 = e.target.result;
      //     console.log("111111" + e.target.result);
      //     params.img1 = imgsrc1;
      //     params = this.$qs.stringify(params);
      //   };
      // }, 0.1);

      // setTimeout(() => {
      //   setTimeout(() => {
      //     reader.readAsDataURL(files[2].raw);
      //     reader.onload = async e => {
      //       imgsrc2 = e.target.result;
      //       console.log("2222222" + e.target.result);
      //       params.img2 = imgsrc2;
      //       params = this.$qs.stringify(params);

      //     };
      //   }, 0.1);
      // }, 0.1);

      // !!!!!

      // reader.onload = async e => {
      //   this.imgsrc = e.target.result;
      //   console.log(e.target.result);
      //   //提交到后台相关略

      //   // var params = this.$qs.stringify({
      //   //     img: this.imgsrc,

      //   //  });

      //   // console.log(params);

      //   // var res = await this.$http.post("uploadBase64", params, {
      //   //   // 设置请求头
      //   //   headers: {
      //   //     "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      //   //   }
      //   // });
      //   // if (res) {
      //   //   console.log(res);
      //   //   console.log("成功接收");
      //   // }
      // };
    },
    async getAlbum(){
      var res = await this.$http.get('getAlbum?place=早餐店')
      console.log(res);
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
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
