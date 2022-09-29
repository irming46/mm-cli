#! /usr/bin/env node
'use strict'
const { program } = require('commander')
const myLib = require('./lib')
const { version } = require('./package.json')

// 版本获取
program.version(version,"-V, --version")
myLib.createProject(program)
myLib.getProjects(program)
myLib.addProject(program)
myLib.removeProject(program);
myLib.upgradeProject(program);

if (!program.args.length) {
  program.help();
}


