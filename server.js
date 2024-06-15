const { dbMaterial } = require("./utils/db-connect.js");
const { getQuiz, getQuizResult } = require("./utils/quiz.js");
const express = require("express");

const app = express();
app.use(express.json());
const port = 5000;

app.get("/", async (req, res) => {
  res.json({ text: "Hello all! using another url for services" });
});

app.get("/material/relations", (req, res) => {
  const querySql = "SELECT * FROM relations";
  dbMaterial.query(querySql, (error, result) => {
    if (error) throw error;
    res.json({
      status: "Success",
      data: result,
    });
  });
});

app.get("/material/relations/:relation", (req, res) => {
  const relation = req.params.relation.toLowerCase();
  const querySql = `SELECT * FROM relations WHERE word = '${relation}'`;
  dbMaterial.query(querySql, (error, result) => {
    if (error) throw error;
    res.json({
      status: "Success",
      data: result[0],
    });
  });
});

app.get("/material/alphabet", (req, res) => {
  console.log(typeof req.params.letter);
  const querySql = "SELECT * FROM alphabet";
  dbMaterial.query(querySql, (error, result) => {
    if (error) throw error;
    res.json({
      status: "Success",
      data: result,
    });
  });
});

app.get("/material/alphabet/:letter", (req, res) => {
  const letter = req.params.letter.toLowerCase();
  const querySql = `SELECT * FROM alphabet WHERE letter = '${letter}'`;
  dbMaterial.query(querySql, (error, result) => {
    if (error) throw error;
    res.json({
      status: "Success",
      data: result[0],
    });
  });
});

app.get("/quiz/relations", async (req, res) => {
  const count = req.query.count;
  const arrQuiz = await getQuiz(count, "relations");
  res.json({
    status: "Success",
    data: arrQuiz,
  });
});

app.post("/quiz/relations", async (req, res) => {
  const answerData = [];
  for (const data of req.body.data) {
    const answer = {
      id: data.id,
      answer: data.answer,
    };
    answerData.push(answer);
  }
  const result = await getQuizResult(answerData, "relations");
  res.json({
    status: "Success",
    data: {
      true_answer: result.true_answer,
      quiz_length: result.quiz_length,
      score: result.score,
    },
  });
});

app.get("/quiz/alphabet", async (req, res) => {
  const count = req.query.count;
  const arrQuiz = await getQuiz(count, "alphabet");
  res.json({
    status: "Success",
    data: arrQuiz,
  });
});

app.post("/quiz/alphabet", async (req, res) => {
  const answerData = [];
  for (const data of req.body.data) {
    const answer = {
      id: data.id,
      answer: data.answer,
    };
    answerData.push(answer);
  }
  const result = await getQuizResult(answerData, "alphabet");
  res.json({
    status: "Success",
    data: {
      true_answer: result.true_answer,
      quiz_length: result.quiz_length,
      score: result.score,
    },
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
