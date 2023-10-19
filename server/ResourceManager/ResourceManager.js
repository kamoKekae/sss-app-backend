const configuration  = require('./config.js');// Configurations class


// Resource Manager is a singleton
let instance;

class ResourceManager {
  constructor() {
    if (instance) {
      throw new Error("New instance cannot be created!!");
    }
    instance = configuration.express();
    

    // Additional Configurations - Middleware
    instance.use(configuration.express.json());// configure express server to parse requests with json payloads    
    // instance.use(configuration.express.urlencoded());

    // Set Up Routers
    const checkListRouter = require('./router_checklist.js');
    instance.use(checkListRouter);

    instance.listen(configuration.PORT, () => console.log(`listening on port ${configuration.PORT}`));
    
  }    
}

let ResourceManagerInstance = Object.freeze(new ResourceManager());
module.exports = {ResourceManagerInstance};

