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
     
      // const chat = await livechat.findById(currentChat);
      

      // console.log(onlineUsers);
      
      // if(myData.userType=="Agent"){

      //   socket.join(chat._id);
      //   console.log(socket.rooms[chat._id]);
      //   socket.to(chat._id).broadcast.emit('chat-message', {message:message});
      //   // socket.to(onlineUsers[chat.userid]).emit('chat-message', {message:message});

      //  }

      //  if(myData.userType=="User"){

      //   console.log(socket.rooms[chat._id]);
      //   socket.to(chat._id).broadcast.emit('chat-message', {message:message});
      //   // socket.to(onlineUsers[chat.agentid]).emit('chat-message', {message:message});
      //  }

      socket.broadcast.emit("chat-message");
    });


    socket.on('disconnect',async ()=>{
      let disconntedID = onlineUsers[socket.id];
      let disconntedType = user[disconntedID];
      
      if(disconntedType=="Agent"){
        await agent.findOneAndUpdate({agentid:disconntedID}, {$set:{isOnline:false}}, {new:true});

      //   const chat = await livechat.find({agentid:disconntedID, status:'Open'});

      //   for (let c of chat){
      //     // socket.to(onlineUsers[c.userid]).emit('user-disconnected');
      //     if (c._id && socket.rooms[c._id]) {

      //     socket.to(c._id).broadcast.emit('user-disconnected');
      //     socket.leave(c._id);
      //     }
      //   }

      //   delete onlineUsers[socket.id];
      //   delete user[disconntedID];

      //  }

      //  if(disconntedType=="User"){
      //   const chat =await livechat.find({user:disconntedID, status:'Open'});

      //   for (let c of chat){
      //     if (c._id && socket.rooms[c._id]) {

      //     // socket.to(onlineUsers[c.agentid]).emit('user-disconnected');
      //     socket.to(c._id).broadcast.emit('user-disconnected');
      //     socket.leave(c._id);
      //   }
      // }

      //   delete onlineUsers[socket.id];
      //   delete user[disconntedID];
      //  }
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

          //  console.log(onlineUsers);           
    })

})


router.post("/openchat",authorizationMiddleware(['User']) ,LiveChatController.openChat);
router.put("/close/:id", authorizationMiddleware(['User','Agent']), LiveChatController.closeChat);
router.get("/viewchat", authorizationMiddleware(['Agent']),  LiveChatController.viewChat); 
router.put("/sendmessage", authorizationMiddleware(['User','Agent']),  LiveChatController.sendmessage);
router.get("/view/:id", LiveChatController.viewMessages);   //to get all agent chats see which role has access to this
router.get("/user",authorizationMiddleware(['User','Agent']), LiveChatController.currentUser);
router.get("/currentchat", authorizationMiddleware(['User']), LiveChatController.currentChat);

router.post ("/triallogin", LiveChatController.triallogin);


module.exports = router;

//think about linking the agents IDs to the socketIds, and the user to the socketId
//socket.emit to sent to the one who sent the event
//io.emit to send to all 
//socket.broadcast.emit to send to all except the one who sent the event