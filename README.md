# html-crud
This is HTML CRUD Generator for rapid application design, created using node js based on Command LIne Interface
This is built on top of Bootstrap to support faster web ui development

# Version
1.0.0

# Install 
  clone project
  go to the project folder
  open CMD and run  npm install -g

# Usage
   Available commands
   1. crud config -s //this show the status of the crud configuration
   2.crud template --name=[your_template_name] //specify the template name you are going to use
   3. crud template --path=[yout_template_path] //specify where the template is located/path
   4. crud dist --path [dist_dir_path] //specidy where your crud html files going to be saved
   5. crud make //this is used to make the crud, it will prompt you to enter the module name and form fields

# Form Fields
  The form fields shoulbe in json format
  example [{"name":"Full Name","type":"text"},{"name":"Email","type":"email"},{"name":"Description","type":"textarea"}]
  if you didn't specify the type of the field it will automatic generate the text field


# Licence
The licence for the prject is  MIT,
Fre to use , modify and redistribute
