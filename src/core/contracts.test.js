const { getContractById } = require('./contracts');

describe('Core - Contracts', () => {
    it('calls fetchContract passing contract id and clientId for profile of type "client"', async () => {
      const profile = {
        id: 1,
        type: 'client'
      };

      const contractId = 10;

      const contract = {
        id: 10,
        ClientId: 1,
        ContractorId: 6
      };

      const fetchContract = jest.fn(() => contract);

      const result = await getContractById(fetchContract)(contractId, profile);

      expect(result).toBe(contract);
      expect(fetchContract).toHaveBeenCalledWith(expect.objectContaining({
        id: 10,
        clientId: 1,
      }));
    });

    it('calls fetchContract passing contract id and contractorId for profile of type "contractor"', async () => {
      const profile = {
        id: 6,
        type: 'contractor'
      };

      const contractId = 10;

      const contract = {
        id: 10,
        ClientId: 1,
        ContractorId: 6
      };

      const fetchContract = jest.fn(() => contract);

      const result = await getContractById(fetchContract)(contractId, profile);

      expect(result).toBe(contract);
      expect(fetchContract).toHaveBeenCalledWith(expect.objectContaining({
        id: 10,
        contractorId: 6,
      }));
    });
});