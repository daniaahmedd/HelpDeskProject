const mongoose = require("mongoose");
const agent = require('../Models/agentModel');
const user = require('../Models/userModel');
const ticket = require('../Models/ticketModel');
const livechat= require('../Models/LiveChatModel');
const jwt = require("jsonwebtoken");
require('dotenv').config();
const secretKey =process.env.SECRET_KEY ;

const LiveChatController={ // to prevent opening a closed ticket, disable the button once the ticket status is closed
    //this works
   currentChat: async(req,res)=>{ 
    try{

        let chat = await livechat.findOne({userid:req.user.userid, status:'Open'});
        if(!chat){
            return res.status(404).json({message:"chat not found"});
        }

        const User = await user.findById(chat.agentid);
        chat= {...chat._doc, userdata:User}


        return  res.status(200).json({chat});
    }catch(e){
       res.status(500).json({message:e.message})
    }
   },
   openChat: async(req,res)=>{ // post /openchat
    try{
      
        // const chatExists = await livechat.findOne({ticketid:req.body.ticketid});

        // if(chatExists){
        //     return  res.status(404).json({message: "you had already opened a chat"});
        // }
        // else {

        //make the user open chat with any avaliable agent by checking the socketID of the online agents
        //if no online agents, throw an error there is no agent right now try againa later, and handle it in the frontend using catch and display the error 
        //message using pop-up like InfoHover

        const onlineAgent = await agent.findOne({isOnline:true});
        if(!onlineAgent){
            return res.status(404).json({message:"there is no agent online right now, try again later"});
        }
        else{

        const chat = new livechat({
            ticketid:req.body.ticketid,
            messages:[],
            userid:req.user.userid,
            agentid:onlineAgent._id,
            status:'Open',        
        })
        const savedChat = await chat.save();

        return  res.status(200).json({savedChat});
        
        }
    }catch(e){
       res.status(500).json({message:e.message})
    }
   },

   closeChat: async(req,res)=>{ //test with authentication althouh it is not needed
    try{
      console.log("SVBAGEVASF")
        const chat = await livechat.findById(req.params.id);
        if(!chat){
            return res.status(404).json({message:"chat not found"});
        }
        chat.status='Close';
        const savedChat = await chat.save();
        return  res.status(200).json({savedChat});
    }catch(e){
       res.status(500).json({message:e.message})
    }
   },

   viewChat: async(req,res)=>{ //test with authentication
    try{
       if (req.user.userType=="Agent"){

        let chat = await livechat.find({agentid:req.user.userid, status:'Open'});  
        if(chat.length!=0){
            for (let i=0; i<chat.length; i++){
                const User = await user.findById(chat[i].userid);
                chat[i]= {...chat[i]._doc, userdata:User}
            }
        } 
        return  res.status(200).json({chat});
    }
    else {
        return  res.status(200).json({});
    }
    }catch(e){
       res.status(500).json({message:e.message})
    }

   },

   sendmessage: async(req,res)=>{//test with authentication
     try{

        const chat = await livechat.findOne({_id:req.body.id, status:'Open'});
        if(!chat){
            return res.status(404).json({message:"chat not found"});
        }
        chat.messages.push({
            content:req.body.message,
            senderID:req.user.userid,             
            sendTime:Date.now(),
        })
        const savedChat = await chat.save();
        return  res.status(200).json({savedChat});
     }catch(e){
        res.status(500).json({message:e.message})
     }
   },

   viewMessages: async(req,res)=>{ // get /viewMessages
      try{
          const id = req.params.id;
          const chat = await livechat.findById(id);
          return res.status(200).json({chat});

      }catch(e){
            res.status(500).json({message:e.message})
      }
   },

  currentUser:async(req,res)=>{ //fix authentication then test
    try{
      const user1 = await user.findById(req.user.userid); 
      return res.status(200).json({user1});
    }catch(e){
      res.status(500).json({message:e.message})
    }
  }

}
module.exports= LiveChatController;