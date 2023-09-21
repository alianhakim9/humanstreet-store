import mongoose from "mongoose";
import env from "./utils/validate-env";
import app from "./app";

const port = env.PORT;

// database connection
mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Mongoose connection is successful");
  })
  .catch(console.error);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
