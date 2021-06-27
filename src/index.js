#!/usr/bin/env node

const fs = require('fs');
const generateDirectory = require('./generate-structure');

const { program } = require('commander');
program
    .version('0.0.1')
    .requiredOption('-p, --package <package>', 'package name')
    .requiredOption('-a, --aggregate <aggregates...>', 'aggregate name comma separated list', commaSeparatedList)
    .parse();

function commaSeparatedList(value) {
    return value.split(',');
}

async function createFolderStructure(aggregates, packageName) {
    for (const aggregate of aggregates) {
        await generateDirectory.generateStructure(aggregate, packageName);
    }
}

async function main() {

    program.parse(process.argv);
    const options = program.opts();

    if (fs.existsSync("./src")) {
        console.log("Let's generate a code!!!");
        await createFolderStructure(options.aggregate, options.package);

    } else {
        console.error('You have to run this command in the parent folder of "src".');
    }
}

main().then(() => console.log("Success!!!"));