import express from 'express';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

import JogoController from '../controllers/JogoController.js';

const controle = new JogoController();

const caminhobase = 'jogo/';

router.get('/' + caminhobase + 'add', controle.openAdd);

router.post('/' + caminhobase + 'add', upload.single('capa'), controle.add);

router.get('/' + caminhobase + 'lst', controle.list);

router.post('/' + caminhobase + 'lst', controle.find);

router.get('/' + caminhobase + 'del/:id', controle.del);

router.get('/' + caminhobase + 'edt/:id', controle.openEdt);

router.post('/' + caminhobase + 'edt/:id', upload.single('capa'), controle.edt);

router.get('/' + caminhobase + 'capa/:id', controle.capa);

export default router;