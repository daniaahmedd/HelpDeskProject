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

    // const chat = livechat.findOne({userid:req.User.userid, status:'Open'});

    socket.on("send-chat-message", (message, myID, currentChat) => {
      targetType = user[myID];
      
      if(targetType=="Agent"){
        
        const chat = livechat.findOne({agentid:myID, _id:currentChat, status:'Open'});

        socket.to(onlineUsers[chat.userid]).emit('chat-message', {message:message});

       }

       if(targetType=="User"){
        const chat = livechat.findOne({userid:myID, _id:currentChat, status:'Open'});

        socket.to(onlineUsers[chat.agentid]).emit('chat-message', {message:message});
       }

      // socket.broadcast.emit('chat-message', {message:message});
    });


    socket.on('disconnect', ()=>{
      let disconntedID = onlineUsers[socket.id];
      let disconntedType = user[disconntedID];
      
      if(disconntedType=="Agent"){
        updateOnline(disconntedID, false);
        const chat = livechat.find({agentid:disconntedID, status:'Open'});
        console.log("chat is ", chat);

        for (let c of chat){
          socket.to(onlineUsers[c.userid]).emit('user-disconnected');
        }

       }

       if(disconntedType=="User"){
        const chat = livechat.find({user:disconntedID, status:'Open'});
        for (let c of chat){
          socket.to(onlineUsers[c.agentid]).emit('user-disconnected');
        }
       }

      socket.broadcast.emit('user-disconnected');

    })

    socket.on('new-user', (myID, myType)=>{
      console.log("my id is ", myID);
      console.log("my type is ", myType);
           onlineUsers[socket.id]=myID;
           user[myID]=myType;
           
           if(myType=="Agent"){
              updateOnline(myID,true);
           }
           
           
    })

})

async function updateOnline(id, status){
  const currentAgent = await agent.findOneAndUpdate({agentid:id}, {$set:{isOnline:status}}, {new:true});
  console.log("current agent is ", currentAgent);
}

router.post("/openchat",authorizationMiddleware(['User']) ,LiveChatController.openChat);
router.put("/closechat/:id", authorizationMiddleware(['User','Agent']), LiveChatController.closeChat);
router.get("/viewchat", authorizationMiddleware(['Agent']),  LiveChatController.viewChat); 
router.put("/sendmessage", authorizationMiddleware(['User','Agent']),  LiveChatController.sendmessage);
router.get("/view", authorizationMiddleware([]), LiveChatController.viewMessages);   //to get all agent chats see which role has access to this
router.get("/user",authorizationMiddleware(['User','Agent']), LiveChatController.currentUser);
router.get("/currentchat", authorizationMiddleware(['User']), LiveChatController.currentChat);

// router.post ("/triallogin", LiveChatController.triallogin);


module.exports = router;

//think about linking the agents IDs to the socketIds, and the user to the socketId
//socket.emit to sent to the one who sent the event
//io.emit to send to all 
//socket.broadcast.emit to send to all except the one who sent the event