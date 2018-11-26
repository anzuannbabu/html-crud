//package.js of the main app
var pkg  = require(__dirname+'/../package');
var writePkg = require('write-pkg'); 



// console.log(pkg);
// configuration file
var config = {};

config.template = {
	name: pkg.crudConfig.template.name,
	path: pkg.crudConfig.template.path,
	contentSectionName: pkg.crudConfig.template.contentSectionName,
	buttonSectionName: pkg.crudConfig.template.buttonSectionName,
	titleSectionName: pkg.crudConfig.template.titleSectionName
};


config.dist = {
	destination: pkg.crudConfig.destination
};

config.setTemplateName = function(name){
	name = typeof(name) == 'string' && name.length > 0?name: false;
	if(!name) {
		console.log("Please enter the valid template name");
		return;
	}
	pkg.crudConfig.template.name = name;
	config.write("template name has been configured\n");
}

config.setTemplatePath = function(path){
	path = typeof(path) == 'string' && path.length > 0?path: false;
	if(!path){ 
		console.log("Please enter the valid template path");
		return;
	}
	pkg.crudConfig.template.path = path;
	config.write("template path has been configured\n");
}

config.setDistPath = function(path){
	path = typeof(path) == 'string' && path.length > 0?path: false;
	if(!path) {
		console.log("Please enter the valid destination folder path");
		return;
	}
	pkg.crudConfig.destination = path;
	config.write("Output dist folder has been configured\n");
}

config.config_status = function(){
	console.log("*****   Crud config status *****\n");
	console.log('Template Name : ',config.template.name);
	console.log('Template Path : ',config.template.path);
	console.log('Title Section Name : ',config.template.titleSectionName);
	console.log('Content Section Name : ',config.template.contentSectionName);
	console.log('Button Section Name : ',config.template.buttonSectionName);
	console.log('Dist Folder Path : ',config.dist.destination);
	console.log("\n*****  END *****");
}

config.write = function(return_msg){
	(async () => {
		await writePkg(pkg);
		console.log(return_msg);
	})();
}





module.exports = config;