const Question = require('../models/Question');
const logger = require('../logger');

/**
 * @route POST api/question/create
 * @desc Create a question
 * @body question, subject, topic, difficulty, marks
 * @return question
 */
async function createQuestion(req, res) {
    try {
        const { question, subject, topic, difficulty, marks } = req.body;
        logger.info('Creating a question');

        const newQuestion = new Question({
            question,
            subject,
            topic,
            difficulty,
            marks
        });

        const questionCreated = await newQuestion.save();

        logger.info('Question created successfully: ', questionCreated);
        res.status(200).json(questionCreated);
    } catch (error) {
        logger.error('Error in creating a question: ', error);
        res.status(500).json({ msg: 'Error in creating a question' });
    }
}

/**
 * @route POST api/question/createMany
 * @desc Create many questions
 * @body questions
 * @return questions
 */
async function createManyQuestions(req, res) {
    const questions = req.body;
    logger.info('Creating multiple questions');

    try {
        const questionsCreated = await Question.insertMany(questions);

        logger.info('Questions created successfully');
        res.status(200).json(questionsCreated);
    }
    catch (error) {
        logger.error('Error in creating questions: ', error);
        res.status(500).json({ msg: 'Error in creating questions' });
    }
}

/**
 * @route GET api/question/get/:id
 * @desc Get a question by id
 * @param id
 * @return question
 */
async function getQuestionById(req, res) {
    logger.info('Retrieving a question by id');
    try {
        const question = await Question.findById(req.params.id);

        if (!question) {
            logger.error('Question not found');
            return res.status(404).json({ msg: 'Question not found' });
        }

        logger.info('Question retrieved successfully: ', question);
        res.status(200).json(question);
    } catch (error) {
        logger.error('Error in retrieving a question: ', error);
        res.status(500).json({ msg: 'Error in retrieving a question' });
    }
}

/**
 * @route GET api/question/getAll
 * @desc Get all questions
 * @return questions
 */
async function getAllQuestions(req, res) {
    logger.info('Retrieving all questions');
    try {
        const questions = await Question.find();

        if (!questions) {
            logger.error('Questions not found');
            return res.status(404).json({ msg: 'Questions not found' });
        }

        logger.info('Questions retrieved successfully: ', questions);
        res.status(200).json(questions);
    } catch (error) {
        logger.error('Error in retrieving questions: ', error);
        res.status(500).json({ msg: 'Error in retrieving questions' });
    }
}

/**
 * @route PUT api/question/update/:id
 * @desc Update a question by id
 * @param id
 * @body question, subject, topic, difficulty, marks
 * @return question
 */
async function updateQuestionById(req, res) {
    logger.info('Updating a question by id');
    try {
        const { question, subject, topic, difficulty, marks } = req.body;

        const questionToUpdate = await Question.findById(req.params.id);

        if (!questionToUpdate) {
            logger.error('Question not found');
            return res.status(404).json({ msg: 'Question not found' });
        }

        if (question) {
            questionToUpdate.question = question;
        }

        if (subject) {
            questionToUpdate.subject = subject;
        }

        if (topic) {
            questionToUpdate.topic = topic;
        }

        if (difficulty) {
            questionToUpdate.difficulty = difficulty;
        }

        if (marks) {
            questionToUpdate.marks = marks;
        }

        const questionUpdated = await questionToUpdate.save();

        logger.info('Question updated successfully: ', questionUpdated);
        res.status(200).json(questionUpdated);
    } catch (error) {
        logger.error('Error in updating a question: ', error);
        res.status(500).json({ msg: 'Error in updating a question' });
    }
}

/**
 * @route DELETE api/question/delete/:id
 * @desc Delete a question by id
 * @param id
 * @return question
 */
async function deleteQuestionById(req, res) {
    logger.info('Deleting a question by id');
    try {
        const questionToDelete = await Question.findById(req.params.id);

        if (!questionToDelete) {
            logger.error('Question not found');
            return res.status(404).json({ msg: 'Question not found' });
        }

        const questionDeleted = await Question.deleteOne({ _id: req.params.id });

        logger.info('Question deleted successfully: ', questionDeleted);
        res.status(200).json(questionDeleted);
    } catch (error) {
        logger.error('Error in deleting a question: ', error);
        res.status(500).json({ msg: 'Error in deleting a question' });
    }
}

