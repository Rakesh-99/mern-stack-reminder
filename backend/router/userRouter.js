import express from 'express';
const router = express.Router();
import { addSignupUser, loginUser } from '../controller/userController';


router.post('/signup', addSignupUser);
router.post('/login', loginUser);



export default router;