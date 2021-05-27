const getContractById = (fetchContract) => async (contractId, profile) => {
  const { id, type } = profile;
  const clientId = type === 'client' ? id : null
  const contractorId = type === 'contractor' ? id : null

  return fetchContract({ id: contractId, clientId, contractorId });
};

const getContracts = (fetchContracts) => async (profile) => {
  const { id, type } = profile;
  const clientId = type === 'client' ? id : null
  const contractorId = type === 'contractor' ? id : null

  return fetchContracts({ clientId, contractorId })
};

module.exports = {
  getContractById,
  getContracts,
}