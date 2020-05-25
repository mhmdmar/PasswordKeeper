import * as express from "express";
import * as routes from "../../../AppSettings/Routes.json";
import {databaseHelperSQL} from "./databaseHelper";
export const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json("Nothing to show");
});

/* Users Routes */

router.get(routes.getUsers, async (req, res) => {
    const permission = req.query.permission;
    const result = await databaseHelperSQL.getUsers(permission);
    res.status(result.status).json(result.responseMessage);
});

router.post(routes.getUser, async (req, res) => {
    const body = req.body;
    const result = await databaseHelperSQL.getUser(body.email, body.password);
    res.status(result.status).json(result.responseMessage);
});

router.post(routes.insertUser, async (req, res) => {
    const body = req.body;
    const result = await databaseHelperSQL.insertUser(
        body.username,
        body.password,
        body.email,
        body.passwordsList
    );
    res.status(result.status).json(result.responseMessage);
});

router.post(routes.updateUser, async (req, res) => {
    const body = req.body;
    const result = await databaseHelperSQL.updateUser(body.email, body.newUser);
    res.status(result.status).json(result.responseMessage);
});

router.post(routes.removeUser, async (req, res) => {
    const body = req.body;
    const result = await databaseHelperSQL.removeUser(body.email);
    res.status(result.status).json(result.responseMessage);
});

/* User Password List Routes */

router.post(routes.addPasswordItem, async (req, res) => {
    const body = req.body;
    const result = await databaseHelperSQL.addPasswordItem(
        body.username,
        body.password,
        body.newPassword
    );
    res.status(result.status).json(result.responseMessage);
});

router.post(routes.updatePasswordItem, async (req, res) => {
    const body = req.body;
    const result = await databaseHelperSQL.updatePasswordItem(
        body.username,
        body.password,
        body.newPassword
    );
    res.status(result.status).json(result.responseMessage);
});

router.post(routes.removePasswordItem, async (req, res) => {
    const body = req.body;
    const result = await databaseHelperSQL.removePasswordItem(
        body.username,
        body.password,
        body.id
    );
    res.status(result.status).json(result.responseMessage);
});

router.post(routes.getPasswordsList, async (req, res) => {
    const body = req.body;
    const result = await databaseHelperSQL.getPasswords(
        body.username,
        body.password,
        body.startRange,
        body.endRange
    );
    res.status(result.status).json(result.responseMessage);
});
