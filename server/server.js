const path = require('path'); // this package is of node it self...
const express = require('express');

const pathPublic = path.join(__dirname , '../public'); // This will reduce the file path of ../ with the original path...
const port = process.env.PORT || 1200;
const app = express();

app.use(express.static(pathPublic));
//
// app.get('/',(req,res) => {
//   res.send();
// });

app.listen(port,() => {
  console.log(`Server Started on ${port}`);
});
