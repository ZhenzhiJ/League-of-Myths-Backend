import environment from "./loadEnvironment.js";
import debugConfig from "debug";
import app from "./server/app.js";
import startServer from "./server/startServer.js";

const { port, debugApp } = environment;
const debug = debugConfig(`${debugApp}:root`);

await startServer(app, port);
debug(`Server is running on http://localhost:${port}`);
