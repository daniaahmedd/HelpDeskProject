const mongoose = require("mongoose");
const agent = require('../Models/agentModel');
const user = require('../Models/userModel');
const ticket = require('../Models/ticketModel');
const livechat= require('../Models/LiveChatModel');
const LiveChatController = require('../Controller/LiveChatController');
const authorizationMiddleware = require("../Middleware/authorizationMiddleware");

const express = require("express");
const router = express.Router();
const socketIO = require("socket.io");  
const {io}= require('../app');

const liveChat = io.of("/api/chat");

liveChat.on("connection", socket=>
{

    const onlineUsers={};
    const user={};

    socket.on("send-chat-message",() => {

      socket.broadcast.emit("chat-message");
    });


    socket.on('disconnect',async ()=>{
      let disconntedID = onlineUsers[socket.id];
      let disconntedType = user[disconntedID];
      
      if(disconntedType=="Agent"){
        await agent.findOneAndUpdate({agentid:disconntedID}, {$set:{isOnline:false}}, {new:true});

      }
    })

    socket.on('new-user', async (myData)=>{

           onlineUsers[socket.id]=myData._id;
           user[myData._id]=myData.userType;
           
           if(myData.userType=="Agent"){
             await agent.findOneAndUpdate({agentid:myData._id}, {$set:{isOnline:true}}, {new:true});
           }

            if(myData.userType=="User"){
              const chat = await livechat.findOne({userid:myData._id, status:'Open'});
              socket.join(chat._id);
            }

    })

})


router.post("/openchat",authorizationMiddleware(['User']) ,LiveChatController.openChat);
router.put("/close/:id", authorizationMiddleware(['User','Agent']), LiveChatController.closeChat);
router.get("/viewchat", authorizationMiddleware(['Agent']),  LiveChatController.viewChat); 
router.put("/sendmessage", authorizationMiddleware(['User','Agent']),  LiveChatController.sendmessage);
router.get("/view/:id", LiveChatController.viewMessages);   //to get all agent chats see which role has access to this
router.get("/user",authorizationMiddleware(['User','Agent']), LiveChatController.currentUser);
router.get("/currentchat", authorizationMiddleware(['User']), LiveChatController.currentChat);

module.exports = router;

//think about linking the agents IDs to the socketIds, and the user to the socketId
//socket.emit to sent to the one who sent the event
//io.emit to send to all 
//socket.broadcast.emit to send to all except the one who sent the event