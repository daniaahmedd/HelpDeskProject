const workFlowModel = require('../Models/WorkFlowModel');
const mongoose = require('mongoose');

//const db_url = `mongodb+srv://Mariam:LW7ZrU0N8A25kWqB@cluster0.qebr03m.mongodb.net/Software`;
const db_url = 'mongodb://127.0.0.1:27017/zeft';

const connectionOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

mongoose
  .connect(db_url, connectionOptions)
  .then(() => console.log("mongoDB connected"))
  .catch((e) => console.log(e));

async function main(){
    const workFlow1 = new workFlowModel({
        category: "Hardware",
        subcategory: "Desktops",
        expectedSolution: ["Step 1: Check power supply and ensure it's properly connected", "Step 2: Verify all cables are securely connected", "Step 3: Try connecting to a different monitor to rule out monitor issues"]
    });
    await workFlow1.save();

    const workFlow2 = new workFlowModel({
        category: "Hardware",
        subcategory: "Laptops",
        expectedSolution: ["Step 1: Check battery level and health", "Step 2: Ensure the charger is working and is compatible with the laptop", "Step 3: Perform a hard reset or power cycle"]
    });
    await workFlow2.save();

    const workFlow3 = new workFlowModel({
        category: "Hardware",
        subcategory: "Printers",
        expectedSolution: ["Step 1: Check ink or toner levels and replace if necessary", "Step 2: Ensure paper is loaded correctly and is of the right type and size", "Step 3: Check for paper jams or other hardware issues"]
    });
    await workFlow3.save();

    const workFlow4 = new workFlowModel({
        category: "Hardware",
        subcategory: "Servers",
        expectedSolution: ["Step 1: Check network connection and firewall settings", "Step 2: Ensure there is sufficient storage and memory available", "Step 3: Regularly check server logs for errors or warnings"]
    });
    await workFlow4.save();

    const workFlow5 = new workFlowModel({
        category: "Hardware",
        subcategory: "Networking equipment",
        expectedSolution: ["Step 1: Perform a power cycle on the router or switch", "Step 2: Check network cables for any physical damage", "Step 3: Ensure all devices are within range and have the correct network credentials"]
    });
    await workFlow5.save();

    const workFlow6 = new workFlowModel({
        category: "Software",
        subcategory: "Operating system",
        expectedSolution: ["Step 1: Regularly check for and install any system updates or patches", "Step 2: Perform a system restart after installing updates or making significant system changes", "Step 3: Regularly scan for malware using a trusted security solution"]
    });
    await workFlow6.save();

    const workFlow7 = new workFlowModel({
        category: "Software",
        subcategory: "Application software",
        expectedSolution: ["Step 1: Reinstall the application if it's not functioning correctly", "Step 2: Regularly check for and install any updates from the software provider", "Step 3: Ensure the system meets the minimum requirements for the software"]
    });
    await workFlow7.save();

    const workFlow8 = new workFlowModel({
        category: "Software",
        subcategory: "Custom software",
        expectedSolution: ["Step 1: Regularly communicate with the software provider for any updates or known issues", "Step 2: Ensure the software is properly installed and configured", "Step 3: Regularly backup important data in case of software failure"]
    });
    await workFlow8.save();

    const workFlow9 = new workFlowModel({
        category: "Software",
        subcategory: "Integration issues",
        expectedSolution: ["Step 1: Verify compatibility between systems or software", "Step 2: Ensure proper configuration of integration points", "Step 3: Consult with IT support or the software provider for assistance"]
    });
    await workFlow9.save();

    const workFlow10 = new workFlowModel({
        category: "Network",
        subcategory: "Email issues",
        expectedSolution: ["Step 1: Check internet connection and email server status", "Step 2: Verify email client settings are correct", "Step 3: Update email client to the latest version"]
    });
    await workFlow10.save();

    const workFlow11 = new workFlowModel({
        category: "Network",
        subcategory: "Internet connection problems",
        expectedSolution: ["Step 1: Perform a power cycle on the router or modem", "Step 2: Check network cables and wireless signal strength", "Step 3: Contact the internet service provider for further assistance"]
    });
    await workFlow11.save();

    const workFlow12 = new workFlowModel({
        category: "Network",
        subcategory: "Website errors",
        expectedSolution: ["Step 1: Clear browser cache and cookies", "Step 2: Try accessing the website from a different browser or device", "Step 3: If the issue persists, contact the website administrator or support"]
    });
    await workFlow12.save();
}
main()
.then(() => console.log("Workflows inserted successfully"))
.catch((e) => console.log("insertion failed, error: " + e.message));