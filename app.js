require("dotenv").config();

const express = require("express");
const notFoundMiddleware = require("./middlewares/notFoundMiddleware");
const errorHandlerMiddleware = require("./middlewares/errorHandlerMiddleware");
const dbConnection = require("./config/dbConnection");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./config/swaggerOptions"); // Importez le fichier de configuration Swagger
const cors = require("cors");

const PORT = process.env.PORT || 3030;

const app = express();

const specs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

dbConnection();

app.use(cors());

app.use(express.json());

app.use("/patients", require("./routes/patientRoutes"));
app.use("/ministryOfHealth", require("./routes/ministryOfHealthRoutes"));
app.use("/inventories", require("./routes/inventoryRoutes"));
app.use("/healthInstitutions", require("./routes/healthInstitutionRoutes"));
app.use(
  "/emergencyNotifications",
  require("./routes/emergencyNotificationRoutes")
);
app.use("/doctors", require("./routes/doctorRoutes"));
app.use("/students", require("./routes/studentRoutes"));
app.use("/medicalCampaign", require("./routes/medicalCampaignRoutes"));
app.use("/medicalRecord", require("./routes/medicalRecordRoutes"));

app.use(notFoundMiddleware);

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
