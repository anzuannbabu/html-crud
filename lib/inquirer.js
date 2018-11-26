var inquirer   = require('inquirer');
var files      = require('./files');

module.exports = {

  askGithubCredentials: (layout_name='') => {
    var questions = [
    {
      name: 'module_name',
      type: 'input',
      message: 'Enter crud module name:',
      validate: function( value ) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter crud module name:.';
        }
      }
    },
    {
      name: 'fields',
      type: 'input',
      message: 'Enter your inputs in JSON format',
      validate: function(value) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter form fields.';
        }
      }
    }
    ];
    return inquirer.prompt(questions);
  },


  /*askTemplatePath : () => {
    var questions = [
    {
      name: 'template_path',
      type: 'input',
      message: 'Enter the template path',
      validate: function(value){
        if(value.length){
          return true;
        } else {
          return 'Please enter the template path';
        }
      }
    },
    {
      name: 'dist_path',
      type: 'input',
      message: 'Enter the destination folder path',
      validate: function(value){
        if(value.length){
          return true;
        } else {
          return 'Please enter the destination folder path';
        }
      }
    },

    ];
    return inquirer.prompt(questions);
  },*/

}