from flask import Flask, request, abort
from linebot import (LineBotApi, WebhookHandler)
from linebot.exceptions import (InvalidSignatureError)
from linebot.models import *
from pymongo import MongoClient
import json
      
app = Flask(__name__)


# Channel Access Token
line_bot_api = LineBotApi('+dzVx/wnC4DICye4J+KaJp2GTl0/8YSkLarqhRNG46FNEBdho7aelYQ04wk1E0DWVscjQUxnvQadvD1znf8iCUvHVh75bB3zX0dSewi+AlreTSxZYyFNbevowwTbJoCjS3toDXWHdpUzXoWLyZDv6gdB04t89/1O/w1cDnyilFU=')
# Channel Secret
handler = WebhookHandler('2e47083a9a8118cb7cdac58b2209b40b')


# 監聽所有來自 /callback 的 Post Request
@app.route("/callback", methods=['POST'])
def callback():
    # get X-Line-Signature header value
    signature = request.headers['X-Line-Signature']
    # get request body as text
    body = request.get_data(as_text=True)
    app.logger.info("Request body: " + body)
    # handle webhook body
    try:
        handler.handle(body, signature)
    except InvalidSignatureError:
        abort(400)
    return 'OK'

# 處理訊息
@handler.add(MessageEvent, message=TextMessage)
def handle_message(event):
    Text = TextSendMessage(text=event.message.text)
     
    # --init declaration--#
    hugeList = []
    s='https://liff.line.me/1655093786-Joa47Erb/map?projectId=xxx&place=xxx'
    ss =''
    Send = []
    k = 0
    # --------------------#
    client = MongoClient('8.210.63.210',27017)
    db = client.lineWeb
    coll = db.projects
    for x in coll.find():
        hugeList.append(x['place']+"+"+x['projectName']+"+"+str(x['_id']))

    # line_bot_api.reply_message(event.reply_token, TextSendMessage(text="以下為搜尋結果！"))
    Send.append("以下為搜尋結果！")
    for i in range(len(hugeList)):  
        loc = hugeList[i].split("+")[0]
        if Text.text == loc:
            for j in range(len(s)):
                if s[j] == '=':
                    ss += '='+hugeList[i].split("+")[2]
                    k =  1
                elif s[j] == '=' and k == 1:
                    ss += '='+loc
                elif s[j] != 'x':
                    ss += s[j]  
                elif s[j] == 'x':
                    pass
            if ss != "":
                Send.append(loc+"_"+hugeList[i].split("+")[1]+"\n"+ss)
            if len(Send) >= 5:
                break
            ss = ""
            k = 0
    line_bot_api.reply_message(event.reply_token, [TextSendMessage(text=Send[k]) for k in range(len(Send))])


import os
if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)