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
        ['controller', `${baseFolder}/interfaces/rest/${aggregateUpperName}RestController.java`],
        ['commandservice', `${baseFolder}/application/internal/commandservices/${aggregateUpperName}CommandService.java`],
        ['queryservice', `${baseFolder}/application/internal/queryservices/${aggregateUpperName}QueryService.java`],
        ['assembler', `${baseFolder}/interfaces/rest/transform/Create${aggregateUpperName}CommandDTO${componentUpperName}.java`],
        ['dto', `${baseFolder}/interfaces/rest/dto/Create${aggregateUpperName}Resource.java`],
        ['entity', `${baseFolder}/domain/model/aggregates/${aggregateUpperName}.java`],
        ['createid', `${baseFolder}/domain/model/aggregates/Create${aggregateUpperName}Id.java`],
        ['createcommand', `${baseFolder}/domain/model/commands/Create${aggregateUpperName}Command.java`],
        ['valueobject', `${baseFolder}/domain/model/valueobjects/${aggregateUpperName}BaseInfo.java`],
        ['repository', `${baseFolder}/domain/service/${aggregateUpperName}Repository.java`],
        ['jparepository', `${baseFolder}/infrastructure/repositories/jpa/${aggregateUpperName}JPARepository.java`]
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

async function generateFiles(packageName, aggregateName, baseFolder) {

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
            resolve(true);
        } catch (e) {
            reject(e.message);
        }

    });
}

function createFolders(packageName, aggregateName) {
    return new Promise(function(resolve, reject) {
        try {
            makeFolder('./src/main');
            makeFolder('./src/main/java');

            let packageLayer = packageName.split('.');
            let folderName = [];
            packageLayer.forEach(packageName => {
                folderName.push(packageName);
                makeFolder(`./src/main/java/${folderName.join('/')}`)
            });

            makeFolder(`./src/main/java/${folderName.join('/')}/${aggregateName}`);
            makeFolder(`./src/main/java/${folderName.join('/')}/${aggregateName}/interfaces`);
            makeFolder(`./src/main/java/${folderName.join('/')}/${aggregateName}/interfaces/rest`);
            makeFolder(`./src/main/java/${folderName.join('/')}/${aggregateName}/interfaces/rest/transform`);
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
            resolve(`./src/main/java/${folderName.join('/')}/${aggregateName}`);
        } catch (e) {
            reject(e.message);
        }
    });
}

module.exports.generateStructure = async (aggregateName, packageName) => {
    const baseFolder = await createFolders(packageName, aggregateName);
    await generateFiles(packageName, aggregateName, baseFolder);
}