/**
 * @route POST api/questions/searchByDifficulty
 * @desc Search questions based on difficulty.
 * @body difficulty
 * @return questions
 */
// @ts-ignore
async function searchQuestionsByDifficulty(req, res) {
    logger.info('Searching questions by difficulty');
    try {
        const { difficulty } = req.body;

        const questions = await Question.find({ difficulty });

        if (!questions) {
            logger.error('Questions not found');
            return res.status(404).json({ msg: 'Questions not found' });
        }

        logger.info('Questions retrieved successfully: ', questions);
        res.status(200).json(questions);
    } catch (error) {
        logger.error('Error in retrieving questions: ', error);
        res.status(500).json({ msg: 'Error in retrieving questions' });
    }
}

/**
 * @route POST api/questions/searchBySubject
 * @desc Search questions based on subject.
 * @body subject
 * @return questions
 */
async function searchQuestionsBySubject(req, res) {
    logger.info('Searching questions by subject');
    try {
        const { subject } = req.body;

        const questions = await Question.find({ subject });

        if (!questions) {
            logger.error('Questions not found');
            return res.status(404).json({ msg: 'Questions not found' });
        }

        logger.info('Questions retrieved successfully: ', questions);
        res.status(200).json(questions);
    } catch (error) {
        logger.error('Error in retrieving questions: ', error);
        res.status(500).json({ msg: 'Error in retrieving questions' });
    }
}

/**
 * @route GET api/question/generateQuestionPaper
 * @desc Generate question paper.
 * @return questions
 */
async function generateQuestionPaper(req, res) {
    try {
        logger.info('Generating question paper');
        const { marks, difficultyDistribution } = req.body;

        // Validate inputs
        if (!isValidDifficultyDistribution(difficultyDistribution)) {
            logger.error('Invalid difficulty distribution');
            return res.status(400).json({ msg: 'Invalid difficulty distribution' });
        }

        const questions = await generateQuestions(marks, difficultyDistribution);

        logger.info('Question paper generated successfully: ', questions);
        res.status(200).json({ questions });
    } catch (error) {
        logger.error('Error in generating question paper: ', error);
        res.status(500).json({ msg: 'Error in generating question paper' });
    }
}


// -----------------------------------------Helper functions --------------------------------------

function isValidDifficultyDistribution(distribution) {
    let totalPercentage = 0;
    logger.info('Validating difficulty distribution');

    for (let i = 0; i < distribution.length; i++) {
        totalPercentage += distribution[i].percentage;
    }

    return totalPercentage === 100;
}

async function generateQuestions(totalMarks, difficultyDistribution) {
    const questions = [];
    logger.info('Generating questions');

    for (let i = 0; i < difficultyDistribution.length; i++) {
        const difficultyMarks = (difficultyDistribution[i].percentage / 100) * totalMarks;
        const questionsByDifficulty = await Question.find({ difficulty: difficultyDistribution[i].difficulty });
        const shuffledQuestions = shuffleArray(questionsByDifficulty);

        questions.push(...selectQuestionsByMarks(shuffledQuestions, difficultyMarks));
    }

    logger.info('Questions generated successfully');
    return questions;
}

function selectQuestionsByMarks(questions, marks) {
    const selectedQuestions = [];
    let remainingMarks = marks;

    logger.info('Selecting questions by marks');

    for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        if (question.marks <= remainingMarks) {
            selectedQuestions.push(question);
            remainingMarks -= question.marks;
        }
    }

    return selectedQuestions;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    logger.info('Array shuffled successfully');
    return array;
}

module.exports = {
    createQuestion,
    createManyQuestions,
    getQuestionById,
    getAllQuestions,
    updateQuestionById,
    deleteQuestionById,
    searchQuestionsByDifficulty,
    searchQuestionsBySubject,
    generateQuestionPaper
};
