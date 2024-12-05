"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const node_path_1 = __importDefault(require("node:path"));
const indexRouter_1 = require("./routes/indexRouter");
dotenv_1.default.config({ path: "./.env" });
const app = (0, express_1.default)();
// setting up template engine
app.set("./views", node_path_1.default.join(__dirname, "views"));
app.set("view engine", "pug");
// app middleware to use form body in post router
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(node_path_1.default.join(__dirname, "../public")));
app.use("/", indexRouter_1.router);
app.all("*", (req, res, next) => {
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
