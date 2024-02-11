// const express = require("express");
import express, { response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { style } from "./style.js";
import { BookModel } from "./models/bookModel.js";
dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(style("SUCCESS"));
      console.log("App connected to DB successfully");
      console.log(`App Listening on port ${PORT}\n`);
    });
  })
  .catch((error) => {
    console.log(style("ERROR"));
    console.log(`ERROR --------> ${error.message}`);
    console.log(style("ERROR"));
  });

app.post("/book", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response
        .status(400)
        .send({ message: "One of the fields is missing" });
    }

    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await BookModel.create(newBook);
    return response.status(201).send(book);
  } catch (error) {
    console.log(style("ERROR"));
    console.log(`ERROR --------> ${error.message}`);
    console.log(style("ERROR"));
  }
});

app.get("/", (request, response) => {
  response.send(
    `<h2 style="text-align: center; margin-top: 300px">Welcome to Book store application</h2>`
  );
});
