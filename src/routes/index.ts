import { Router } from 'express';
import AuditionController from '../controller';
import * as validation from '../validations/audition.validation';

const router = Router();

router.get('/phases', AuditionController.getPhases);

router.get('/phase/:phaseId', validation.phaseId, AuditionController.getPhase);

router.post('/phase', validation.addNewPhase, AuditionController.addNewPhase);

router.post('/phase/task', validation.addTask, AuditionController.addTask);

router.get('/phase/:phaseId/:taskId', validation.phaseIdTaskId, AuditionController.getPhaseTask);

router.put('/phase/:phaseId/:taskId', validation.phaseIdTaskId, AuditionController.updateTaskStatus);

export default router;
