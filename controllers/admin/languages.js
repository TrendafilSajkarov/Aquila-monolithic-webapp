const Language = require('../../models/Language');
const Category = require('../../models/Category');
const ISO6391 = require('iso-639-1');

const slugify = require('slugify');

// @desc      Get all Languages
// @route     GET  /admin/
// @access    Protected
exports.getAllLanguages = async (req, res, next) => {
  try {
    let query;
    query = Language.find({});
    query = query.sort('-createdAt');

    // Executing query
    const languages = await query;
    res.render('admin/index', { languages });
  } catch (err) {
    console.log(err);
  }
};
