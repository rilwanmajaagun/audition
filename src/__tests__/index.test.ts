import request from 'supertest';
import app from '../index';

describe('Audition', () => {
  describe('Base url', () => {
    it('should call base url', async () => {
      const { body } = await request(app).get('/api/v1/');
      expect(body.status).toEqual('success');
      expect(body.message).toEqual('Thanks for dropping by');
      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('message');
    });
  });

  describe('get Phase and phases', () => {
    it('should return all phases', async () => {
      const { body } = await request(app).get('/api/v1/phases');
      expect(body.status).toEqual('success');
      expect(body.message).toEqual('Phases fetched successfully');
      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
      expect(body.data[0]).toHaveProperty('phaseId');
      expect(body.data[0]).toHaveProperty('phaseName');
      expect(body.data[0]).toHaveProperty('status');
      expect(body.data[0]).toHaveProperty('isDone');
      expect(body.data[0]).toHaveProperty('tasks');
    });
    it('should return error if phase id is invalid', async () => {
      const { body } = await request(app).get('/api/v1/phase/10');
      expect(body.status).toEqual('fail');
      expect(body.message).toEqual('Phase not found');
      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('message');
    });
    it('should return a single phase', async () => {
      const { body } = await request(app).get('/api/v1/phase/2');
      expect(body.status).toEqual('success');
      expect(body.message).toEqual('Phase fetched successfully');
      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
      expect(body.data).toHaveProperty('phaseId');
      expect(body.data).toHaveProperty('phaseName');
      expect(body.data).toHaveProperty('status');
      expect(body.data).toHaveProperty('isDone');
      expect(body.data).toHaveProperty('tasks');
    });
  });

  describe('Add new phase', () => {
    it('should return error payload is invalid while adding newPhase', async () => {
      const { body } = await request(app).post('/api/v1/phase').send({
        names: 'final completion stage',
      });
      expect(body.status).toEqual('fail');
      expect(body.message).toEqual('name is required');
      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('message');
    });
    it('should add new phase', async () => {
      const { body } = await request(app).post('/api/v1/phase').send({
        name: 'final completion stage',
      });
      expect(body.status).toEqual('success');
      expect(body.message).toEqual('Phase created successfully');
      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
      expect(body.data).toHaveProperty('phaseId');
      expect(body.data).toHaveProperty('phaseName');
      expect(body.data).toHaveProperty('status');
      expect(body.data).toHaveProperty('isDone');
      expect(body.data).toHaveProperty('tasks');
    });
  });

  describe('add new task', () => {
    it('should return error is phase is already done when adding new task', async () => {
      const { body } = await request(app).post('/api/v1/phase/task').send({
        phaseId: 1,
        taskName: 'design implementation',
      });
      expect(body.status).toEqual('fail');
      expect(body.message).toEqual('Task cannot be added to a completed phase. kindly create a new phase');
      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('message');
    });
    it('should add new task', async () => {
      const { body } = await request(app).post('/api/v1/phase/task').send({
        phaseId: 2,
        taskName: 'design implementation',
      });
      expect(body.status).toEqual('success');
      expect(body.message).toEqual('Task created successfully');
      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
      expect(body.data).toHaveProperty('phaseId');
      expect(body.data).toHaveProperty('phaseName');
      expect(body.data).toHaveProperty('status');
      expect(body.data).toHaveProperty('isDone');
      expect(body.data).toHaveProperty('tasks');
    });
  });

  describe('get task', () => {
    it('should return error if task id is invalid', async () => {
      const { body } = await request(app).get('/api/v1/phase/2/10');
      expect(body.status).toEqual('fail');
      expect(body.message).toEqual('task not found');
      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('message');
    });
    it('should return a single task', async () => {
      const { body } = await request(app).get('/api/v1/phase/2/1');
      expect(body.status).toEqual('success');
      expect(body.message).toEqual('Task fetched successfully');
      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
      expect(body.data).toHaveProperty('taskId');
      expect(body.data).toHaveProperty('taskName');
      expect(body.data).toHaveProperty('isComplete');
    });
  });

  describe('update task status', () => {
    it('should return error if task status is already completed', async () => {
      const { body } = await request(app).put('/api/v1/phase/1/1');
      expect(body.status).toEqual('fail');
      expect(body.message).toEqual('Cannot update completed phase');
      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('message');
    });
    it('should return error if previous phase is not done', async () => {
      const { body } = await request(app).put('/api/v1/phase/3/1');
      expect(body.status).toEqual('fail');
      expect(body.message).toEqual('Previous task must be completed to unlock this phase');
      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('message');
    });
    it('should update task completion status', async () => {
      const { body } = await request(app).put('/api/v1/phase/2/1');
      expect(body.status).toEqual('success');
      expect(body.message).toEqual('Task updated successfully');
      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
      expect(body.data).toHaveProperty('taskId');
      expect(body.data).toHaveProperty('taskName');
      expect(body.data).toHaveProperty('isComplete');
      expect(body.data.isComplete).toEqual(true);
    });
    it('should return error if task is already completed', async () => {
      const { body } = await request(app).put('/api/v1/phase/2/1');
      expect(body.status).toEqual('fail');
      expect(body.message).toEqual('Task already completed');
      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('message');
    });
    it('should unlock next phase is current phase task is all completed', async () => {
      const { body } = await request(app).put('/api/v1/phase/2/2');
      expect(body.status).toEqual('success');
      expect(body.message).toEqual('Task updated successfully');
      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
      expect(body.data).toHaveProperty('taskId');
      expect(body.data).toHaveProperty('taskName');
      expect(body.data).toHaveProperty('isComplete');
      expect(body.data.isComplete).toEqual(true);
    });
    it('should unlock next phase is current phase task is all completed and update current phase to done', async () => {
      const { body } = await request(app).put('/api/v1/phase/2/3');
      expect(body.status).toEqual('success');
      expect(body.message).toEqual('Task updated successfully');
      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
      expect(body.data).toHaveProperty('taskId');
      expect(body.data).toHaveProperty('taskName');
      expect(body.data).toHaveProperty('isComplete');
      expect(body.data.isComplete).toEqual(true);
    });
  });
});
