'use strict'

const utils = require('../utils')
const path = require('path')
const chalk = require('chalk')
const clear = require('clear')
const fs = require('fs')
const inquirer = require('inquirer')

function removeProject(program) {
  program
    .command("delete")
    .alias("del")
    .action(async () => {
      const config = await utils.getProjectData();
      clear();

      const { projectName } = await inquirer.prompt([
        {
          name: "projectName",
          type: "input",
          message: "请输入要删除的模板名称:",
          validate: function (value) {
            if (value.trim().length) {
              if (!config.templates[value]) {
                return "模板不存在，请重新输入";
              } else {
                return true;
              }
            } else {
              return "请输入要删除的模板名称";
            }
          },
        },
      ]);
      const data = Object.keys(config).filter(key => key != projectName)?.map(key => config[key])

      fs.writeFile(path.resolve(__dirname, '../config.json'), JSON.stringify(data, null, '/t'), "utf-8", (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(chalk.green("模板已删除!"));
        }
        process.exit();
      });
    });
}

module.exports = removeProject