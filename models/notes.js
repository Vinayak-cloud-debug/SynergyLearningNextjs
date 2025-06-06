// models/Notes.js

import mongoose from 'mongoose';

const NotesSchema = new mongoose.Schema({
  SubjectName: {
    type: String,
    required: true,
  },
  Modules: {
    type: Array,
    required: true,
  },
  Sem: {
    type: String,
    required: true,
  },
  SubjectNumber: {
    type: String,
    required: true,
  },
  PYQLink: {
    type: String,
    required: true,
  },
  State: {
    type: Number,
    required: true,
  },
  CIE1: {
    type: String,
    required: true,
  },
  CIE2: {
    type: String,
    required: true,
  },
  CIE3: {
    type: String,
    required: true,
  },
});

// Exporting the model
const Notes = mongoose.models.Notes || mongoose.model('Notes', NotesSchema);
export default Notes;
