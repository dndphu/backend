const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    });

    console.log("Connect success!!!");
  } catch (error) {
    console.error("error :>> ", error);
    console.log("Fail !!!");
  }
}

module.exports = { connect };
