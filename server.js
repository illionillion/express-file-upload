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
// fileUploadの設定
app.use(fileUpload());

app.get("/", (req, res) => {
  res.render("pages/form");
});


app.post("/upload", async (req, res) => {
  try {
    /**
     * 画像アップロード
     * @param {*} err
     * @returns
     */
    const imageUpload = function (err) {
      if (err) return res.status(500).send(err);

      console.log("File upload!!");
    };

    const file = req.files["image-file"];
    const name = req.body["image-name"];

    let savePath = [];

    if (file.length) {
      for await (const i of file) {
        const path = __dirname + "/" + new Date().getTime() + i.name;
        savePath.push(path); // 配列にpush
        i.mv(path, imageUpload);
      }
    } else {
      const path = __dirname + "/" + new Date().getTime() + file.name;
      savePath.push(path); // 配列にpush
      file.mv(path, imageUpload);
    }

    console.log(savePath); // これをJSON.stringfyで保存
  } catch (error) {
    // console.log(error);
  } finally {
    res.redirect("/");
  }
});

// 404の時
app.use((req, res, next) => {
  // res.status(404).send("<h1>ページが見つかりません</h1>");
  console.log('not found');
  res.status(404).redirect('/')
});
