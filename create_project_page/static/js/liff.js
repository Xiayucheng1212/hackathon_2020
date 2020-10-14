var liffID = '1655093786-Joa47Erb';
var userName;

$( document ).ready(function() {
  liff.init({
    liffId: liffID
  })
  .then(function() {
    console.log('LIFF init');

    if (!liff.isLoggedIn()) {
      liff.login();
    }
    else{
      liff.getProfile()
      .then(function(profile) {
        userName = profile.displayName
        $('#profile_img').attr('src',profile.pictureUrl)
      });
      $('.invite_wrapper').click(function(){sendFlexMessage(userName)});
    }
  })
  .catch(function(error) {
      console.log(error);
  });
});

function sendFlexMessage(name){
  liff.shareTargetPicker([
    {"type": "flex",
    "altText": "Flex Message",
    "contents": {
      "type": "bubble",
      "hero": {
        "type": "image",
        "url": $('.image_container img').attr('src'),
        "size": "full",
        "aspectRatio": "20:13",
        "aspectMode": "cover",
        "action": {
          "type": "uri",
          "uri": "https://liff.line.me/1655093786-Joa47Erb"
        }
      },
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": $('input[name="project_name"]').val(),
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
                    "text": name,
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
                    "text": $('.calendar').val(),
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
              "uri": "https://liff.line.me/1655093786-Joa47Erb"
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
  }
  ])
    .then(
      alert("ShareTargetPicker was launched")
    ).catch(function(error) {
      alert(error)
    })
  };