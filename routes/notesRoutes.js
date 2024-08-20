const express = require('express');
const { getAllNotes, getNoteById, addNote, updateNote, deleteNote } = require('../controllers/notesController');
const validateNote = require('../middleware/validation');

const router = express.Router();

router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.post('/', validateNote, addNote);
router.put('/:id', validateNote, updateNote);
router.delete('/:id', deleteNote);

module.exports = router;
