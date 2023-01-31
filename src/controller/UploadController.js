const File = require('../class/File');
const { join } = require('path');
const { readFile, unlink } = require('fs/promises');
const ServiceApi = require('../service/swapi');
module.exports = {
  async uploadFile(req, res) {
    try {
      console.log(__dirname);
      const diretorio = `../uploads/${req.file.filename}`;
      const test = join(__dirname, diretorio);
      console.log('test:', test);
      const result = await File.csvToJson(test)
      await unlink(test, (err) => {
        console.log('erro ao deletar: ', err);
      });
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
    return res.send('Arquivo salvo');
  },
  async consumirApi(req, res) {
    const dados = await new ServiceApi().makeRequest("https://swapi.dev/api/planets/1/")
    console.log('dados', dados);
    return res.send('consumido');
  }
}