const Sequelize = require('sequelize');
const { reject, isNil } = require('ramda')

const { getContractById, getContracts } = require('../core/contracts');

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

const get = async (req, res) => {
  const { Contract } = req.app.get('models')

  const findNonTerminatedContracts = ({ clientId, contractorId }) => {
    const where = withoutEmptyProps({
      ClientId: clientId,
      ContractorId: contractorId,
      status: {
        [Sequelize.Op.ne]: 'terminated'
      },
    })

    return Contract.findAll({
      where
    })
  };

  const contracts = await getContracts(findNonTerminatedContracts)(req.profile)

  if (!contracts) return res.status(404).end()
  res.json(contracts)
};

module.exports = {
  getById,
  get,
};