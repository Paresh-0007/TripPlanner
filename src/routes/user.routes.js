import { Router } from "express";
import { 
    loginUser, 
    registerUser, 
    loggedOutUser, 
    refreshAccessToken, 
    getCurrentUser 
} from "../controllers/user.controller.js"; // Update path to the controllers
import { upload } from "../middlewares/multer.middleware.js"; // Update path to middlewares
import { verifyJWT } from "../middlewares/auth.middleware.js"; // Update path to middlewares

const router = Router();

router.route('/register').post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }
    ]),
    registerUser
);

router.route('/login').post(loginUser);

router.route('/logout').post(verifyJWT, loggedOutUser);

router.route('/refresh-token').post(refreshAccessToken);

router.route('/user-info').get(verifyJWT, getCurrentUser);

export default router;
