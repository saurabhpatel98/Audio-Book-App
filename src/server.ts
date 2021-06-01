//https://blog.morizyun.com/blog/typescript-express-tutorial-javascript-nodejs/index.html

//ALternative Methods for Routing
// https://blog.risingstack.com/building-a-node-js-app-with-typescript-tutorial/

import app from "./app";
const PORT = 3000;

app.listen(PORT, () => {
  console.log("Express server listening on port " + PORT);
});
