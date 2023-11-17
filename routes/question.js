// Npm Packages
const express = require('express');
const router = express.Router();

// Controllers
const { 
    createQuestion,  
    getQuestionById,
    getAllQuestions,
    updateQuestionById,
    deleteQuestionById,
    searchQuestionsByDifficulty,
    searchQuestionsBySubject
} = require('../controllers/questionController');

// Routes for /api/questions

router.post('/create', createQuestion);

router.get('/get/:id', getQuestionById);

router.get('/getAll', getAllQuestions);

router.put('/update/:id', updateQuestionById);

router.delete('/delete/:id', deleteQuestionById);

router.post('/searchByDifficulty', searchQuestionsByDifficulty);

router.post('/searchBySubject', searchQuestionsBySubject);

module.exports = router;