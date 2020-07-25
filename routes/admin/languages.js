const express = require('express');
const {
  getAllLanguages,
  getSingleLanguage,
  createLanguage,
  // deleteLanguage,
  // getAllCategories
} = require('../../controllers/admin/languages');

const router = express.Router();

router.route('/').get(getAllLanguages).post(createLanguage);

router.route('/:languageCode').get(getSingleLanguage);
//   .delete(deleteLanguage);

module.exports = router;
