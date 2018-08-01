// TODO - this should be `blazeplate-generator`
const generator = require('./generator')

// Invoke generator directly with the ToDo List example
new generator({
  appconfig: require('blazeplate_generator/examples/todo-list.json'),
  buildId: 'app_5acfeea85535afdb753d55f7'
}).write()