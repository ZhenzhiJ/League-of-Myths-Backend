import environment from "./loadEnvironment.js";
import debugConfig from "debug";
import app from "./server/app.js";
import startServer from "./server/startServer.js";
import connectDatabase from "./database/connectDatabase.js";

const { port, mongoDbUrl } = environment;

const debug = debugConfig(`league-of-myths:root`);

try {
  await startServer(app, port);
  debug(`Server is running on http://localhost:${port}`);

  await connectDatabase(mongoDbUrl);
  debug("Successfully connected to mongo database");
} catch (error: unknown) {
  debug(`Error at starting server: ${(error as Error).message}`);
}
