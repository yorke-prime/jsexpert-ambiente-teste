const { readFile } = require('fs/promises');
const { join } = require('path');
const User = require('./User')
const  { error } = require('../constants/erros')
const DEFAULT_OPTION = {
  maxLines: 3,
  fields: ["id", "name", "profession", "age"]
}; 


class File {
  static async csvToJson(filePath) {
    const content = await File.getFileContent(filePath);
    const validation = File.isValid(content);
    if (!validation.valid) throw new Error(validation.error)

    const users = File.parseCSVToJSON(content)
    return  users;
  }

  static async getFileContent(filePath) {
    console.log('path', filePath);
    return (await readFile(filePath)).toString("utf8")
  }

  static isValid(csvString, options = DEFAULT_OPTION) {
    const [header, ...fileWithoutHeader] = csvString.split(/\r?\n/)
    const isHeaderValid = header === options.fields.join(',')
    if (!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false
      }
    }
    
    const isContentLengAccepted = (
      fileWithoutHeader.length > 0 &&
      fileWithoutHeader.length <= options.maxLines
    )
    if(!isContentLengAccepted) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false
      }
    }

    return { valid: true };
  }

  static parseCSVToJSON(csvString) {
    const lines = csvString.split(/\r?\n/);
    const firstLine = lines.shift();
    const header = firstLine.split(',')
    const users = lines.map(line => {
      const columns = line.split(',')
      let user = {}
      for(const index in columns) {
        user[header[index]] = columns[index]
      }
      return new User(user)
    })
    return users;
  }
}  

module.exports = File;