const { get, getById } = require('./contracts');

describe('Contracts integration tests', () => {
  describe('get', () => {
    it('calls res.json with a list of contracts of a contractor', async () => {
      const profile = {
        type: 'contractor',
        id: 10,
      };

      const contractsList = [{}];

      const findAll = jest.fn(async () => contractsList)

      const req = {
        app: {
          get: () => ({
            Contract: {
              findAll
            },
          })
        },
        profile,
      };

      const res = {
        json: jest.fn(),
      }

      await get(req, res)

      expect(findAll).toHaveBeenCalledWith(
        // TODO: assert parameters
        expect.any(Object)
      )
      expect(res.json).toHaveBeenCalledWith(contractsList)
    });
  });

  describe('getById', () => {
    it.todo('calls res.json with a specific contract from a client')
  })
});