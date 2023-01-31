const Service = require('../../service/swapi');
const sinon = require('sinon');
const { deepStrictEqual } = require('assert');
const BASE_URL_1 = "https://swapi.dev/api/planets/1/"
const BASE_URL_2 = "https://swapi.dev/api/planets/2/"
const mocks = {
  tatooine: require('../../files/mocks/tatooine.json'),
  alderaan: require('../../files/mocks/alderaan.json')
}

;
(async () => {
  // vai para internet
  /* {
    const service = new Service();
    const withoutStub = await service.makeRequest(BASE_URL_2)
    console.log(JSON.stringify(withoutStub));
  } */

  const service = new Service()
  const stub = sinon.stub(service, service.makeRequest.name)

  stub
    .withArgs(BASE_URL_1)
    .resolves(mocks.tatooine)
  stub
    .withArgs(BASE_URL_2)
    .resolves(mocks.alderaan)

  {
    const experted = {
      "name": "Tatooine",
      "surfaceWater": "1",
      appearedIn: 5
    }

    const results = await service.getPlanets(BASE_URL_1)
    deepStrictEqual(results, experted)
  }
  {
    const experted = {
      "name": "Alderaan",
      "surfaceWater": "40",
      appearedIn: 2
    }

    const results = await service.getPlanets(BASE_URL_2)
    deepStrictEqual(results, experted)
  }
}) ()