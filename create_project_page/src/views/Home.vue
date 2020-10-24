<template>
  <div class="home">
    <div class="image_container">
      <img id="cover" src="https://tnimage.s3.hicloud.net.tw/photos/2019/10/07/1570443526-5d9b1106c7c9c.jpg"/>
    </div>
    <div class="container">
      <form method="POST" id="form_project">
        <p>旅程名稱</p>
        <input name="project_name" v-model="project_name">
        <p>地點</p>
        <select name="place" v-model="place">
          <option value="Keelung">基隆</option>
          <option value="NewTaipei">新北</option>
          <option value="Taipei">臺北</option>
          <option value="Yilan">宜蘭</option>
          <option value="Taoyuan">桃園</option>
          <option value="Hsinchu">新竹</option>
          <option value="Miaoli">苗栗</option>
          <option value="Taichung">臺中</option>
          <option value="Changhua">彰化</option>
          <option value="Nantou">南投</option>
          <option value="Yunlin">雲林</option>
          <option value="Chiayi">嘉義</option>
          <option value="Tainan">臺南</option>
          <option value="Kaohsiung">高雄</option>
          <option value="Pingtung">屏東</option>
          <option value="Taitung">臺東</option>
          <option value="Hualien">花蓮</option>
          <option value="Penghu">澎湖</option>
          <option value="Kinmen">金門</option>
          <option value="Lienchiang">連江</option>
        </select>
        <p>日期</p>
        <input type="text" id="text-calendar" class="calendar" name="date" />
      </form>
      <p>成員</p>
      <div class="member_group">
        <img class="circle_wrapper" id="profile_img" :src=UserImg>
        <div class="circle_wrapper invite_wrapper" @click="shareTarget">
            <i class="fas fa-share fa-2x"></i>
        </div>
      </div>
      <input type="submit" value="創建" form="form_project" @click="uploadData">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
    // HelloWorld
  },
  data(){
    return {
      UserImg: '../assets/logo.png',
      UserName: '',
      project_name: null,
      place: null,
    }
  },
  beforeCreate(){
    window.$( document ).ready(()=>{
      console.log('aaaaaaaaaa')
      window.$('.calendar').pignoseCalendar({multiple: true,buttons:true});
    })
    var liffID = '1655093786-Joa47Erb';
    window.liff.init({
    liffId: liffID
    })
    .then(()=> {
      console.log('LIFF init');

      if (!window.liff.isLoggedIn()) {
        window.liff.login();
      }
      else{
        window.liff.getProfile()
        .then((profile)=>{
          this.UserName = profile.displayName;
          this.UserImg = profile.pictureUrl;
        });
      }
    });
  },
  methods:{
    uploadData(){//上傳到server

    },
    shareTarget(){
      console.log(document.getElementsByName("project_name")[0].value);
      window.liff.shareTargetPicker([
    {"type": "flex",
    "altText": "Flex Message",
    "contents":{
      "type": "bubble",
      "hero": {
        "type": "image",
        "url": document.getElementById("cover").src,
        "size": "full",
        "aspectRatio": "20:13",
        "aspectMode": "cover",
        "action": {
          "type": "uri",
          "uri": "https://liff.line.me/1655093786-Joa47Erb/project"
        }
      },
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": document.getElementsByName("project_name")[0].value,
            "weight": "bold",
            "size": "xl"
          },
          {
            "type": "box",
            "layout": "vertical",
            "margin": "lg",
            "spacing": "sm",
            "contents": [
              {
                "type": "box",
                "layout": "baseline",
                "contents": [
                  {
                    "type": "text",
                    "text": "邀請人",
                    "color": "#aaaaaa",
                    "size": "sm",
                    "flex": 2
                  },
                  {
                    "type": "text",
                    "text": this.UserName,
                    "wrap": true,
                    "color": "#666666",
                    "size": "sm",
                    "flex": 5
                  }
                ]
              },
              {
                "type": "box",
                "layout": "baseline",
                "contents": [
                  {
                    "type": "text",
                    "text": "Time",
                    "color": "#aaaaaa",
                    "size": "sm",
                    "flex": 2
                  },
                  {
                    "type": "text",
                    "text": document.getElementsByName("date")[0].value,
                    "wrap": true,
                    "color": "#666666",
                    "size": "sm",
                    "flex": 5
                  }
                ]
              }
            ]
          }
        ]
      },
      "footer": {
        "type": "box",
        "layout": "vertical",
        "spacing": "sm",
        "contents": [
          {
            "type": "button",
            "style": "link",
            "height": "sm",
            "action": {
              "type": "uri",
              "label": "加入",
              "uri": "https://liff.line.me/1655093786-Joa47Erb/project"
            }
          },
          {
            "type": "spacer",
            "size": "sm"
          }
        ],
        "flex": 0
      }
    }
    }]);
    }
  }
}
</script>

<style scoped>
.home{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.container{
    width: 80vw;
}
p{
    font-size: 5vw;
    margin: 2vw 0;
}
input,select{
    font-size: 5vw;
    width: 80vw;
}
input[type='submit']{
    width: 20vw;
    margin-top: 2vw;
}
.image_container{
    width: 100vw;
}
#cover{
    width: 100vw;
    height: 60vw;
}
.circle_wrapper{
    border-radius: 50%;
    width: 16vw;
    height: 16vw;
    margin-right: 1.5em;
}
.invite_wrapper{
    background-color: #2fabb7;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3vw;
}
.invite_wrapper:hover{
    cursor: pointer;
    background-color: #49c4d0;
}
.member_group{
    display: flex;
    flex-direction: row;
    align-items: center;
}
#profile_img{
    border: black 1px solid;
}
</style>
