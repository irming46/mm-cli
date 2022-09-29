'use strict'

const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const updateNotifier = require('update-notifier')

const TIME = 1000 * 60 * 60 * 24;

function upgradeProject(program) {
  program
    .command("upgrade")
    .alias("u")
    .description("check the sy-prt-cli version.")
    .action(async () => {
      const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../package.json')));
      const notifier = updateNotifier({
        pkg,
        updateCheckInterval: TIME,
      });
      if (notifier.update) {
        console.log(
          `有新版本可用：${chalk.cyan(
            notifier.update.latest
          )}，建议您在使用前进行更新`
        );
        notifier.notify();
      } else {
        console.log(chalk.cyan("已经是最新版本"));
      }
    });
}

module.exports = upgradeProject
