const user = require('../Models/userModel.js');
const agent = require('../Models/agentModel.js');
const mongoose = require('mongoose');
const ticket = require('../Models/ticketModel.js');
const livechat= require('../Models/LiveChatModel.js');

const db_url = 'mongodb://127.0.0.1:27017/trial';

const connectionOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  };
  
  mongoose
    .connect(db_url, connectionOptions)
    .then(() => console.log("mongoDB connected"))
    .catch((e) => console.log(e));


async function UserAgentData(){
   let user1=new user({
    UserName:"Agent1",
    userType:"Agent",
    password:"12345678",
    email:"agent1@gmail.com",
    firstName:"Ahmed",
    lastName:"Mohamed"
   })

   user1 = await user1.save(); 

   let agent1 = new agent({
    agentid:user1._id,
    categories:"Software",
    workload:5,
    Agentrating:null,
    isOnline:false,
   })

   await agent1.save();

   let user2= new user({
     UserName: "a123",
     userType: "User",
     password: "12345678",
     email:"u2@gmail.com",
        firstName:"Ahmed",
        lastName:"Mohamed"
   })
  await user2.save();

  
  let user3= new user({
    UserName: "mo12",
    userType: "User",
    password: "12345678",
    email:"u3@gmail.com",
       firstName:"Ahmed",
       lastName:"Mohamed"
  })
 await user3.save();

 
 let user4= new user({
  UserName: "klo",
  userType: "User",
  password: "12345678",
  email:"u4@gmail.com",
     firstName:"Ahmed",
     lastName:"Mohamed"
})
await user4.save();

 
let user5= new user({
  UserName: "nos",
  userType: "User",
  password: "12345678",
  email:"u5@gmail.com",
     firstName:"Ahmed",
     lastName:"Mohamed"
})
await user5.save();



  let ticket1 = new ticket ({
    status:"Open",
    categories:"Software",
    subcategories:"Desktops",
    userid:user2._id,
    agentid:agent1.agentid,
    priorty:"high",
    issueDescription:"I have a problem with my computer",
  })

    await ticket1.save();

    let ticket2 = new ticket ({
      status:"Open",
      categories:"Software",
      subcategories:"Desktops",
      userid:user3._id,
      agentid:agent1.agentid,
      priorty:"high",
      issueDescription:"I have a problem with my computer",
    })
  
      await ticket2.save();

      let ticket3 = new ticket ({
        status:"Open",
        categories:"Software",
        subcategories:"Desktops",
        userid:user4._id,
        agentid:agent1.agentid,
        priorty:"high",
        issueDescription:"I have a problem with my computer",
      })
    
        await ticket3.save();

        let ticket4 = new ticket ({
          status:"Open",
          categories:"Software",
          subcategories:"Desktops",
          userid:user5._id,
          agentid:agent1.agentid,
          priorty:"high",
          issueDescription:"I have a problem with my computer",
        })
      
          await ticket4.save();

         let chat1= new livechat({
          ticketid:ticket2._id,
          messages:[],
          userid:user3._id,
          agentid:agent1.agentid,
          status:"Open"
         })
         await chat1.save(); 

         let chat2= new livechat({
          ticketid:ticket3._id,
          messages:[],
          userid:user4._id,
          agentid:agent1.agentid,
          status:"Open"
         })
         await chat2.save(); 

         let chat3= new livechat({
          ticketid:ticket4._id,
          messages:[],
          userid:user5._id,
          agentid:agent1.agentid,
          status:"Open"
         })
         await chat3.save(); 

}    

UserAgentData().then(()=>console.log("done")).catch((e)=>console.log(e));