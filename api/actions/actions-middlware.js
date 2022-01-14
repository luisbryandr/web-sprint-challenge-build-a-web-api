const Actions = require('./actions-model');

async function validateActionsId(req, res, next) {
    try {
        const action = await Actions.get(req.params.id)
        if (!action) {
            res.status(404).json({ message: 'action not found' })
        } else {
            req.action = action;
            next()
        }
    }
    catch (err) {
        res.status(500).json({
            message: 'problem finding this action'
        })
    }
}

function validateAction(req, res, next) {
    const { project_id, description, notes } = req.body;
    if (!project_id || !description || !notes) {
        res.status(400).json({ message: "missing required fields" })
    } else {
        req.project_id = project_id;
        req.description = description;
        req.notes = notes;
        next()
    }
}

function validateUpdatedAction(req, res, next) {
    if (!req.body.hasOwnProperty('completed')) {
        res.status(400).json({ message: "missing required fields" })
    } else {
        next()
    }
}

module.exports = {
    validateActionsId,
    validateAction,
    validateUpdatedAction
}