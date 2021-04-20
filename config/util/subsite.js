const Subsite = ['home', 'blog'];
const BUILD_SUBSITE = Subsite.find((s) => s === process.env.SUBSITE) || 'home';
module.exports = { BUILD_SUBSITE, SUBSITES: Subsite };
