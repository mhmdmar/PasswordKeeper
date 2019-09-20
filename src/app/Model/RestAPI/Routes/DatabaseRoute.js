const express = require("express");
const router = express.Router();
const databaseHelper = require("../DatabaseHelper");
const routes = require('../../../AppSettings/Routes');
router.get('/', (req, res) => {
  res.status(200).json("Nothing to show");
});

function getRoutePath(route) {
  return '/'.concat(route);
}

/* Users Routes */

router.get(getRoutePath(routes.getUsers), (req, res) => {
  const users = databaseHelper.getUsers();
  res.status(200).json(users);
});

router.post(getRoutePath(routes.getUser), (req, res) => {
  const body = req.body;
  const resultMessage = databaseHelper.getUser(body.username, body.password);
  res.status(200).json(resultMessage);
});
router.post(getRoutePath(routes.insertUser), (req, res) => {
  const body = req.body;
  const resultMessage = databaseHelper.insertUser(body.username, body.password, body.email);
  res.status(200).json(resultMessage);
});

router.post(getRoutePath(routes.changeUserName), (req, res) => {
  const body = req.body;
  const resultMessage = databaseHelper.updateUserName(body.username, body.password, body.newValue);
  res.status(200).json(resultMessage);
});

router.post(getRoutePath(routes.changeUserPassword), (req, res) => {
  const body = req.body;
  const resultMessage = databaseHelper.updateUserPassword(body.username, body.password, body.newValue);
  res.status(200).json(resultMessage);
});

router.post(getRoutePath(routes.changeUserEmail), (req, res) => {
  const body = req.body;
  const resultMessage = databaseHelper.updateUserEmail(body.username, body.password, body.newValue);
  res.status(200).json(resultMessage);
});

router.post(getRoutePath(routes.removeUser), (req, res) => {
  const body = req.body;
  const resultMessage = databaseHelper.removeUser(body.username, body.password);
  res.status(200).json(resultMessage);
});

/* User Password List Routes */

router.post(getRoutePath(routes.addPasswordItem), (req, res) => {
  const body = req.body;
  const resultMessage = databaseHelper.addPasswordItem(body.username, body.password, body.newPassword);
  res.status(200).json(resultMessage);
});

router.post(getRoutePath(routes.updatePasswordItem), (req, res) => {
  const body = req.body;
  const resultMessage = databaseHelper.updatePasswordItem(body.username, body.password, body.index, body.newPassword);
  res.status(200).json(resultMessage);
});

router.post(getRoutePath(routes.removePasswordItem), (req, res) => {
  const body = req.body;
  const resultMessage = databaseHelper.removePasswordItem(body.username, body.password, body.index);
  res.status(200).json(resultMessage);
});

module.exports = router;
