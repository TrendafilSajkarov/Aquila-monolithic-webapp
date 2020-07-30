const express = require('express');
const {
  getAllLanguages,
  getSingleLanguage,
  createLanguage,
  getEditLanguage,
  editLanguage,
  deleteLanguage,
  // getAllCategories
} = require('../../controllers/admin/languages');

const router = express.Router();

router.route('/').get(getAllLanguages).post(createLanguage);

router.route('/:languageCode').get(getSingleLanguage);

router.route('/:_id/edit').get(getEditLanguage).put(editLanguage);
router.route('/:_id/delete').delete(deleteLanguage);

module.exports = router;
