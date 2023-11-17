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
 * @route GET api/question/get/:id
 * @desc Get a question by id
 * @param id
 * @return question
 */
async function getQuestionById(req, res) {
    try {
        const question = await Question.findById(req.params.id);

        if (!question) {
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
    try {
        const questions = await Question.find();

        if (!questions) {
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
    try {
        const { question, subject, topic, difficulty, marks } = req.body;

        const questionToUpdate = await Question.findById(req.params.id);

        if (!questionToUpdate) {
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
    try {
        const questionToDelete = await Question.findById(req.params.id);

        if (!questionToDelete) {
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
    try {
        const { difficulty } = req.body;

        const questions = await Question.find({ difficulty });

        if (!questions) {
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
    try {
        const { subject } = req.body;

        const questions = await Question.find({ subject });

        if (!questions) {
            return res.status(404).json({ msg: 'Questions not found' });
        }

        logger.info('Questions retrieved successfully: ', questions);
        res.status(200).json(questions);
    } catch (error) {
        logger.error('Error in retrieving questions: ', error);
        res.status(500).json({ msg: 'Error in retrieving questions' });
    }
}

module.exports = {
    createQuestion,
    getQuestionById,
    getAllQuestions,
    updateQuestionById,
    deleteQuestionById,
    searchQuestionsByDifficulty,
    searchQuestionsBySubject
};
