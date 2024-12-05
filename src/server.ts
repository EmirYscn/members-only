import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import path from "node:path";
import { router as indexRouter } from "./routes/indexRouter";

dotenv.config({ path: "./.env" });

const app = express();

// setting up template engine
app.set("./views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// app middleware to use form body in post router
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

app.use("/", indexRouter);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    status: "fail",
    data: {
      message: "this route is not defined",
    },
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
