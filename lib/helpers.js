// dependencies
var path = require('path');
var fs = require('fs');
var config = require('./config');

var helpers = {};
var components_path = path.join(__dirname,'/../sample-template/');
// get string content of the template
helpers.getTemplate = function(templateName,callback){
	templateName = typeof(templateName)=='string' && templateName.length > 0 ? templateName: false;
	if(templateName){
		// var templateDir = path.join(config.template.path+"\\");
		var templateDir = config.template.path+"\\";
		//console.log(templateName); return;
		fs.readFile(templateName+'.html','utf8',function(err,str){
			//console.log(str); return;
			if(!err && str.length > 0){
				callback(false,str);
			} else {
				callback('No template could be found');
			}
		});
	} else {
		callback('Template not found!');
	}
};

// generate create form
helpers.crudCreateForm = function(template,module_name,fields,callback){
	template = typeof(template) == 'string' && template.length > 0 ? template: false;
	fields = Array.isArray(fields) && fields !== null ? fields : [];
	
	helpers.getTemplate(components_path+'form',function(err,formTemplate){
		if(!err) {
			if(fields && template && formTemplate){

			//generate input for each fields
			var formInputs = generateFormInputs(fields);
			formTemplate = formTemplate.replace('{form.content}',formInputs);
			formTemplate = formTemplate.replace('{form.action}',module_name+'_view.html');

			template = template.replace(config.template.contentSectionName,formTemplate);
			template = template.replace(config.template.titleSectionName,'Create '+module_name);
			var create_btn = '<a href="'+module_name+'_index.html" class="btn btn-primary btn-sm">View '+module_name+' List</a>';
			template = template.replace(config.template.buttonSectionName,create_btn);
			//save the file into output folder
			var create_view = createView(module_name+'_create.html',template);
			if(create_view){
				callback(false,'Create Form view created successfully.');
			} else {
				callback(create_view);
			}
			

		} else {
			callback('Could not read the data');
		}

	}  else {

		callback(err);
	}
});
}


// generate create form
helpers.crudEditForm = function(template,module_name,fields,callback){
	template = typeof(template) == 'string' && template.length > 0 ? template: false;
	fields = Array.isArray(fields) && fields !== null ? fields : [];
	
	helpers.getTemplate(components_path+'form',function(err,formTemplate){
		if(!err) {
			if(fields && template && formTemplate){

			//generate input for each fields
			var formInputs = generateFormInputs(fields,'edit');
			formTemplate = formTemplate.replace('{form.content}',formInputs);
			formTemplate = formTemplate.replace('{form.action}',module_name+'_view.html');

			template = template.replace(config.template.contentSectionName,formTemplate);
			template = template.replace(config.template.titleSectionName,'Update '+module_name);
			var create_btn = `<a href="`+module_name+`_view.html" class="btn btn-success btn-sm">View `+module_name+` Details</a>\n`;
			create_btn += `<a href="`+module_name+`_index.html" class="btn btn-primary btn-sm">View `+module_name+` List</a>\n`;
			template = template.replace(config.template.buttonSectionName,create_btn);
			//save the file into output folder
			var create_view = createView(module_name+'_edit.html',template);
			if(create_view){
				callback(false,'Edit Form view created successfully.');
			} else {
				callback(create_view);
			}
			

		} else {
			callback('Could not read the data');
		}

	}  else {

		callback(err);
	}
});
}

// generate view
helpers.crudView = function(template,module_name,fields,callback){
	template = typeof(template) == 'string' && template.length > 0 ? template: false;
	fields = Array.isArray(fields) && fields !== null ? fields : [];
	
	helpers.getTemplate(components_path+'table',function(err,tableTemplate){
		if(!err) {
			if(fields && template && tableTemplate){

			//generate show single module details view
			
			var singleViewDetails = '<table class="table table-striped">\n';
			fields.forEach(function(field){
				singleViewDetails += '<tr>\n';
				singleViewDetails += '<th>'+field.name+'</th>\n';
				singleViewDetails += '<td>'+field.name+' value</td>\n';
				singleViewDetails += '</tr>\n';
			});
			singleViewDetails+='</table>\n';
			
			template = template.replace(config.template.contentSectionName,singleViewDetails);
			template = template.replace(config.template.titleSectionName,'View '+module_name+' Details');
			var create_btn = `<a href="`+module_name+`_edit.html" class="btn btn-warning btn-sm">Edit `+module_name+` Details</a>\n`;
			create_btn += `<a href="`+module_name+`_index.html" class="btn btn-primary btn-sm">View `+module_name+` List</a>\n`;
			
			template = template.replace(config.template.buttonSectionName,create_btn);
			//save the file into output folder
			var create_view = createView(module_name+'_view.html',template);
			if(create_view){
				callback(false,'Display single data details view created successfully.');
			} else {
				callback(create_view);
			}
			

		} else {
			callback('Could not read the data');
		}

	}  else {

		callback(err);
	}
});
}

