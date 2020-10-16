const express = require("express");
const morgan = require("morgan");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const schema = require("./schema/schema");

const app = express();

app.use(cors());
app.use(morgan("common"));

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on PORT ${PORT}.....`));
