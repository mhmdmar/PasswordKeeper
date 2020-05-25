import * as express from "express";
import * as routes from "../../../AppSettings/Routes.json";
import {databaseHelperSQL} from "./databaseHelper";
export const router = express.Router();
router.get("/", (req: express.Request, res: express.Response) => {
    res.status(200).json("Nothing to show");
});

/* Users Routes */

router.get(routes.getUsers, async (req: express.Request, res: express.Response) => {
    const permission = req.query.permission;
    const result = await databaseHelperSQL.getUsers(permission);
    res.status(result.status).json(result.responseMessage);
});

router.post(routes.getUser, async (req: express.Request, res: express.Response) => {
    const body = req.body;
    const result = await databaseHelperSQL.getUser(body.email, body.password);
    res.status(result.status).json(result.responseMessage);
});

router.post(routes.insertUser, async (req: express.Request, res: express.Response) => {
    const body = req.body;
    const result = await databaseHelperSQL.insertUser(
        body.username,
        body.password,
        body.email,
        body.passwordsList
    );
    res.status(result.status).json(result.responseMessage);
});

router.post(routes.updateUser, async (req: express.Request, res: express.Response) => {
    const body = req.body;
    const result = await databaseHelperSQL.updateUser(body.email, body.newUser);
    res.status(result.status).json(result.responseMessage);
});

router.post(routes.removeUser, async (req: express.Request, res: express.Response) => {
    const body = req.body;
    const result = await databaseHelperSQL.removeUser(body.email);
    res.status(result.status).json(result.responseMessage);
});

/* User Password List Routes */

router.post(
    routes.addPasswordItem,
    async (req: express.Request, res: express.Response) => {
        const body = req.body;
        const result = await databaseHelperSQL.addPasswordItem(
            body.username,
            body.password,
            body.newPassword
        );
        res.status(result.status).json(result.responseMessage);
    }
);

router.post(
    routes.updatePasswordItem,
    async (req: express.Request, res: express.Response) => {
        const body = req.body;
        const result = await databaseHelperSQL.updatePasswordItem(
            body.username,
            body.password,
            body.newPassword
        );
        res.status(result.status).json(result.responseMessage);
    }
);

router.post(
    routes.removePasswordItem,
    async (req: express.Request, res: express.Response) => {
        const body = req.body;
        const result = await databaseHelperSQL.removePasswordItem(
            body.username,
            body.password,
            body.id
        );
        res.status(result.status).json(result.responseMessage);
    }
);
