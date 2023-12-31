const WorkFlowModel = require("../Models/WorkFlowModel");
const ticketModel = require("../Models/ticketModel");
const agentModel = require("../Models/agentModel");
const ticketschema = require("../Models/ticketModel");
const nodemailer = require("nodemailer");
const sessionModel = require("../Models/sessionModel");
const { default: mongoose } = require("mongoose");
const { ObjectId } = mongoose.Types;
async function calcagentpreformance(userRating, agentId) {
  var Userratingsum = 0;
  var countratingnum = 0;
  const tickets = await ticketModel.find();
  const genumoftickets = tickets.map((ticket) => {
    if (ticket.rating) {
      countratingnum += 1;
      Userratingsum += ticket.rating;
    }
  });

  var averageofrating = Userratingsum / countratingnum / 100;
  const agentrating = await agentModel.findByIdAndUpdate(
    agentId,
    { Agentrating: averageofrating },
    {
      new: true,
    }
  );
  console.log(averageofrating);
  console.log(countratingnum);
}

var agent1_tickets = [];
var agent2_tickets = [];
var agent3_tickets = [];

var highPriority = [];
var mediumPriority = [];
var lowPriority = [];

var myagent1;
var myagent2;
var myagent3;

//--------------------------function 1 save agents (in create ticket api)-------------------------------
async function loadAgents() {
  console.log("loadahent func1");
  try {
    //get first 3 agents (get ticket of agent)
    const agentsData = await agentModel.find({}).limit(3);

    //law el agent el 3andy sw major yb2a medium network w low hardware w so on hasab CMS doc
    agentsData.map((agentData) => {
      switch (agentData.categories) {
        //save my agents 3ashan a3raf a-access them ba3den
        case "Software":
          myagent1 = agentData._id;
          break;
        case "Hardware":
          myagent2 = agentData._id;
          break;
        case "Network":
          myagent3 = agentData._id;
          break;
      }
    });
  } catch (error) {
    console.error("Error loading agents:", error);
  }
}

//-------------------------------------function 2 divide tickets based on priority (in create ticket api)-------------------------------
async function prioritiseTicket(ticket) {
  console.log("func2");
  try {
    /* awel ma a new ticket is created call this function (in create ticket api) to 
            put ticket in corresponding priority queue */
    //const category = ticket.categories;
    const priority = ticket.priorty;
    console.log("pri", priority);
    console.log("ticket", ticket);
    switch (priority) {
      case "high":
        highPriority.push(ticket._id);
        break;
      case "medium":
        mediumPriority.push(ticket._id);
        break;
      case "low":
        lowPriority.push(ticket._id);
        break;
    }
    console.log("high", highPriority);
    console.log("med", mediumPriority);
    console.log("low", lowPriority);
  } catch (error) {
    console.error(error);
  }
}

//--------------------------function 3 distribute tickets on agents-------------------------------

