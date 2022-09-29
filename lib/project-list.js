'use strict'

const chalk = require('chalk')
const { getProjectData } = require('../utils')

function getProjects(program){
  program
    .command("list")
    .alias("ls")
    .description("show project list")
    .action(async () => {
      const config = await getProjectData();
      let str = "";

      Object.keys(config).forEach((item, index, array) => {
        if (index === array.length - 1) {
          str += item;
        } else {
          str += `${item} \n`;
        }
      });
      console.log(chalk.cyan(str));
      process.exit();
    });
}

module.exports = getProjects