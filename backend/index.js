// const express = require("express");
import express, { response } from "express";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.get("/", (request, response) => {
  response.send(
    `<h2 style="text-align: center; margin-top: 300px">Welcome to Book store application</h2>`
  );
});

app.listen(PORT, () => {
  console.log(`App Listening on port ${PORT}`);
});
