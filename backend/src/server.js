const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const permissionRoute = require("./routes/permission.route");
const certificateRoute = require("./routes/certificate.route");

const PORT = process.env.PORT || 6969;

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/permissions", permissionRoute);
app.use("/api/certificates", certificateRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
