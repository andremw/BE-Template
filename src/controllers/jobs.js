const Op = require('sequelize/lib/operators')
const { reject, isNil } = require('ramda')

const withoutEmptyProps = reject(isNil);

const getIdsFromProfile = (profile) => {
  const { id, type } = profile;
  const clientId = type === 'client' ? id : null
  const contractorId = type === 'contractor' ? id : null

  return { clientId, contractorId };
};

const getUnpaid = async (req, res) => {
  const { Contract, Job } = req.app.get('models')

  const { clientId: ClientId, contractorId: ContractorId } = getIdsFromProfile(req.profile);
  const contractWhere = withoutEmptyProps({
    ClientId,
    ContractorId,
    status: 'in_progress'
  })

  const jobs = await Job
    .findAll({
      where: {
        paid: {
          [Op.not]: true
        },
      },
      include: [{
        model: Contract,
        attributes: [],
        where: contractWhere,
      }]
    });

  if (!jobs) return res.status(404).end()
  res.json(jobs)
};

module.exports = {
  getUnpaid
};