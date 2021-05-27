
const getProfile = async (req, res, next) => {
    const {Profile} = req.app.get('models')

    // TODO: improve this code to look for a more reliable authentication id
    const profileId = req.headers.profile_id;

    const profile = await Profile.findOne({where: {id: profileId || 0}})
    if(!profile) return res.status(401).end()
    req.profile = profile
    next()
}
module.exports = {getProfile}
