'use strict'
const { getProjectData } = require('../utils/index')
const inquirer = require('inquirer')
const clear = require('clear')
const chalk = require('chalk')
const fs = require('fs')

// 新增模板
function addProject(program){
  program
    .command("add")
    .alias("a")
    .description("add a new project")
    .action(async () => {
      clear();
      const config = await getProjectData();
      // 创建一个对话框
      const answer = await inquirer.prompt([
        {
          name: "projectName",
          type: "input",
          message: "请输入模板名称:",
          validate(value) {
            if (value.trim().length) {
              const valid = config[value]
                ? "模板已存在，请重新输入"
                : true;
              return valid;
            } else {
              return "请输入模板名称";
            }
          },
        },
        {
          name: "gitLink",
          type: "input",
          message: "请输入模板项目地址:",
          validate: function (value) {
            if (value.trim().length) {
              return true;
            } else {
              return "请输入模板项目地址";
            }
          },
        },
        {
          name: "branch",
          type: "input",
          message: "请输入分支名称:",
          validate: function (value) {
            if (value.trim().length) {
              return true;
            } else {
              return "请输入分支名称";
            }
          },
        },
      ]);
      const { projectName, gitLink, branch } = answer;
      config[projectName] = {};
      // 过滤unicode字符
      config[projectName].url = gitLink.replace(
        /[\u0000-\u0019]/g,
        ""
      );
      config[projectName].branch = branch;
      // 写入模板
      fs.writeFile("./config.json", JSON.stringify(config,null,'/t'), "utf-8", (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(chalk.green("新模板添加成功！\n"));
        }
        process.exit();
      });
    });
}

module.exports = addProject