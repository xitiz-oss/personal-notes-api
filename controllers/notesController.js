const fs = require('fs');
const path = require('path');

const notesFilePath = path.join(__dirname, '../data/notes.json');



// Utility function to read and write notes data
const readNotes = () => {
    const data = fs.readFileSync(notesFilePath, 'utf-8');
    return JSON.parse(data);
};

const writeNotes = (notes) => {
    fs.writeFileSync(notesFilePath, JSON.stringify(notes, null, 2), 'utf-8');
};

// Controller Methods
exports.getAllNotes = (req, res) => {
    const notes = readNotes();
    res.json(notes);
};

exports.getNoteById = (req, res, next) => {
    const notes = readNotes();
    const note = notes.find(note => note.id === parseInt(req.params.id));

    if (!note) {
        return next(new Error('Note not found'));
    }

    res.json(note);
};

exports.addNote = (req, res) => {
    const notes = readNotes();
    const newNote = {
        id: notes.length ? notes[notes.length - 1].id + 1 : 1,
        title: req.body.title,
        content: req.body.content
    };

    notes.push(newNote);
    writeNotes(notes);

    res.status(201).json(newNote);
};

exports.updateNote = (req, res, next) => {
    const notes = readNotes();
    const noteIndex = notes.findIndex(note => note.id === parseInt(req.params.id));

    if (noteIndex === -1) {
        return next(new Error('Note not found'));
    }

    notes[noteIndex] = { ...notes[noteIndex], ...req.body };
    writeNotes(notes);

    res.json(notes[noteIndex]);
};

exports.deleteNote = (req, res, next) => {
    const notes = readNotes();
    const noteIndex = notes.findIndex(note => note.id === parseInt(req.params.id));

    if (noteIndex === -1) {
        return next(new Error('Note not found'));
    }

    notes.splice(noteIndex, 1);
    writeNotes(notes);

    res.status(204).send();
};