async function assignTicket(ticket) {
  console.log("func 3");
  try {
    for (const ticketId of highPriority) {
      console.log("highpri");
      console.log("ticket", ticket);
      const ticketId = highPriority[0];
      if (!ticketId || ticketId.length === 0) {
        break;
      }
      //const ticket = await ticketModel.findById(ticketId);
      const category = ticket.categories;
      const agent1 = await agentModel.find(myagent1);
      const agent2 = await agentModel.find(myagent2);
      const agent3 = await agentModel.find(myagent3);

      console.log("agent1", agent1);
      console.log("myagent1", myagent1);
      console.log("worklaod", agent1[0].workload);

      if (agent1[0].workload < 5 && category == "Software") {
        agent1_tickets.push(ticketId);
        ticket.status = "Pending";
        ticket = await ticketModel.findByIdAndUpdate(
          ticketId,
          { status: "Pending", agentid: myagent1 },
          {
            new: true,
          }
        );
        console.log("newupdatedtic", ticket);
        agent1[0].workload += 1;
        highPriority.shift();
      } else if (agent2[0].workload < 5 && category == "Hardware") {
        console.log("hardwareeeeeeeeeeeeeeeeeeeeeee");
        console.log(ticketId);
        console.log("agent2", agent2);
        agent2_tickets.push(ticketId);
        ticket.status = "Pending";
        ticket = await ticketModel.findByIdAndUpdate(
          ticketId,
          { status: "Pending", agentid: myagent2 },
          {
            new: true,
          }
        );
        console.log("newupdatedtic", ticket);
        agent2[0].workload += 1;
        highPriority.shift();
      } else if (agent3[0].workload < 5 && category == "Network") {
        agent3_tickets.push(ticketId);
        ticket.status = "Pending";
        ticket = await ticketModel.findByIdAndUpdate(
          ticketId,
          { status: "Pending", agentid: myagent3 },
          {
            new: true,
          }
        );
        console.log("newupdatedtic", ticket);
        agent3[0].workload += 1;
        highPriority.shift();
      }
    }

    for (const ticketId of mediumPriority) {
      console.log("medpri");

      const ticketId = mediumPriority[0];
      if (!ticketId || ticketId.length === 0) {
        break;
      }
      var ticket = await ticketModel.findById(ticketId);
      const category = ticket.categories;
      const agent1 = await agentModel.find(myagent1);
      const agent2 = await agentModel.find(myagent2);
      const agent3 = await agentModel.find(myagent3);
      if (category == "Software") {
        if (agent1[0].workload < 5) {
          agent1_tickets.push(ticketId);
          ticket.status = "Pending";
          ticket = await ticketModel.findByIdAndUpdate(
            ticketId,
            { status: "Pending", agentid: myagent1 },
            {
              new: true,
            }
          );
          console.log("newupdatedtic", ticket);
          agent1[0].workload += 1;
          mediumPriority.shift();
        } else if (agent2[0].workload < 5) {
          agent2_tickets.push(ticketId);
          ticket.status = "Pending";
          ticket = await ticketModel.findByIdAndUpdate(
            ticketId,
            { status: "Pending", agentid: myagent2 },
            {
              new: true,
            }
          );
          console.log("newupdatedtic", ticket);
          agent2[0].workload += 1;
          mediumPriority.shift();
        }
      } else if (category == "Hardware") {
        if (agent2[0].workload < 5) {
          agent2_tickets.push(ticketId);
          ticket.status = "Pending";
          ticket = await ticketModel.findByIdAndUpdate(
            ticketId,
            { status: "Pending", agentid: myagent2 },
            {
              new: true,
            }
          );
          console.log("newupdatedtic", ticket);
          agent2[0].workload += 1;
          mediumPriority.shift();
        } else if (agent3[0].workload < 5) {
          agent3_tickets.push(ticketId);
          ticket.status = "Pending";
          ticket = await ticketModel.findByIdAndUpdate(
            ticketId,
            { status: "Pending", agentid: myagent3 },
            {
              new: true,
            }
          );
          console.log("newupdatedtic", ticket);
          agent3[0].workload += 1;
          mediumPriority.shift();
        }
      } else if (category == "Network") {
        if (agent3[0].workload < 5) {
          agent3_tickets.push(ticketId);
          ticket.status = "Pending";
          ticket = await ticketModel.findByIdAndUpdate(
            ticketId,
            { status: "Pending", agentid: myagent3 },
            {
              new: true,
            }
          );
          console.log("newupdatedtic", ticket);
          agent3[0].workload += 1;
          mediumPriority.shift();
        } else if (agent1[0].workload < 5) {
          agent1_tickets.push(ticketId);
          ticket.status = "Pending";
          ticket = await ticketModel.findByIdAndUpdate(
            ticketId,
            { status: "Pending", agentid: myagent1 },
            {
              new: true,
            }
          );
          console.log("newupdatedtic", ticket);
          agent1[0].workload += 1;
          mediumPriority.shift();
        }
      }
    }

    for (const ticketId of lowPriority) {
      console.log("lowpri");

      const ticketId = lowPriority[0];
      if (!ticketId || ticketId.length === 0) {
        break;
      }
      var ticket = await ticketModel.findById(ticketId);
      const category = ticket.categories;
      const agent1 = await agentModel.find(myagent1);
      const agent2 = await agentModel.find(myagent2);
      const agent3 = await agentModel.find(myagent3);
      if (category == "Software") {
        if (agent1[0].workload < 5) {
          agent1_tickets.push(ticketId);
          ticket.status = "Pending";
          ticket = await ticketModel.findByIdAndUpdate(
            ticketId,
            { status: "Pending", agentid: myagent1 },
            {
              new: true,
            }
          );
          console.log("newupdatedtic", ticket);
          agent1[0].workload += 1;
          lowPriority.shift();
        } else if (agent3[0].workload < 5) {
          agent3_tickets.push(ticketId);
          ticket.status = "Pending";
          ticket = await ticketModel.findByIdAndUpdate(
            ticketId,
            { status: "Pending", agentid: myagent3 },
            {
              new: true,
            }
          );
          console.log("newupdatedtic", ticket);
          agent3[0].workload += 1;
          lowPriority.shift();
        }
      } else if (category == "Hardware") {
        if (agent2[0].workload < 5) {
          agent2_tickets.push(ticketId);
          ticket.status = "Pending";
          ticket = await ticketModel.findByIdAndUpdate(
            ticketId,
            { status: "Pending", agentid: myagent2 },
            {
              new: true,
            }
          );
          console.log("newupdatedtic", ticket);
          agent2[0].workload += 1;
          lowPriority.shift();
        } else if (agent1[0].workload < 5) {
          agent1_tickets.push(ticketId);
          ticket.status = "Pending";
          ticket = await ticketModel.findByIdAndUpdate(
            ticketId,
            { status: "Pending", agentid: myagent1 },
            {
              new: true,
            }
          );
          console.log("newupdatedtic", ticket);
          agent1[0].workload += 1;
          lowPriority.shift();
        }
      } else if (category == "Network") {
        if (agent3[0].workload < 5) {
          agent3_tickets.push(ticketId);
          ticket.status = "Pending";
          ticket = await ticketModel.findByIdAndUpdate(
            ticketId,
            { status: "Pending", agentid: myagent3 },
            {
              new: true,
            }
          );
          console.log("newupdatedtic", ticket);
          agent3[0].workload += 1;
          lowPriority.shift();
        } else if (agent2[0].workload < 5) {
          agent2_tickets.push(ticketId);
          ticket.status = "Pending";
          ticket = await ticketModel.findByIdAndUpdate(
            ticketId,
            { status: "Pending", agentid: myagent2 },
            {
              new: true,
            }
          );
          console.log("newupdatedtic", ticket);
          agent2[0].workload += 1;
          lowPriority.shift();
        }
      }
    }
    console.log("agent111", agent1_tickets);
    console.log("agent2", agent2_tickets);
    console.log("agent3", agent3_tickets);
  } catch (error) {
    console.error(error);
  }
}
//---------------------------------------------ticketcontroller -------------------------------------------------
const TicketController = {
  createTicket: async (req, res) => {
    const valuePriorityMap = {
      1: "high",
      2: "medium",
      3: "low",
    };
    // const reqCookie = req.headers.cookie;
    // const searchTerm = "token=";
    // const searchIndex = reqCookie.indexOf(searchTerm);
    // const reqToken = reqCookie.substr(searchIndex + searchTerm.length);

    // const userSession = await sessionModel.find(
    //   { token: reqToken },
    //   { userId: 1, _id: 0 }
    // );

    // if (!userSession) {
    //   return res.status(400).send("error : user's session doesn't exist");
    // }

    // const userid = userSession[0].userId;

    const { categories, subcategories, issueDescription } = req.body;
    let priority;
    if (
      subcategories === "Desktops" ||
      subcategories === "Laptops" ||
      subcategories === "Operating system" ||
      subcategories === "Application software"
    ) {
      priority = 2;
    } else if (
      subcategories === "Printers" ||
      subcategories === "Servers" ||
      subcategories === "Networking equipment" ||
      subcategories === "Integration issues" ||
      subcategories === "Internet connection problems" ||
      subcategories === "Website errors"
    ) {
      priority = 1;
    } else if (
      subcategories === "Custom software" ||
      subcategories === "Email issues"
    )
      priority = 3;
    else {
      priority = 0;
    }

    //const newTicket = await ticket.save();
    //return res.status(201).json(newTicket);

    //const priority = valuePriorityMap[value] || 'Unknown';

    //return priority;

    try {
      const userId = req.body.userid;
      const ticket = new ticketModel({
        categories: categories,
        subcategories: subcategories,
        issueDescription: issueDescription,
        priorty: valuePriorityMap[priority], // Assuming 'priorty' is the correct field name in your schema
        status: "Open", // Assuming 'status' is a required field with a default value
        closetime: Date.now(),
        openedtime: Date.now(), // Assuming 'openedtime' is a required field with a default value,
        userid: userId,
      });
      loadAgents();
      prioritiseTicket(ticket);
      assignTicket(ticket);

      const newTicket = await ticket.save();
      return res.status(201).json(newTicket);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  },

  updateTicket: async (req, res) => {
    try {
      const { issueSolution, emailuser } = req.body;

      const ticketid = await ticketschema.findByIdAndUpdate(
        req.params.ticketid,
        { issueSolution: issueSolution,status:"Close" },
        { new: true }
      );

      let config = {
        service: "gmail",
        auth: {
          user: "daniaahmed133@gmail.com",
          pass: "qjuw vwcd dycb tgrs",
        },
        tls: {
          rejectUnauthorized: false,
        },
      };
      let transporter = nodemailer.createTransport(config);

      let message = {
        from: "daniaahmed133@gmail.com",
        to: emailuser,
        subject: "Ticket Update Confirmation",
        attachments: [],
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
       <head>
        <meta charset="UTF-8">
        <meta content="width=device-width, initial-scale=1" name="viewport">
        <meta name="x-apple-disable-message-reformatting">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta content="telephone=no" name="format-detection">
        <title>New Template 2</title><!--[if (mso 16)]>
          <style type="text/css">
          a {text-decoration: none;}
          </style>
          <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
      <xml>
          <o:OfficeDocumentSettings>
          <o:AllowPNG></o:AllowPNG>
          <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
      </xml>
      <![endif]-->
        <style type="text/css">
      #outlook a {
          padding:0;
      }
      .es-button {
          mso-style-priority:100!important;
          text-decoration:none!important;
      }
      a[x-apple-data-detectors] {
          color:inherit!important;
          text-decoration:none!important;
          font-size:inherit!important;
          font-family:inherit!important;
          font-weight:inherit!important;
          line-height:inherit!important;
      }
      .es-desk-hidden {
          display:none;
          float:left;
          overflow:hidden;
          width:0;
          max-height:0;
          line-height:0;
          mso-hide:all;
      }
      [data-ogsb] .es-button.es-button-1702990812154 {
          padding:10px 30px!important;
      }
      @media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120% } h1 { font-size:36px!important; text-align:left } h2 { font-size:26px!important; text-align:left } h3 { font-size:20px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:36px!important; text-align:left } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important; text-align:left } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important; text-align:left } .es-menu td a { font-size:12px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:20px!important; display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0!important } .es-m-p0r { padding-right:0!important } .es-m-p0l { padding-left:0!important } .es-m-p0t { padding-top:0!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-m-p5 { padding:5px!important } .es-m-p5t { padding-top:5px!important } .es-m-p5b { padding-bottom:5px!important } .es-m-p5r { padding-right:5px!important } .es-m-p5l { padding-left:5px!important } .es-m-p10 { padding:10px!important } .es-m-p10t { padding-top:10px!important } .es-m-p10b { padding-bottom:10px!important } .es-m-p10r { padding-right:10px!important } .es-m-p10l { padding-left:10px!important } .es-m-p15 { padding:15px!important } .es-m-p15t { padding-top:15px!important } .es-m-p15b { padding-bottom:15px!important } .es-m-p15r { padding-right:15px!important } .es-m-p15l { padding-left:15px!important } .es-m-p20 { padding:20px!important } .es-m-p20t { padding-top:20px!important } .es-m-p20r { padding-right:20px!important } .es-m-p20l { padding-left:20px!important } .es-m-p25 { padding:25px!important } .es-m-p25t { padding-top:25px!important } .es-m-p25b { padding-bottom:25px!important } .es-m-p25r { padding-right:25px!important } .es-m-p25l { padding-left:25px!important } .es-m-p30 { padding:30px!important } .es-m-p30t { padding-top:30px!important } .es-m-p30b { padding-bottom:30px!important } .es-m-p30r { padding-right:30px!important } .es-m-p30l { padding-left:30px!important } .es-m-p35 { padding:35px!important } .es-m-p35t { padding-top:35px!important } .es-m-p35b { padding-bottom:35px!important } .es-m-p35r { padding-right:35px!important } .es-m-p35l { padding-left:35px!important } .es-m-p40 { padding:40px!important } .es-m-p40t { padding-top:40px!important } .es-m-p40b { padding-bottom:40px!important } .es-m-p40r { padding-right:40px!important } .es-m-p40l { padding-left:40px!important } .es-desk-hidden { display:table-row!important; width:auto!important; overflow:visible!important; max-height:inherit!important } .h-auto { height:auto!important } }
      @media screen and (max-width:384px) {.mail-message-content { width:414px!important } }
      </style>
       </head>
       <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
        <div dir="ltr" class="es-wrapper-color" lang="en" style="background-color:#FAFAFA"><!--[if gte mso 9]>
                  <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                      <v:fill type="tile" color="#fafafa"></v:fill>
                  </v:background>
              <![endif]-->
         <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FAFAFA">
           <tr>
            <td valign="top" style="padding:0;Margin:0">
             <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
               <tr>
                <td align="center" style="padding:0;Margin:0">
                 <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                   <tr>
                    <td align="left" style="Margin:0;padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:30px">
                     <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                       <tr>
                        <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                         <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                           <tr>
                            <td align="center" style="padding:0;Margin:0;font-size:0px"><img src="https://sdndkp.stripocdn.email/content/guids/CABINET_60aca87a438e06437a81347cfd8760bd852d693b48b0c9b2c17f6ed969eb431a/images/1103confetti.gif" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="195"></td>
                           </tr>
                           <tr>
                            <td align="center" class="es-m-txt-c" style="padding:0;Margin:0"><h1 style="Margin:0;line-height:46px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:46px;font-style:normal;font-weight:bold;color:#333333">This is to confirm that your ticket has just been updated</h1></td>
                           </tr>
                           <tr>
                            <td align="center" style="padding:0;Margin:0;padding-bottom:10px;padding-top:40px"><span class="es-button-border" style="border-style:solid;border-color:#2CB543;background:#5C68E2;border-width:0px;display:inline-block;border-radius:0px;width:auto"><a href="http://localhost:5173/" class="es-button es-button-1702990812154" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF;font-size:20px;padding:10px 30px;display:inline-block;background:#5C68E2;border-radius:0px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:24px;width:auto;text-align:center;mso-padding-alt:0;mso-border-alt:10px solid #5C68E2">Continue</a></span></td>
                           </tr>
                         </table></td>
                       </tr>
                     </table></td>
                   </tr>
                 </table></td>
               </tr>
             </table>
             <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
               <tr>
                <td class="es-info-area" align="center" style="padding:0;Margin:0">
                 <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" bgcolor="#FFFFFF">
                   <tr>
                    <td align="left" style="padding:20px;Margin:0">
                     <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                       <tr>
                        <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                         <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                           <tr>
                            <td align="center" class="es-infoblock" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px"><a target="_blank" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px"></a>No longer want to receive these emails?&nbsp;<a href="" target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px">Unsubscribe</a>.<a target="_blank" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px"></a></p></td>
                           </tr>
                         </table></td>
                       </tr>
                     </table></td>
                   </tr>
                 </table></td>
               </tr>
             </table></td>
           </tr>
         </table>
        </div>
       </body>
      </html>`,
      };
      // const ticket  = ticketschema.findById(req.params.ticketid);
      // const assignedAgentId = ticket.agentid;
      // const assignedAgent = await agentModel.findById(assignedAgentId);
      // const prevWorkload = await agentModel.find({_id:assignedAgentId},{workload:1,_id:0});;
      // const newAgentWorkload = await agentModel.findByIdAndUpdate(
      //   assignedAgentId,
      //   { workload: prevWorkload - 1},
      //   { new: true }
      // );
      transporter
        .sendMail(message)
        .then(() => {
          return res.status(201).json({
            msg: "you should receive an email",
          });
        })
        .catch((error) => {
          return res.status(500).json({ error });
        });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  },

  rateTicket: async (req, res) => {
    try {
      const ticket = await ticketModel.findById(req.params.ticketid);
      if (!ticket) {
        return res
          .status(404)
          .json({ success: false, error: "Ticket not found" });
      }
      const ticketdata = await ticketModel.findByIdAndUpdate(
        req.params.ticketid,
        { rating: req.body.rating },
        {
          new: true,
        }
      );
      calcagentpreformance(req.body.rating, ticket.agentid);
      return res.status(201).send("updated");
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  getTicket: async (req, res) => {
    const tickets = await ticketModel.find();
    return res.status(200).send("recieved");
  },
  gettickets: async (req, res) => {
    try {
      const data = await ticketschema.find().lean().exec();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = TicketController;
