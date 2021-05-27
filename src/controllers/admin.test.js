const { getBestProfession } = require('./admin');

describe('Admin integration tests', () => {
  describe('getBestProfession', () => {
    it('calls res.json with the best profession data from contractors', async () => {
      const findAll = jest.fn(async () => ({
        profession: 'painter'
      }))

      const req = {
        app: {
          get: () => ({
            Contract: {},
            Profile: {
              findAll,
            },
          })
        },
        query: {
          start: null,
          end: null,
        }
      };

      const res = {
        json: jest.fn(),
      }

      await getBestProfession(req, res)

      expect(findAll).toHaveBeenCalledWith(
        // TODO: assert parameters. this would not be necessary if we decoupled the controller from the ORM.
        // we can do it by passing a higher order function responsible for calling the ORM
        // but in JS this code would be a little bit harder to reason about because of its lack of types
        expect.any(Object)
      )
      expect(res.json).toHaveBeenCalledWith({
        profession: 'painter',
      })
    });
  });
});