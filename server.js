"use strict";

import Express from "express";
import fileUpload from "express-fileupload";
import path from "path";
import { fileURLToPath } from "url";

const app = Express();
const port = 5050;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.listen(port);
console.log(`http://localhost:${port}`);

app.set("view engine", "ejs");

// body-parserの設定
app.use(Express.json());
app.use(
  Express.urlencoded({
    extended: true,
  })
);
app.use(fileUpload());

app.get("/", (req, res) => {
  res.render("pages/form");
});


app.post("/upload", (req, res) => {

  
  // console.log(req.body["image-name"]);
  // console.log(req.files["image-file"].name);
  // console.log(req.files["image-file"]);
  
  /**
   * 画像アップロード
   * @param {*} err 
   * @returns 
   */
  const imageUpload = function (err) {
    if (err) return res.status(500).send(err);
  
    console.log("File upload!!");
  }

  const file = req.files["image-file"];
  const name = req.body["image-name"]
  
  if (file.length) {
    for (const i of file) {
      const path = __dirname + "/" + new Date().getTime() + i.name;
      console.log(path);
      i.mv(path, imageUpload)
    }
  } else {
    const path = __dirname + "/" + new Date().getTime() + req.files["image-file"].name;
    file.mv(path, imageUpload);
  }


  res.redirect("/");
});
