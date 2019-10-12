import express from 'express';
import routes from '../../../AppSettings/Routes';
import { databaseHelper } from '../DatabaseHelper';

export const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json('Nothing to show');
});

/* Users Routes */

router.get(routes.getUsers, (req, res) => {
    const permission = req.query.permission;
    const includePasswords = req.query.includePasswords === 'true';
    const resultMessage = databaseHelper.getUsers(permission, includePasswords);
    res.status(200).json(resultMessage);
});

router.post(routes.getUser, (req, res) => {
    const body = req.body;
    const resultMessage = databaseHelper.getUser(body.username, body.password);
    res.status(200).json(resultMessage);
});
router.post(routes.insertUser, (req, res) => {
    const body = req.body;
    const resultMessage = databaseHelper.insertUser(body.username, body.password, body.email);
    res.status(200).json(resultMessage);
});

router.post(routes.changeUserName, (req, res) => {
    const body = req.body;
    const resultMessage = databaseHelper.updateUserName(body.username, body.password, body.newValue);
    res.status(200).json(resultMessage);
});

router.post(routes.changeUserPassword, (req, res) => {
    const body = req.body;
    const resultMessage = databaseHelper.updateUserPassword(body.username, body.password, body.newValue);
    res.status(200).json(resultMessage);
});

router.post(routes.changeUserEmail, (req, res) => {
    const body = req.body;
    const resultMessage = databaseHelper.updateUserEmail(body.username, body.password, body.newUserValue);
    res.status(200).json(resultMessage);
});

router.post(routes.updateUser, (req, res) => {
    const body = req.body;
    const resultMessage = databaseHelper.updateUser(body.username, body.password, body.newUser, body.index);
    res.status(200).json(resultMessage);
});

router.post(routes.removeUser, (req, res) => {
    const body = req.body;
    const resultMessage = databaseHelper.removeUser(body.index);
    res.status(200).json(resultMessage);
});

/* User Password List Routes */

router.post(routes.addPasswordItem, (req, res) => {
    const body = req.body;
    const resultMessage = databaseHelper.addPasswordItem(body.username, body.password, body.newPassword);
    res.status(200).json(resultMessage);
});

router.post(routes.updatePasswordItem, (req, res) => {
    const body = req.body;
    const resultMessage = databaseHelper.updatePasswordItem(body.username, body.password, body.index, body.newPassword);
    res.status(200).json(resultMessage);
});

router.post(routes.removePasswordItem, (req, res) => {
    const body = req.body;
    const resultMessage = databaseHelper.removePasswordItem(body.username, body.password, body.index);
    res.status(200).json(resultMessage);
});

router.post(routes.getPasswordsList, (req, res) => {
    const body = req.body;
    const resultMessage = databaseHelper.getPasswords(body.username, body.password, body.startRange, body.endRange);
    res.status(200).json(resultMessage);
});
