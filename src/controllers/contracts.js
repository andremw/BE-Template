const { reject, isNil } = require('ramda')
const { getContractById } = require('../core/contracts');

const withoutEmptyProps = reject(isNil);

const getById = async (req, res) => {
  const { Contract } = req.app.get('models')

  const fetchContract = ({ id, clientId, contractorId }) => {
    const where = withoutEmptyProps({
      id,
      ClientId: clientId,
      ContractorId: contractorId,
    });

    return Contract.findOne({
      where,
    })
  };

  const contract = await getContractById(fetchContract)(req.params.id, req.profile);

  if (!contract) return res.status(404).end()
  res.json(contract)
};

module.exports = {
  getById,
};