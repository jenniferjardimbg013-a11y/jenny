import express from 'express';
const router = express.Router();
import controller from '../controllers/controller.js'
const controle = new controller();

router.get('/', controle.home)

export default router