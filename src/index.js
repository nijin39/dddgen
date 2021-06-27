#!/usr/bin/env node

const fs = require('fs');
const generateDirectory = require('./generate-structure');

const { program } = require('commander');
program
    .version('0.0.1')
    .option('-p, --package <package>', 'package name')
    .option('-a, --aggregate <aggregates...>', 'aggregate name comma separated list', commaSeparatedList)
    .parse();

function commaSeparatedList(value, dummyPrevious) {
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
        console.log("코드를 만들도록 하겠습니다.");
        await createFolderStructure(options.aggregate, options.package);

    } else {
        console.error("src 상위 폴더에서 명령을 실행해주세요...");
    }
}

main().then(() => console.log("Success!!!"));