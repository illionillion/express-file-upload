import Express from "express";
import path from "path";
import { fileURLToPath } from "url";

const uploadRouter = Express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

uploadRouter.post("/", async (req, res) => {
  try {
    
    console.log(req.body);
    console.log(req.files);
    const file = req.files["image-file"];
    const name = req.body["image-name"];
    
    let savePath = [];

    /**
     * 画像アップロード
     * @param {*} err
     * @returns
     */
    const imageUpload = function (file) {

      const path = __dirname + "/../public/images/" + new Date().getTime() + file.name;
      savePath.push(path); // 配列にpush
      file.mv(path, err => {
        if(err) {
          console.log(err); return;
        }
        console.log("File upload!!");
      });

    };

    if (file.length) {
      for await (const i of file) {
        imageUpload(i)
      }
    } else {
      imageUpload(file)
    }

    console.log(savePath); // これをJSON.stringfyで保存
    return res.status(200).redirect("/");
  } catch (error) {
    return res.status(500).redirect("/");
  }
});

export default uploadRouter;
