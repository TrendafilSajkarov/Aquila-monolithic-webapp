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

// @desc      Create new Language
// @route     POST  /admin/
// @access    Protected
exports.createLanguage = async (req, res, next) => {
  try {
    await Language.create(req.body);
    res.redirect(req.get('referer'));
  } catch (err) {
    console.log(err);
  }
};

// @desc      Get single language
// @route     GET  /admin/:languageCode
// @access    Protected
exports.getSingleLanguage = async (req, res, next) => {
  try {
    let language = await Language.findOne(req.params);
    language = language.populate({
      path: 'categories',
      match: { category: undefined },
    });
    res.render('admin/language', { language });
  } catch (err) {
    console.log(err);
  }
};
