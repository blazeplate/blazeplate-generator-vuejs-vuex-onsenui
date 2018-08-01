const Helpers = require('blazeplate_generator/generators/util/helpers')
const BlazeplateGenerator = require('blazeplate_generator/generators/util/generator')

// Import generator classes
const BaseGenerator = require('./base')
const MenuGenerator = require('./menus')
const ComponentGenerator = require('./components')

// // // //

module.exports = class extends BlazeplateGenerator {

  // constructor
  // Sets required input parameters
  constructor(options) {

    // Invokes super
    super(options)

    // // // //
    // TODO - abstract this into helpers.js

    // Global build configuration
    let build = {
      dest: {
        id: '',
        root: null,
        out: '',
        client: {}
      }
    }

    // Assigngs build.app from options
    build.app = options['appconfig']

    // Isolates the buildId
    const buildId = options['buildId']
    build.id = buildId

    // // // //
    // Destination helpers & constants
    // TODO - use this.env.cwd & path library, instead of hardcoded relative path
    build.dest.out = './build/' + buildId + '/'
    build.dest.root = build.dest.out + build.app.identifier + '/'

    //
    // // // //

    // VueJS
    // TODO - move into the Vue generator
    build.dest.client.root = build.dest.root + 'vuejs_client/'
    build.dest.client.src = build.dest.client.root + 'src/'

    // Sets this.options.build
    this.options = { build: Helpers.formatBuild(build) }

    // Returns the generator instance
    return this

  }

  // TODO - integrate into write() method
  async writeBuildManifest (req, buildId) {
    return new Promise((resolve, reject) => {

      // Makes /build/buildId
      this.fs.mkdirSync(__dirname + `/build/${buildId}`)

      // Writes blazeplate.json file
      this.fs.writeFile(__dirname + `/build/${buildId}/blazeplate.json`, JSON.stringify(req.body, null, 2), (err) => {
        if (err) throw err;
        // console.log(`Build ${buildId} manfiest saved`);
        return resolve()
      });

    });

  }

  // TODO - update to conditionally run each generator
  async write () {

    console.log('Starting Blazeplate generate')
    // console.log(this.options)

    // TODO - write build configuration to JSON file
    // await fs.writeFileSync(outputFile, this.options)

    // Creates project build directories
    await this.ensureDir(this.options.build.dest.root)

    // Generates Vue + Onsen app
    await this.composeWith(BaseGenerator)
    await this.composeWith(MenuGenerator)
    await this.composeWith(ComponentGenerator)

    // TODO - implement a more robust logging solution
    console.log('Finished Blazeplate generate')

  }

};