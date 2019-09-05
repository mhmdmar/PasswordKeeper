const express = require("express");
const router = express.Router();
const databaseHelper = require("../DatabaseHelper");

router.get('/', (req, res) => {
  res.status(200).json("Nothing to show");
});

router.get('/getUsers', (req, res) => {
  const users = databaseHelper.getUsers();
  res.status(200).json(users);
});

router.post('/getUser', (req, res) => {
  const body = req.body;
  const resultMessage = databaseHelper.getUser(body.username, body.password);
  res.status(200).json(resultMessage);
});
router.post('/insertUser', (req, res) => {
  const body = req.body;
  const resultMessage = databaseHelper.insertUser(body.username, body.password, body.email);
  res.status(200).json(resultMessage);
});

router.post('/removeUser', (req, res) => {
  const body = req.body;
  const resultMessage = databaseHelper.removeUser(body.username, body.password);
  res.status(200).json(resultMessage);
});

router.post('/updateUser', (req, res) => {
  const body = req.body;
  const resultMessage = databaseHelper.updateUser(body.username, body.password, body.attribute, body.value);
  res.status(200).json(resultMessage);
});
module.exports = router;
