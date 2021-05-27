const { Op, col, fn } = require('sequelize')

const getBestProfession = async (req, res) => {
  const { start, end } = req.query;
  const { Profile, Job } = req.app.get('models')

  const bestProfession = await Profile
    .findAll({
        attributes: ['profession'],
        where: {
            type: 'contractor'
        },
        include: [{
            association: 'Contractor',
            attributes: [],

            // NOTE: considering that the range of dates that the contractor worked is related to the
            // date of the creation of the contract
            // should we consider the paymentDate instead?
            where: {
              createdAt: {
                [Op.and]: {
                  // TODO: add validation for start and end
                  [Op.gte]: start,
                  [Op.lte]: end
                }
              }
            },
            include: [{
                model: Job,
                attributes: [],
                where: {
                    paid: true
                }
            }]
        }],
        group: 'profession',
        order: [
            [fn('SUM', col('price')), 'DESC']
        ],
        subQuery: false,
        limit: 1
    })

  if (!bestProfession) return res.status(404).end()
  res.json(bestProfession)
};

module.exports = {
  getBestProfession,
};