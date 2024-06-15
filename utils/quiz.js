const { dbQuiz } = require("./db-connect.js");
const crypto = require("crypto");

const getQuiz = async (count, table) => {
  try {
    const querySql = `SELECT COUNT(*) AS total_rows FROM ${table};`;
    const result = await queryDatabase(querySql);
    const totalRows = Number(result[0].total_rows);
    const randomNumbers = getRandomNumbers(1, totalRows, count);
    const quiz = [];
    for (quizId of randomNumbers) {
      const query = `SELECT * FROM ${table} WHERE id = ${quizId};`;
      const result = await queryDatabase(query);
      quiz.push({
        id: result[0].id,
        video_url: result[0].video_url,
        answer1: result[0].answer1,
        answer2: result[0].answer2,
        answer3: result[0].answer3,
        answer4: result[0].answer4,
      });
    }
    return quiz;
  } catch (error) {
    console.log("Error fetching quiz data:", error);
  }
};

const getQuizResult = async (answerData, table) => {
  try {
    // console.log(answerData);
    const quizLength = answerData.length;
    let trueAnswer = 0;
    for (data of answerData) {
      const querySql = `SELECT * FROM ${table} WHERE id = ${data.id}`;
      const res = await queryDatabase(querySql);
      // console.log(res[0].true_answer);
      if (res[0].true_answer === data.answer) {
        trueAnswer++;
      }
    }
    const score = getScore(quizLength, trueAnswer);
    return {
      true_answer: trueAnswer,
      quiz_length: quizLength,
      score: score,
    };
  } catch (error) {
    console.log("Error fetching quiz data:", error);
  }
};

async function queryDatabase(query) {
  return new Promise((resolve, reject) => {
    dbQuiz.query(query, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

function getRandomNumbers(min, max, count) {
  const numbers = new Set();
  while (numbers.size < count) {
    const randomNumber = crypto.randomInt(min, max + 1);
    numbers.add(randomNumber);
  }
  return Array.from(numbers);
}

function getScore(quizLength, trueAnswer) {
  return 100 * (trueAnswer / quizLength);
}

module.exports = { getQuiz, getQuizResult };
