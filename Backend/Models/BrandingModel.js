const mongoose = require('mongoose');

const BrandingSchema = new mongoose.Schema(
{
  organizationName: {
    type: String,
    required: true,
    default: "Staff Help Desk Software"
  },
  logoURL: { 
    type: String,
    required: true,
    default: "https://default_logo.png"
    //stores the URL of the organization's logo
  },
  primaryColor: {
    type: String,
    required: true,
    default: "#20DFDB"
  },
  secondaryColor: {
    type: String,
    required: true,
    default: "#7D8584"
  },
  accentColor: {
    type: String,
    required: true,
    default: "#187468"
  },  
  backgroundColor: {
    type: String,
    required: true,
    default: "#D4BDD3"
  },
  titlesFontColor: {
    type: String,
    required: true,
    default: "#FFFFFF"
  },
  fontColor: {
    type: String,
    required: true,
    default: "#FFFFFF"
  },
  titlesFontSize: {
    type: Number,
    required: true,
    default: 22
  },
  fontSize: {
    type: Number,
    required: true,
    default: 18
  },
  titlesFontFamily: {
    type: String,
    required: true,
    default: "Arial"
  },
  fontFamily: {
    type: String,
    required: true,
    default: "Arial-Black"
  },
  logoHeight: {
    type: Number,
    required: true,
    default: 50
  },
  logoWidth: {
    type: Number,
    required: true,
    default: 50
  },
  logoBorderColor: {
    type: String,
    required: true,
    default: "#FFFFFF"
  },
  logoBackgroundColor: {
    type: String,
    required: true,
    default: "#FFFFFF"
  },
  headerHeight: {
    type: Number,
    required: true,
    default: 50
  },
  headerWidth: {
    type: Number,
    required: true,
    default: 50
  },
  headerBackgroundColor: {
    type: String,
    required: true,
    default: "#FFFFFF"
  },
},
{
  strict :true
}
 );

const CustAndBranding = mongoose.model('BrandingModel', BrandingSchema);

module.exports = CustAndBranding;