// generate list
helpers.crudList = function(template,module_name,fields,callback){
	template = typeof(template) == 'string' && template.length > 0 ? template: false;
	fields = Array.isArray(fields) && fields !== null ? fields : [];
	
	helpers.getTemplate(components_path+'table',function(err,tableTemplate){
		if(!err) {
			if(fields && template && tableTemplate){

			//find and replace for table template
			var find = '{table.headings}';
			var replace = generateTableHeader(fields);
			tableTemplate = tableTemplate.replace(find,replace);
			var rows = generateTableRows(module_name,fields,10);
			tableTemplate = tableTemplate.replace('{table.rows}',rows);
			// find and replace for main template
			template = template.replace(config.template.contentSectionName,tableTemplate);
			template = template.replace(config.template.titleSectionName,module_name);
			var create_btn = '<a href="'+module_name+'_create.html" class="btn btn-primary btn-sm">Create '+module_name+'</a>';
			template = template.replace(config.template.buttonSectionName,create_btn);
			

			//save the file into output folder
			var create_view = createView(module_name+'_index.html',template);
			if(create_view){
				callback(false,'list view create successfully.');
			} else {
				callback(create_view);
			}
			

		} else {
			callback('Could not read the data');
		}

	}  else {

		callback(err);
	}
});
	
	
}

function generateTableHeader(fields){
	var headerString = '<tr>\n';

	headerString += '<th>SN</th>\n';
	fields.forEach(function(field){
		headerString += '<th>'+field.name+'</th>\n';

	});
	headerString += '<th class="text-center">Actions</th>\n';
	headerString += '</tr>\n';

	return headerString;
}

function generateFormInputs(fields,edit){
	var formInputs = '';
	fields.forEach(function(field){
		if(field.type==='text' || field.type==='password' || field.type==='checkbox' || field.type==='radio'  || field.type==='email'){
			//generate input based on specific type
			formInputs += getInput(field.name,field.type,edit);

		} else if(field.type === 'textarea'){
			//generate textarea field
			formInputs += getInput(field.name,"textarea",edit);
		} else {
			//generate normal text box
			formInputs += getInput(field.name,"text",edit);
		}
	});

	return formInputs;
}

function getInput(fieldName,fieldType,edit){
	var value = edit==='edit'?fieldName+' value':'';
	if(fieldType==='textarea') {
		return `<div class="form-group">
		<label for="`+fieldName+`">`+fieldName+`</label>
		<textarea name="`+fieldName+`" id="`+fieldName+`" class="form-control" rows="5" placeholder="Type `+fieldName+` here...">`+value+`</textarea>
		</div>\n`;
	} 
	var className = fieldType==='radio' || fieldType==='checkbox'?'':'form-control';
	return `<div class="form-group">
	<label for="`+fieldName+`">`+fieldName+`</label>
	<input type="`+fieldType+`" name="`+fieldName+`" id="`+fieldName+`" class="`+className+`" value="`+value+`">
	</div>\n`;
}

function generateTableRows(module_name,fields,number_rows){
	number_rows = typeof(number_rows)=='number' && number_rows > 0? number_rows : 5;
	var rowDataString = '';
	var rows = '';
	for(i=0;i< number_rows;i++){
		var sn = i+1;
		rowDataString = '<tr>\n';
		rowDataString += '<td>'+sn+'</td>\n';
		fields.forEach(function(field){
			
			rowDataString += '<td>'+field.name+'_value</td>\n';
		});
		rowDataString += `<td class="text-center">
		<div class="btn-group btn-group-sm">
		<a href="`+module_name+`_view.html" class="btn btn-primary btn-sm">View</a>
		<a href="`+module_name+`_edit.html" class="btn btn-warning btn-sm">Edit</a>
		<a href="#" class="btn btn-danger btn-sm">Delete</a>
		</div>
		</td>`;
		rowDataString += '</tr>\n';

		rows += rowDataString;
	}

	return rows;
}

function createView(viewName,viewString){
	var distDir = path.join(config.dist.destination+"\\");
	if(!fs.existsSync(distDir)) fs.mkdirSync(distDir);
	fs.writeFile(distDir+viewName,viewString,function(err,response){
		if(!err) {
			console.log(viewName+" created successfully");
		} else  {
			console.log(err);
		}
	});
}



module.exports = helpers;