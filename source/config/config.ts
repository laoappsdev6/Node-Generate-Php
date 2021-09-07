export enum EDB {
    host = 'localhost',
    user = 'root',
    pass = '',
    name = 'goodjob',
    character = 'utf8'
}

export enum EDirectory {
    project = 'testFramwork',
    api = 'api',
    controllers = 'controllers',
    models = 'models',
    config = 'config',
    services = 'services',
    image = 'image',
    documents = 'documents',
}

export enum Epath {
    // pathProject = 'C:\\xampp8\\htdocs\\',
    pathProject = 'D:\\project\\Test Project\\node\\MyFramwork\\',
    pathJwt = '../asset/jwt/',
    pathPhp = '../asset/php/',
}

export enum Efile {
    login = 'login.api.php',
    loginMo = 'login.model.php',
    authorize = 'authorize.controller.php',
    config = 'config.php',
    database = 'databasePDO.controller.php',
    validCon = 'validate.controller.php',
    validMo = 'validate.model.php',

    jwt = 'jwt.php',
    request = 'request.php',
    service = 'services.php',
    vendor = 'vendor'

}