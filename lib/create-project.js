'use strict'
const clear = require('clear')
const inquirer = require('inquirer')
const ora = require('ora')
const handlebars = require('handlebars')
const fs = require('fs')
const chalk = require('chalk')
const { getProjectData } = require('../utils')

const spinner = ora()

function createProject(program) {
  program.command('create <project>').description('new project').action(async name => {
    const config = await getProjectData()

    clear()
    const answer = inquirer.prompt([
      {
        name: "projectName",
        type: "list",
        message: "请选择你的目标模板",
        choices: Object.keys(config),
      }
    ])

    spinner.start()
    spinner.text = "正在下载中，请稍等片刻...";

    const { url, branch } = config[answer.projectName];
    const cloneCmd = `git clone -b ${branch} ${url} ${name}`;
    await execFn(cloneCmd, spinner);

    // 覆写模板项目中的{{name}}
    const meta = {
      name: projectName,
    };
    const content = fs.readFileSync(`${projectName}/package.json`).toString();
    const result = handlebars.compile(content)(meta);
    fs.writeFileSync(`${projectName}/package.json`, result);
    // 删除模板中的 .git 文件
    removeDir(`${projectName}/.git`);
    // git init
    let gitInitCmd = `git -C ./${projectName} init`;
    await execFn(gitInitCmd);
    // git add . && git commit
    const gitCommitCmd = `git -C ./${projectName} add . && git -C ./${projectName} commit -m init`;
    await execFn(gitCommitCmd);

    spinner.succeed("下载完成");
    console.log(chalk.cyan(`\n cd ${projectName} && pnpm i \n`));
    process.exit();
  })
}


module.exports = createProject