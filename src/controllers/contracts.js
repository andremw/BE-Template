const Sequelize = require('sequelize');
const { reject, isNil } = require('ramda')

const withoutEmptyProps = reject(isNil);

const getIdsFromProfile = (profile) => {
  const { id, type } = profile;
  const clientId = type === 'client' ? id : null
  const contractorId = type === 'contractor' ? id : null

  return { clientId, contractorId };
};

const getById = async (req, res) => {
  const { Contract } = req.app.get('models')

  const { clientId: ClientId, contractorId: ContractorId } = getIdsFromProfile(req.profile);

  const where = withoutEmptyProps({
    id: req.params.id,
    ClientId,
    ContractorId,
  });

  const contract = await Contract.findOne({
    where,
  })

  if (!contract) return res.status(404).end()
  res.json(contract)
};

const get = async (req, res) => {
  const { Contract } = req.app.get('models')

  const { clientId: ClientId, contractorId: ContractorId } = getIdsFromProfile(req.profile);

  const where = withoutEmptyProps({
    ClientId,
    ContractorId,
    status: {
      [Sequelize.Op.ne]: 'terminated'
    },
  })

  const contracts = await Contract.findAll({
    where
  })

  if (!contracts) return res.status(404).end()
  res.json(contracts)
};

module.exports = {
  getById,
  get,
};