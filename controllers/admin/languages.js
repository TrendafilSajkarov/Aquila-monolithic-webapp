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

// @desc      Edit language - get form
// @route     GET  /admin/:languageCode/edit
// @access    Protected
exports.getEditLanguage = async (req, res, next) => {
  try {
    let language = await Language.findById(req.params);
    res.render('admin/editLanguage', { language });
  } catch (err) {
    console.log(err);
  }
};

// @desc      Edit language
// @route     PUT  /admin/:languageCode/edit
// @access    Protected
exports.editLanguage = async (req, res, next) => {
  try {
    const { nameInEnglish, languageCode, nativeName } = req.body;
    const slug = slugify(nameInEnglish, { lower: true });
    await Language.findByIdAndUpdate(
      req.params._id,
      { ...req.body, slug },
      { new: true, runValidators: true }
    );
    res.redirect('/admin');
  } catch (err) {
    console.log(err);
  }
};

// @desc      Delete Language and all of its content
// @route     DELETE  /admin/:languageCode
// @access    Protected
exports.deleteLanguage = async (req, res, next) => {
  try {
    const language = await Language.findById(req.params._id);
    language.remove();
    res.redirect('/admin');
  } catch (err) {
    console.log(err);
  }
};
