const { getContractById, getContracts } = require('./contracts');

describe('Core - Contracts', () => {
  describe('getContractById', () => {
    it('calls fetchContract passing contract id and clientId for profile of type "client"', async () => {
      const profile = {
        id: 1,
        type: 'client'
      };

      const contractId = 10;

      const fetchContract = jest.fn();

      await getContractById(fetchContract)(contractId, profile);

      expect(fetchContract).toHaveBeenCalledWith({
        id: 10,
        clientId: 1,
        contractorId: null,
      });
    });

    it('calls fetchContract passing contract id and contractorId for profile of type "contractor"', async () => {
      const profile = {
        id: 6,
        type: 'contractor'
      };

      const contractId = 10;

      const fetchContract = jest.fn();

      await getContractById(fetchContract)(contractId, profile);

      expect(fetchContract).toHaveBeenCalledWith({
        id: 10,
        contractorId: 6,
        clientId: null,
      });
    });
  });

  describe('getContracts', () => {
    it('calls fetchContracts passing contractorId for profile of type "contractor"', async () => {
      const profile = {
        id: 6,
        type: 'contractor'
      };

      const fetchContracts = jest.fn();

      await getContracts(fetchContracts)(profile)

      expect(fetchContracts).toHaveBeenCalledWith({
        clientId: null,
        contractorId: 6,
      })
    });
  });
});