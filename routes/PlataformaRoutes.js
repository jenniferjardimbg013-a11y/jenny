import express from 'express'
import PlataformaController from '../controllers/PlataformaController.js'

const router = express.Router()

const controller = new PlataformaController()

router.get('/plataforma/add', controller.openAdd)

router.post('/plataforma/add', controller.add)

router.get('/plataforma/lst', controller.list)

router.post('/plataforma/lst', controller.find)

router.get('/plataforma/edt/:id', controller.openEdt)

router.post('/plataforma/edt/:id', controller.edt)

router.get('/plataforma/del/:id', controller.del)

export default router