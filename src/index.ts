import express, { Application } from "express";
import connectDB from "./config/db";
import logger from "./utils/logger";

import clusterRoutes from "./routes/clusterRoutes";
import chatRoutes from "./routes/chatRoutes";

require('dotenv').config();

// important stuff
const app: Application = express();
const PORT: number = parseInt(process.env.PORT || '3000');

// connect to MongoDB
connectDB();

app.use(express.json());

app.use('/api/clusters', clusterRoutes);
app.use('/api/chats', chatRoutes);

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});
