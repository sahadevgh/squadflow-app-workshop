import { Router } from 'express';
import { getAllTasks, getTaskById, createTask, updateTask, deleteTask, getAllLearners, getLearnerById, createLearner, getLearnerProgress, getDashboardSummary, } from './db.js';
const router = Router();
function getParamId(value) {
    return Array.isArray(value) ? value[0] : value;
}
// ============ TASKS ENDPOINTS ============
// GET /api/tasks - List all tasks with optional filtering
router.get('/tasks', (req, res) => {
    const tasks = getAllTasks();
    // Optional filtering by status
    const status = req.query.status;
    if (status) {
        const filtered = tasks.filter((t) => t.status === status);
        return res.json(filtered);
    }
    res.json(tasks);
});
// GET /api/tasks/:id - Get single task
router.get('/tasks/:id', (req, res) => {
    const task = getTaskById(getParamId(req.params.id));
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
});
// POST /api/tasks - Create new task
router.post('/tasks', (req, res) => {
    const { title, description, assignedTo, priority, dueDate } = req.body;
    if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
    }
    const task = createTask({
        title,
        description,
        status: 'todo',
        assignedTo: assignedTo || [],
        priority: priority || 'medium',
        dueDate: dueDate || '',
    });
    res.status(201).json(task);
});
// PUT /api/tasks/:id - Update task
router.put('/tasks/:id', (req, res) => {
    const task = updateTask(getParamId(req.params.id), req.body);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
});
// DELETE /api/tasks/:id - Delete task
router.delete('/tasks/:id', (req, res) => {
    const id = getParamId(req.params.id);
    const deleted = deleteTask(id);
    if (!deleted) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ success: true, id });
});
// ============ LEARNERS ENDPOINTS ============
// GET /api/learners - List all learners
router.get('/learners', (req, res) => {
    const learners = getAllLearners();
    res.json(learners);
});
// GET /api/learners/:id - Get single learner
router.get('/learners/:id', (req, res) => {
    const learner = getLearnerById(getParamId(req.params.id));
    if (!learner) {
        return res.status(404).json({ error: 'Learner not found' });
    }
    res.json(learner);
});
// GET /api/learners/:id/progress - Get learner progress with task stats
router.get('/learners/:id/progress', (req, res) => {
    const progress = getLearnerProgress(getParamId(req.params.id));
    if (!progress) {
        return res.status(404).json({ error: 'Learner not found' });
    }
    res.json(progress);
});
// POST /api/learners - Create new learner
router.post('/learners', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }
    const learner = createLearner({
        name,
        email,
        tasksCompleted: 0,
        tasksAssigned: 0,
    });
    res.status(201).json(learner);
});
// ============ DASHBOARD ENDPOINTS ============
// GET /api/dashboard/summary - Get dashboard summary statistics
router.get('/dashboard/summary', (req, res) => {
    const summary = getDashboardSummary();
    res.json(summary);
});
export default router;
