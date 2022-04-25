import fs from "fs/promises"; // use promises version not callbacks version
import path from "path";
import connect from "./core/db.js";
import { exit } from "process";
import Seed from "./models/Seed.js";
import url from "url";
import mongoose from "mongoose";
import { ApiError } from "./errors/ApiError.js";
const __dirname = path.resolve();

connect().then(async () => {
  const files = await fs.readdir(path.join(__dirname, "/seed/"));
  const session = await mongoose.startSession();
  try {
    for await (let fileName of files) {
      await session.withTransaction(async () => {
        if (fileName.endsWith(".js")) {
          if ((await canSeed(fileName)) == false) {
            console.log(fileName);
            await Seed.updateOne(
              { fileName },
              { fileName, locked: true },
              { upsert: true,session } 
            );
            const seed = await import(
              url.pathToFileURL(path.join(__dirname, `/seed/${fileName}`))
            );
            await seed.default();
            await Seed.updateOne(
              { fileName },
              { fileName, locked: false },
              { upsert: true,session }
            );
          }
        }
      });
    }
    console.log("Done!");
  } catch (error) {
console.log(error)  }finally{
  await session.endSession();
  exit(0);
}
});

async function canSeed(fileName) {
  const d = await Seed.find({ fileName });
  if (d.length==0 ) return true;
  else 
  return false
}
