const router = require('express').Router();
const Projects = require('./projects-model');
const {
    validateProjectId,
    validateProject,
    validateUpdatedProject
} = require('./projects-middleware');

router.get('/', (req, res, next) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(next)
})

router.get('/:id', validateProjectId, (req, res, next) => {
    res.json(req.project)
})


router.post('/', validateProject, (req, res, next) => {
    Projects.insert(req.body)
        .then(newProject => {
            res.status(201).json(newProject)
        }).catch(next)
})

router.put('/:id', validateProjectId, validateProject, validateUpdatedProject, (req, res, next) => {
    Projects.update(req.params.id, req.body)
        .then(updatedProject => {
            res.status(200).json(updatedProject)
        }).catch(next)
})

router.delete('/:id', validateProjectId, (req, res, next) => {
    Projects.remove(req.params.id)
        .then(() => {
            res.status(200).json(req.project)
        })
        .catch(next)
})

router.get('/:id/actions', validateProjectId, (req, res, next) => {
    Projects.getProjectActions(req.params.id)
        .then(actions => {
            res.json(actions)
        })
        .catch(next)
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        custom: 'something went wrong in the projects router',
        mesage: err.message,
        stack: err.stack,
    })
})

module.exports = router;

