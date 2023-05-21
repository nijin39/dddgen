#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const generateDirectory = require("./generate-structure");

const { program } = require("commander");
program
  .version("0.1.0")
  .requiredOption("-p, --package <package>", "package name")
  .requiredOption(
    "-a, --aggregate <aggregates...>",
    "aggregate name comma separated list",
    commaSeparatedList
  )
  .parse();

function commaSeparatedList(value) {
  return value.split(",");
}

async function createFolderStructure(aggregates, packageName) {
  for (const aggregate of aggregates) {
    await generateDirectory.generateStructure(aggregate, packageName);
  }
}

function addDependency() {
  const filePath = "./build.gradle";

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Failed to read the build.gradle file:", err);
      return;
    }

    const newDependencies = `
        implementation 'io.springfox:springfox-swagger2:2.9.2'
        implementation 'io.springfox:springfox-swagger-ui:2.9.2'
    `;

    const modifiedData = data.replace(
      /dependencies\s*{([\s\S]*?)}/,
      `dependencies {$1${newDependencies}}`
    );

    fs.writeFile(filePath, modifiedData, (err) => {
      if (err) {
        console.error("Failed to write the build.gradle file:", err);
        return;
      }
      console.log("build.gradle file has been updated successfully!");
    });
  });
}

function dockerFileCopy() {
  const sourcePath = "/files/Dockerfile";
  const destinationPath = "./Dockerfile";

  fs.readFile(__dirname + sourcePath, "utf8", (err, data) => {
    if (err) {
      console.error("Failed to read the Dockerfile:", err);
      return;
    }

    fs.writeFile(destinationPath, data, (err) => {
      if (err) {
        console.error("Failed to write the Dockerfile:", err);
        return;
      }
      console.log("Dockerfile has been copied successfully!");
    });
  });
}

async function main() {
  program.parse(process.argv);
  const options = program.opts();

  if (fs.existsSync("./src")) {
    console.log("Let's generate a code!!!");
    await createFolderStructure(options.aggregate, options.package);
  } else {
    console.error(
      'You have to run this command in the parent folder of "src".'
    );
  }

  console.log("Copy Docker File Copy");
  dockerFileCopy();
  addDependency();
}

main().then(() => console.log("Finished....!!!"));
