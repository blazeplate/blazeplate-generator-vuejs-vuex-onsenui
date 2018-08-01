// TODO - this should be `blazeplate-generator`
let Blazeplate = require('blazeplate_generator/generators/app')

// Invoke Blazeplate directly with the ToDo List example
new Blazeplate({
  appconfig: require('blazeplate_generator/examples/todo-list.json'),
  buildId: 'app_5acfeea85535afdb753d55f7'
}).write()