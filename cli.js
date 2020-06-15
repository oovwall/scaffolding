#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const ejs = require('ejs')

const data = {
  resourceDomain: 'https://v4.bootcss.com'
}

inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'Website name?'
  }
]).then(answers => {
  const tmplDir = path.join(__dirname, 'templates')
  const destDir = process.cwd()
  fs.readdir(tmplDir, (err, files) => {
    if (err) throw err
    files.forEach(file => {
      ejs.renderFile(path.join(tmplDir, file), { ...answers, ...data }, (err, result) => {
        fs.writeFileSync(path.join(destDir, file), result)
      })
    })
  })
})
