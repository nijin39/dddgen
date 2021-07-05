const fs = require('fs');
const ejs = require('ejs');

makeFolder = (dir) => {
    if(!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    } else {
        console.log(`${dir} already exists. skip create folder!!`)
    }
}

function generateComponent(packageName, aggregateName, aggregateUpperName, baseFolder, componentName) {

    const componentUpperName = componentName.replace(/\w/, c => c.toUpperCase());

    let componentMap = new Map([
        ['controller', `${baseFolder}/${aggregateName}/interfaces/rest/${aggregateUpperName}RestController.java`],
        ['annotation', `${baseFolder}/${aggregateName}/interfaces/rest/validation/Phone.java`],
        ['validator', `${baseFolder}/${aggregateName}/interfaces/rest/validation/PhoneValidator.java`],
        ['testController', `${baseFolder}/${aggregateName}/interfaces/rest/${aggregateUpperName}RestTestController.java`],
        ['commandservice', `${baseFolder}/${aggregateName}/application/internal/commandservices/${aggregateUpperName}CommandService.java`],
        ['queryservice', `${baseFolder}/${aggregateName}/application/internal/queryservices/${aggregateUpperName}QueryService.java`],
        ['assembler', `${baseFolder}/${aggregateName}/interfaces/rest/transform/Create${aggregateUpperName}CommandDTO${componentUpperName}.java`],
        ['dto', `${baseFolder}/${aggregateName}/interfaces/rest/dto/Create${aggregateUpperName}Resource.java`],
        ['entity', `${baseFolder}/${aggregateName}/domain/model/aggregates/${aggregateUpperName}.java`],
        ['createid', `${baseFolder}/${aggregateName}/domain/model/aggregates/Create${aggregateUpperName}Id.java`],
        ['createcommand', `${baseFolder}/${aggregateName}/domain/model/commands/Create${aggregateUpperName}Command.java`],
        ['valueobject', `${baseFolder}/${aggregateName}/domain/model/valueobjects/${aggregateUpperName}BaseInfo.java`],
        ['repository', `${baseFolder}/${aggregateName}/domain/service/${aggregateUpperName}Repository.java`],
        ['jparepository', `${baseFolder}/${aggregateName}/infrastructure/repositories/jpa/${aggregateUpperName}JPARepository.java`],
        ['apiControllerAdvice', `${baseFolder}/config/ApiControllerAdvice.java`],
    ]);

    fs.readFile(__dirname + `/templates/${componentName}.ejs`, 'utf8', function (err, data) {

        const generatedComponent = ejs.render(data, {
            packageName: packageName,
            aggregateName: aggregateName,
            aggregateUpperName: aggregateUpperName
        });

        const filename = componentMap.get(componentName);

        if (!fs.existsSync(filename)) {
            fs.writeFile(filename, generatedComponent, 'utf8', function (error) {
                if(!error){
                    console.log(`${filename} write end`);
                } else {
                    console.error(`${filename} write error`)
                }
            });
        } else {
            console.log('File already exists!!!');
        }
    });
}

async function generateSourceFiles(packageName, aggregateName, baseFolder) {

    const aggregateUpperName = aggregateName.replace(/\w/, c => c.toUpperCase());

    return new Promise(function(resolve, reject) {
        try {
            generateComponent(packageName, aggregateName, aggregateUpperName, baseFolder, 'controller');
            generateComponent(packageName, aggregateName, aggregateUpperName, baseFolder, 'commandservice');
            generateComponent(packageName, aggregateName, aggregateUpperName, baseFolder, 'queryservice');
            generateComponent(packageName, aggregateName, aggregateUpperName, baseFolder, 'assembler');
            generateComponent(packageName, aggregateName, aggregateUpperName, baseFolder, 'dto');
            generateComponent(packageName, aggregateName, aggregateUpperName, baseFolder, 'entity');
            generateComponent(packageName, aggregateName, aggregateUpperName, baseFolder, 'createid');
            generateComponent(packageName, aggregateName, aggregateUpperName, baseFolder, 'createcommand');
            generateComponent(packageName, aggregateName, aggregateUpperName, baseFolder, 'valueobject');
            generateComponent(packageName, aggregateName, aggregateUpperName, baseFolder, 'repository');
            generateComponent(packageName, aggregateName, aggregateUpperName, baseFolder, 'jparepository');
            generateComponent(packageName, aggregateName, aggregateUpperName, baseFolder, 'apiControllerAdvice');
            generateComponent(packageName, aggregateName, aggregateUpperName, baseFolder, 'annotation');
            generateComponent(packageName, aggregateName, aggregateUpperName, baseFolder, 'validator');
            resolve(true);
        } catch (e) {
            reject(e.message);
        }

    });
}

