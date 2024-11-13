const express = require('express');
const Parser = require('./parser'); 

const server = express();
server.use(express.json());

server.post("/evaluate", (req, res) => {
  const { expression } = req.body;

  if (!expression) {
    return res.status(403).json({ error: true, message: "No expression found" });
  }

  try {
    const result = new Parser().parse(expression); 
    return res.json({ result });
  } catch (error) {
    return res.status(400).json({ error: true, message: error.message });
  }
});

server.listen(4500, () => {
  console.log("Server ready at port 4500");
});

module.exports = server
