import { resolve } from 'node:path'
import inquirer from 'inquirer'
import fs from 'fs-extra'

const questions = [
  {
    type: 'checkbox',
    name: 'filesToCreate',
    message: 'Which files do you want to create?',
    choices: [
      { name: '.editorconfig' },
      { name: '.gitignore' },
    ],
  },
]

function removeLeadingDot(str: string) {
  if (str.startsWith('.'))
    return str.slice(1)
  return str
}

inquirer.prompt(questions).then((answers) => {
  const { filesToCreate } = answers

  filesToCreate.forEach((file: string) => {
    fs.copy(resolve(__dirname, `./templates/${removeLeadingDot(file)}`), `./${file}`, (err) => {
      if (err)
        console.error(err)
      else
        // eslint-disable-next-line no-console
        console.log(`${file} created successfully!`)
    })
  })
})
