const { error } = require('../../constants/erros');
const File = require('../../class/File');
const { rejects, deepStrictEqual } = require('assert');
;
(async () => {
  /* {
    const filePath = '../../files/emptyFile-invalid.csv';
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result, rejection);
  } */
  {
    const filePath = './../../files/threeItems-valid.csv';
    const result = File.csvToJson(filePath)
    const expected = [
      {
        "id":123,
        "name":"Franciel",
        "profession":"Javascript Specialist",
        "birthDay":1995
      },
      {
        "id":321,
        "name":"Xuxa da silva",
        "profession":"Javascript Specialist",
        "birthDay":1940
      },
      {
        "id":231,
        "name":"Joaozinho",
        "profession":"Java Developer",
        "birthDay": 1990
      }
     ]

     deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))

  }
}) ()