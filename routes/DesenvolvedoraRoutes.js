import express from 'express';

const router = express.Router();

import DesenvolvedoraController from '../controllers/DesenvolvedoraController.js'

const controle = new DesenvolvedoraController();

const caminhobase = 'desenvolvedora/'

router.get('/' + caminhobase + 'add', controle.openAdd)

router.post('/' + caminhobase + 'add', controle.add)

router.get('/' + caminhobase + 'lst', controle.list)

router.post('/' + caminhobase + 'lst', controle.find)

router.get('/' + caminhobase + 'edt/:id', controle.openEdt)


export default router
