<template>
  <div id="app" v-loading="loading"
    element-loading-text="創建相簿中..."
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <div id="top_bar">建立相簿</div>
    <div id="album_name">相簿名稱:</div>
    <input id="locate_name_disabled" placeholder="請輸入相簿名稱" v-model="place">
    <div id="add_new_photo">新增照片:</div>
    <hr id="hr1">
    <div id="album" :upload="'123'">
      <el-upload
        class="upload-demo"
        ref="upload"
        action="https://hereisanewapp.herokuapp.com/testForCreateAlbum"
        list-type="picture-card"
        :auto-upload="false"
        :file-list="fileList">
        <i slot="default" class="el-icon-plus"></i>
        <div id="imgs" slot="file" slot-scope="{file}">
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
        </div>
      </el-upload>
    </div>
    <hr id="hr2">
    <button id="bottom" @click="transtoBase64">建立</button>
  </div>
</template>

<script>
export default {
  name: 'Create',
  data(){
    return{
      formData: new FormData(),
      fileList:[],
      tagNameList: [],
      project_id: '5f94019792bf49001740ff1c',
      place: '',
      position:{
        lat: "24.82",
        lng: "120.88"
      },
      loading: false,
    }
  },
  methods:{
    async transtoBase64() {
      this.loading = true
      const files = this.$refs.upload.uploadFiles;
      if(files.length !=2){
        console.log(files);
        this.$message.error('請至少選擇一張圖片');
      }

      var reader = new FileReader();
      reader.readAsDataURL(files[0].raw);
      var imgsrc0 = "";
      var imgsrc1 = "";
      var params = {};
      reader.onload = async e => {
        imgsrc0 = e.target.result;
        console.log(imgsrc0);

        reader.readAsDataURL(files[1].raw);
        reader.onload = async e => {
          imgsrc1 = e.target.result;
          console.log(imgsrc1);
          params = this.$qs.stringify({
            img0: imgsrc0,
            img1: imgsrc1,
            lat: this.position.lat,
            lng: this.position.lng,
            place: this.place,
            project_id: this.project_id
          });
          var res = await this.$http.post("testForCreateAlbum", params, {
            // 设置请求头
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            }
          });
          this.loading = false
          if (res) {
            console.log(res);
            console.log("成功接收");
            this.$message({
              message: '成功創建相簿!',
              type: 'success'
            });
          }
          else{
            this.$message.error('創建失敗...');
          }
        };
      };
    },
    handleAvatarSuccess(res, file){
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file){
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) this.$message.error('上传头像图片只能是 JPG 格式!')
      if (!isLt2M) this.$message.error('上传头像图片大小不能超过 2MB!')
      return isJPG && isLt2M;
    },
  }
}
</script>

<style>
#app{
  font-family: 'Microsoft YaHei','Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  text-align: center;
  height: 812px;
}
#top_bar{
  padding: 5%;
  font-size: 30px;
  color: white;
  background-color: #6633cc;
}
#album_name{
  margin-top: 6%;
  margin-bottom: 3%;
  background-color: #E6E6FA;
}
#locate_name_disabled{
  margin-top: 15px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom-color: #c0c0c0;
  font-size: 25px;
  text-align: center;
  width: 80%;
}
#add_new_photo{
  margin-top: 7%;
  margin-bottom: 6%;
  background-color: #E6E6FA;
}
#album{
  height: 430px;
  margin-top: -6px;
  margin-bottom: -5px;
  padding: 15px;
  overflow: scroll;
  box-shadow: 0px 0px 5px inset;
}
i{
  width: 100px;
  height: 100px;
}
#bottom{
  margin-top: 1.9%;
  width: 75%;
  height: 50px;
  font-size: 23px;
  color: white;
  background-color: #6633cc;
  border: none;
}
</style>