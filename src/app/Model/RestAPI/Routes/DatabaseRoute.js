const express = require("express");
const messages = require("../../../Utils/Messages");
const router = express.Router();
const databaseHelper = require("../DatabaseHelper");

router.get('/', (req, res, next) => {
  res.status(200).json("Nothing to show");
});

router.get('/getUsers', (req, res, next) => {
  const users = databaseHelper.getUsers();
  res.status(200).json(users);
});

router.post('/getUser', (req, res, next) => {
  const body = req.body;
  const resultMessage = databaseHelper.getUser(body.username, body.password);
  res.status(200).json(resultMessage);
});
router.post('/insertUser', (req, res, next) => {
  const body = req.body;
  const resultMessage = databaseHelper.insertUser(body.username, body.password, body.email);
  res.status(200).json(resultMessage);
});

router.post('/insertUsers', (req, res, next) => {
  const resultMessage = databaseHelper.insertUsers(req.body);
  res.status(200).json(resultMessage);
});

router.post('/removeUser', (req, res, next) => {
  const body = req.body;
  const resultMessage = databaseHelper.removeUser(body.username, body.password);
  res.status(200).json(resultMessage);
});

router.post('/removeUsers', (req, res, next) => {
  const resultMessage = databaseHelper.removeUsers(req.body);
  res.status(200).json(resultMessage);
});

module.exports = router;
