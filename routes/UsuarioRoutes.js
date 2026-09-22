import express from 'express';

const router = express.Router();

import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Busca o UsuarioController
import UsuarioController from '../controllers/UsuarioController.js'

const controle = new UsuarioController();

const caminhobase = 'usuario/'

router.get('/' + caminhobase + 'add', controle.openAdd)

router.post('/' + caminhobase + 'add', upload.single('foto'), controle.add)

router.get('/' + caminhobase + 'lst', controle.list)

router.post('/' + caminhobase + 'lst', controle.find)

router.get('/' + caminhobase + 'edt/:id', controle.openEdt)

router.post('/' + caminhobase + 'edt/:id', upload.single('foto'), controle.edt)

router.get('/' + caminhobase + 'foto/:id', controle.foto)

router.get('/' + caminhobase + 'del/:id', controle.del)


export default router