async function generateTestFiles(packageName, aggregateName, baseFolder) {

    const aggregateUpperName = aggregateName.replace(/\w/, c => c.toUpperCase());

    return new Promise(function(resolve, reject) {
        try {
            console.log("Base :",baseFolder);
            generateComponent(packageName, aggregateName, aggregateUpperName, baseFolder, 'testController');
            resolve(true);
        } catch (e) {
            reject(e.message);
        }

    });
}

function createSoruceBase(packageName) {
    makeFolder('./src/main');
    makeFolder('./src/main/java');

    let packageLayer = packageName.split('.');
    let folderName = [];
    packageLayer.forEach(packageName => {
        folderName.push(packageName);
        makeFolder(`./src/main/java/${folderName.join('/')}`)
    });
    return folderName;
}

function createTestBase(packageName) {
    makeFolder('./src/test');
    makeFolder('./src/test/java');

    let packageLayer = packageName.split('.');
    let folderName = [];
    packageLayer.forEach(packageName => {
        folderName.push(packageName);
        makeFolder(`./src/test/java/${folderName.join('/')}`)
    });
    return folderName;
}

function createFolders(packageName, aggregateName) {
    return new Promise(function(resolve, reject) {
        try {
            const folderName = createSoruceBase(packageName);
            makeFolder(`./src/main/java/${folderName.join('/')}/config`);
            makeFolder(`./src/main/java/${folderName.join('/')}/${aggregateName}`);
            makeFolder(`./src/main/java/${folderName.join('/')}/${aggregateName}/interfaces`);
            makeFolder(`./src/main/java/${folderName.join('/')}/${aggregateName}/interfaces/rest`);
            makeFolder(`./src/main/java/${folderName.join('/')}/${aggregateName}/interfaces/rest/transform`);
            makeFolder(`./src/main/java/${folderName.join('/')}/${aggregateName}/interfaces/rest/validation`);
            makeFolder(`./src/main/java/${folderName.join('/')}/${aggregateName}/interfaces/rest/dto`);
            makeFolder(`./src/main/java/${folderName.join('/')}/${aggregateName}/interfaces/events`);
            makeFolder(`./src/main/java/${folderName.join('/')}/${aggregateName}/application`);
            makeFolder(`./src/main/java/${folderName.join('/')}/${aggregateName}/application/internal`);
            makeFolder(`./src/main/java/${folderName.join('/')}/${aggregateName}/application/internal/commandservices`);
            makeFolder(`./src/main/java/${folderName.join('/')}/${aggregateName}/application/internal/queryservices`);
            makeFolder(`./src/main/java/${folderName.join('/')}/${aggregateName}/application/internal/outboundservices`);
            makeFolder(`./src/main/java/${folderName.join('/')}/${aggregateName}/domain`);
            makeFolder(`./src/main/java/${folderName.join('/')}/${aggregateName}/domain/model`);
            makeFolder(`./src/main/java/${folderName.join('/')}/${aggregateName}/domain/model/aggregates`);
            makeFolder(`./src/main/java/${folderName.join('/')}/${aggregateName}/domain/model/commands`);
            makeFolder(`./src/main/java/${folderName.join('/')}/${aggregateName}/domain/model/events`);
            makeFolder(`./src/main/java/${folderName.join('/')}/${aggregateName}/domain/model/entities`);
            makeFolder(`./src/main/java/${folderName.join('/')}/${aggregateName}/domain/model/valueobjects`);
            makeFolder(`./src/main/java/${folderName.join('/')}/${aggregateName}/domain/service`);
            makeFolder(`./src/main/java/${folderName.join('/')}/${aggregateName}/infrastructure`);
            makeFolder(`./src/main/java/${folderName.join('/')}/${aggregateName}/infrastructure/brokers`);
            makeFolder(`./src/main/java/${folderName.join('/')}/${aggregateName}/infrastructure/brokers/kafka`);
            makeFolder(`./src/main/java/${folderName.join('/')}/${aggregateName}/infrastructure/repositories`);
            makeFolder(`./src/main/java/${folderName.join('/')}/${aggregateName}/infrastructure/repositories/jpa`);

            const testFolderName = createTestBase(packageName);
            makeFolder(`./src/test/java/${testFolderName.join('/')}/${aggregateName}`);
            makeFolder(`./src/test/java/${testFolderName.join('/')}/${aggregateName}/interfaces`);
            makeFolder(`./src/test/java/${testFolderName.join('/')}/${aggregateName}/interfaces/rest`);
            resolve({ sourceBase: `./src/main/java/${folderName.join('/')}`, testBase: `./src/test/java/${testFolderName.join('/')}`});
        } catch (e) {
            reject(e.message);
        }
    });
}

module.exports.generateStructure = async (aggregateName, packageName) => {
    const { sourceBase, testBase } = await createFolders(packageName, aggregateName);
    await generateSourceFiles(packageName, aggregateName, sourceBase);
    await generateTestFiles(packageName, aggregateName, testBase);
}