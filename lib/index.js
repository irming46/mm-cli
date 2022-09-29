
const createProject = require('./create-project.js')
const getProjects = require('./project-list')
const addProject = require('./add')
const upgradeProject = require('./upgrade')
const removeProject = require('./remove-project')

module.exports = {
  createProject,
  addProject,
  upgradeProject,
  removeProject,
  getProjects
}