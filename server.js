"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇
  .get("/cat-message", (req, res) => {
    const message = { author: "cat", text: "Meow" };
    const randomTime = Math.floor(Math.random() * 5000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  .get("/monkey-message", (req, res) => {
    const messages = [
      "Don’t monkey around with me.",
      "If you pay peanuts, you get monkeys.",
      "I fling 💩 at you!",
      "🙊",
      "🙈",
      "🙉",
    ];
    let randomMsg = messages[Math.floor(Math.random() * messages.length)];
    console.log(randomMsg);
    const message = {
      author: "monkey",
      text: randomMsg,
    };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  .get("/parrot-message", (req, res) => {
    const message = { author: "parrot", text: req.query.message };
    // console.log(message);
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
    console.log(req.query);
  })

  .get("/bot-message", (req, res) => {
    const commonGreetings = ["hi", "hello", "howdy"];
    const goodBye = ["Will miss u", "adieu", "Godspeed", "bye-bye"];
    let newGoodBye = goodBye[Math.floor(Math.random() * goodBye.length)];
    let newMsg = req.query.message;
    // console.log(newMsg);
    const getBotMessage = (text) => {
      let botMsg = "";
      // for (let x = 0; x < goodBye.length; x++) {
      if (goodBye.includes(text.toLowerCase())) {
        botMsg = "Bzzt GoodBye";
        return botMsg;
      }
      // }
      // for (let i = 0; i < commonGreetings.length; i++) {
      // console.log(text);
      if (commonGreetings.includes(text.toLowerCase())) {
        botMsg = `Bzzt Hello!`;
      } else {
        botMsg = `Bzzt ${text}`;
      }
      // }
      return botMsg;
    };
    const message = { author: "bot", text: getBotMessage(newMsg) };
    const randomTime = Math.floor(Math.random() * 2000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })
  // .get("/bot-message", (req, res) => {
  // const goodBye = ["Will miss u", "adieu", "Godspeed", "bye-bye"];
  // let newGoodBye = goodBye(Math.floor(Math.random() * goodBye.length));
  //   let goodBye1 = req.query.message;
  //   const getBotMessage1 = (text) => {
  //     let botMsg1 = "";
  //     if (text === "goodbye") {
  //       botMsg1 = `Bzzt ${newGoodBye}`;
  //     } else {
  //       botMsg1 = "Bzzt Goodbye";
  //     }
  //     return botMsg1;
  //   };
  //   const message = { author: "bot", text: getBotMessage1(goodBye1) };
  //   const randomTime = Math.floor(Math.random() * 2000);
  //   setTimeout(() => {
  //     res.status(200).json({ status: 200, message });
  //   }, randomTime);
  // })
  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this serves up the homepage
  .get("/", (req, res) => {
    res
      .status(200)
      .json({ status: 200, message: "This is the homepage... it's empty :(" });
  })

  // this is our catch all endpoint. If a user navigates to any endpoint that is not
  // defined above, they get to see our 404 page.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not the page you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
