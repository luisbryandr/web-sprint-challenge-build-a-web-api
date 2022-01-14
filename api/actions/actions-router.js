const router = require('express').Router();
const Actions = require('./actions-model');
const { validateActionsId,
    validateAction,
    validateUpdatedAction
} = require('./actions-middlware');
const { validateProjectId } = require('../projects/projects-middleware');

router.get('/', (req, res, next) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(next)
});

router.get('/:id', validateActionsId, (req, res, next) => {
    res.json(req.action)
});

router.post('/', validateAction, (req, res, next) => {
    Actions.insert(req.body)
        .then(newAction => {
            res.status(201).json(newAction)
        })
        .catch(next)
});

router.put('/:id', validateActionsId, validateAction, validateUpdatedAction, (req, res, next) => {
    Actions.update(req.params.id, req.body)
        .then(updatedAction => {
            res.status(200).json(updatedAction)
        })
        .catch(next)
});

router.delete('/:id', validateProjectId, (req, res, next) => {
    Actions.remove(req.params.id)
        .then(() => {
            res.status(200).json(req.action)
        }).catch(next)
});

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        custom: 'something went wrong in the projects router',
        mesage: err.message,
        stack: err.stack,
    })
});

module.exports = router;