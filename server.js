import express from "express";
import cors from "cors";

import router from "./router.js";

const app = express();

app.use(cors())
// Make app able to use/read json
app.use(express.json());

app.use(router);

// * means anything else
app.use('*', (req, res) => res.status(404).json({error: "not found"}));

// We will use this export as an import in another file
export default app;
