'use strict'
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')
const chalk = require('chalk')

function createFn(cmd,spnner){
  return new Promise((resolve) => {
    exec(cmd, (error) => {
      if (error) {
        console.log("发生了一个错误：", chalk.red(JSON.stringify(error)));
        spinner.fail("下载失败");
        process.exit();
      }
      resolve(true);
    });
  });
}

function getProjectData(){
  return require('../config.json')
}

function removeDir(dir){
  let files = fs.readdirSync(dir); //返回一个包含“指定目录下所有文件名称”的数组对象
  for (var i = 0; i < files.length; i++) {
    let newPath = path.join(dir, files[i]);
    let stat = fs.statSync(newPath);
    if (stat.isDirectory()) {
      removeDir(newPath); //判断是否是文件夹，如果是文件夹就递归下去
    } else {
      fs.unlinkSync(newPath); //删除文件
    }
  }
  fs.rmdirSync(dir); //如果文件夹是空的，就将自己删除掉
}

module.export = {
  createFn,
  getProjectData,
  removeDir
}