{
  "name": "crud-generator",
  "version": "1.0.0",
  "description": "html code generator for create form edit form and list view with edit and delete buttons",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon ."
  },
  "keywords": [
  "html",
  "crud",
  "generator"
  ],
  "author": "Nassor Anzuann",
  "license": "MIT",
  "dependencies": {
    "@octokit/rest": "^16.0.1",
    "chalk": "^2.4.1",
    "clear": "^0.1.0",
    "clui": "^0.3.6",
    "commander": "^2.19.0",
    "configstore": "^4.0.0",
    "figlet": "^1.2.1",
    "inquirer": "^6.2.0",
    "lodash": "^4.17.11",
    "minimist": "^1.2.0",
    "nodemon": "^1.18.6",
    "simple-git": "^1.107.0",
    "touch": "^3.1.0",
    "write-pkg": "^3.2.0"
  },
  "bin": {
    "crud": "./app.js"
  },
  "crud-config": {
    "template":{
     "name": "template",
     "path": "/../sample-template/",
     "contentSectionName": "{app.template.content}",
     "buttonSectionName": "{app.template.button}",
     "titleSectionName": "{app.template.title}"
   }

 }
}
