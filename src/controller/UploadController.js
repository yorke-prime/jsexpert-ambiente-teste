const File = require('../class/File');
const { join } = require('path');
const { readFile, unlink } = require('fs/promises');
module.exports = {
  async uploadFile(req, res) {
    try {
      console.log(__dirname);
      const diretorio = `../projeto1/src/uploads/${req.file.filename}`;
      const test = join(__dirname, diretorio);
      const result = await File.csvToJson(diretorio)
      await unlink(test, (err) => {
        console.log('erro ao deletar: ', err);
      });
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
    return res.send('Arquivo salvo');
  }
}