"use strict";

import Express from "express";
import fileUpload from "express-fileupload";
import uploadRouter from "./routes/upload.js";

const app = Express();
const port = 5050;

app.set("view engine", "ejs");

// body-parserの設定
app.use(Express.json());
app.use(
  Express.urlencoded({
    extended: true,
  })
);
// fileUploadの設定
app.use(fileUpload());

// ルーターにやらせる
app.use("/upload", uploadRouter);

app.get("/", (req, res) => {
  res.status(200).render("pages/form");
});

// 404の時
app.use((req, res, next) => {
  console.log(req.url + "is not found");
  res.status(404).redirect("/");
});

app.listen(port, () => console.log(`http://localhost:${port}`));
