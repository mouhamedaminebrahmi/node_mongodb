require("dotenv").config();
module.exports = {
  url: process.env.MONGODB_URI,
};

//login success uri
//login loclal : demarer mongo local  et brew services start mongodb-community

//login docker : install image et run image
//console mongosh
// connect via compase
//mongodb://amin:amin@0.0.0.0:27017
//connnect via app

//process.env.MONGODB_URI
//mongodb://localhost:27017/book
//mongodb://amin:amin@0.0.0.0:27017/book
//mongodb://mongo-db:27017/jj
