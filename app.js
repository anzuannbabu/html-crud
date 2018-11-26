#!/usr/bin/env node

// dependencies
var helpers = require('./lib/helpers');
var files = require('./lib/files');
var clear = require('clear');
var chalk = require('chalk');
var figlet = require('figlet');
var inquirer  = require('./lib/inquirer');
var config  = require('./lib/config');
var program = require('commander');










clear();

console.log(
	chalk.yellow(
		figlet.textSync('HTML CRUD', { horizontalLayout: 'full' })
		)
	);

var run = async (layout_name) => {
	var crud = await inquirer.askGithubCredentials();
	//console.log(crud.module_name);
	var module_name = crud.module_name;
	var fields = JSON.parse(crud.fields);
	
	//console.log(fields);
	helpers.getTemplate(layout_name,function(err,str){
		if(!err){

			// var fields = [
			// {
			// 	name:'Document Name',
			// 	type: 'text'
			// },
			// {
			// 	name:'Version',
			// 	type: 'text'
			// },
			// {
			// 	name:'Document Description',
			// 	type: 'textarea'
			// },

			// ];
			helpers.crudList(str,module_name,fields,function(err,data){
				if(!err) {
					//console.log(data);
				} else {
					console.log(err);
				}
			});
			helpers.crudCreateForm(str,module_name,fields,function(err,data){
				if(!err) {
					//console.log(data);
				} else {
					console.log(err);
				}
			});
			helpers.crudEditForm(str,module_name,fields,function(err,data){
				if(!err) {
					//console.log(data);
				} else {
					console.log(err);
				}
			});
			helpers.crudView(str,module_name,fields,function(err,data){
				if(!err) {
					//console.log(data);
				} else {
					console.log(err);
				}
			});

		} else {
			console.log(err);
		}
	});
}

// initialize console app
// program.version('1.0.0','-V --version')
// .option('-c,--config <option> [value]','config source template and dist dir for the created crud files')
// .parse(process.argv);

// create make command
// program
// .command('make')
// .alias('m')
// .description('Make crud [index,view,create and edit forms]')
// .action(function(){
// 	console.log('sample command');
// });

// create config command
program
.command('config [type]')//type of confif either template path, template name and dist dir
.alias('c')
.description('Configure template and dist dir path')
.option('-p,--path <path_name>','Path of the file or dir')
.option('-n,--name <template_name>','Name of the template without .html extenstion')
.option('-s,--status','Get the status of the configuration')
.action(function(ConfigType,args){
	if(ConfigType==="template" && args.path!==undefined){
		//console.log(args.path);
		config.setTemplatePath(args.path);
	}
	else if(ConfigType==="template" && args.name!==undefined){
		//console.log(args.name);
		config.setTemplateName(args.name);
	}
	else if(ConfigType==="dist" && args.path!==undefined){
		//console.log(args.path);
		config.setDistPath(args.path);
	}
	else if(args.status!==undefined){
		config.config_status();
	}
	
});

// create make command
program
.command('make')
.alias('m')
.description('Make crud views')
.action(function(){
	run(config.template.path+"\\"+config.template.name);
});

program.parse(process.argv);



var config = () => {
	var config = inquirer.askTemplatePath();

}


// if(program.make){
// 	run();
// }

// if(program.config){
// 	console.log(program.config);
// }

// ge the template
