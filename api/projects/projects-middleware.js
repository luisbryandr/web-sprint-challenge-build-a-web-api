const Projects = require('./projects-model');

async function validateProjectId(req, res, next) {
    try {
        const project = await Projects.get(req.params.id)
        if (!project) {
            res.status(404).json({ message: 'project not found' })
        } else {
            req.project = project;
            next()
        }
    }
    catch (err) {
        res.status(500).json({
            message: 'problem finding project'
        })
    }
}

function validateProject(req, res, next) {
    const { name, description } = req.body;
    if (!name || !description) {
        res.status(400).json({ message: "missing required fields" })
    } else {
        req.name = name;
        req.description = description;
        next()
    }
}
function validateUpdatedProject(req, res, next) {
    if (!req.body.hasOwnProperty('completed')) {
        res.status(400).json({ message: "missing required fields" })
    } else {
        next()
    }
}

module.exports = {
    validateProjectId,
    validateProject,
    validateUpdatedProject
}

