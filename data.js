var filesystem = require('fs');

var classes = [];
var documents = [];

var classesData = filesystem.readFileSync('./jsondata/classes.json');
var documentsData = filesystem.readFileSync('./jsondata/documents.json');

JSON.parse(classesData.toString()).forEach(function (element) {
  classes.push(element);
});

JSON.parse(documentsData.toString()).forEach(function (element) {
  documents.push(element);
});

module.exports.classes = classes;
module.exports.documents = documents;

module.exports.findDocument = function (name) {
  return documents.filter(function (doc) {
    return doc.title.toLowerCase() == name.toLowerCase() || doc.description.toLowerCase().search(name.toLowerCase()) >= 0;
  });
}

module.exports.findClass = function (name) {
  return classes.filter(function (clazz) {
    return clazz.class.toLowerCase() == name.toLowerCase() || clazz.class_rank.toLowerCase() == name.toLowerCase();
  });
}