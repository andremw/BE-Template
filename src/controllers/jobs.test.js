const { getUnpaid } = require('./jobs');

describe('Jobs integration tests', () => {
  describe('getUnpaid', () => {
    it('calls res.json with a list of unpaid jobs for a contractor', async () => {
      const profile = {
        type: 'contractor',
        id: 10,
      };

      const jobList = [{}, {}];

      const findAll = jest.fn(async () => jobList)

      const req = {
        app: {
          get: () => ({
            Contract: {},
            Job: {
              findAll,
            },
          })
        },
        profile,
      };

      const res = {
        json: jest.fn(),
      }

      await getUnpaid(req, res)

      expect(findAll).toHaveBeenCalledWith(
        // TODO: assert parameters
        expect.any(Object)
      )
      expect(res.json).toHaveBeenCalledWith(jobList)
    });
  });
});