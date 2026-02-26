import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Question() {
  const { id } = useParams();
  const nav = useNavigate();

  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [answerContent, setAnswerContent] = useState("");
  const [loading, setLoading] = useState(true);

  // Load question and answers
  useEffect(() => {
    loadQuestion();
    loadAnswers();
  }, [id]);

  async function loadQuestion() {
    try {
      const res = await axios.get(`http://localhost:4000/questions/${id}`);
      setQuestion(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error loading question:", err);
      setLoading(false);
    }
  }

  async function loadAnswers() {
    try {
      const res = await axios.get(`http://localhost:4000/answers/question/${id}`);
      setAnswers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error loading answers:", err);
      setAnswers([]);
    }
  }

  async function submitAnswer(e) {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please log in to post an answer");
      nav("/");
      return;
    }

    if (!answerContent.trim()) {
      alert("Please enter an answer");
      return;
    }

    try {
      await axios.post("http://localhost:4000/answers", {
        content: answerContent,
        question_id: id,
        user_id: userId
      });

      setAnswerContent("");
      loadAnswers(); // Reload answers
    } catch (err) {
      console.error("Error posting answer:", err);
      alert("Failed to post answer");
    }
  }

  if (loading) {
    return (
      <div className="container mt-4">
        <p>Loading...</p>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">Question not found</div>
        <Link to="/dashboard" className="btn btn-primary">Back to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Back button */}
      <Link to={`/category/${question.category_id}`} className="btn btn-outline-secondary mb-3">
        ← Back to Category
      </Link>

      {/* Question Card */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h2 className="fw-bold mb-3">{question.title}</h2>
          <p className="lead">{question.content}</p>
          <hr />
          <small className="text-muted">
            Posted by {question.author_email || "Anonymous"} on{" "}
            {new Date(question.created_at).toLocaleDateString()}
          </small>
        </div>
      </div>

      {/* Answers Section */}
      <h4 className="mb-3">
        {answers.length} {answers.length === 1 ? "Answer" : "Answers"}
      </h4>

      {answers.length === 0 && (
        <div className="alert alert-light border">
          No answers yet. Be the first to answer!
        </div>
      )}

      {answers.map((answer) => (
        <div key={answer.id} className="card mb-3">
          <div className="card-body">
            <p className="mb-2">{answer.content}</p>
            <small className="text-muted">
              Answered by {answer.author_email || "Anonymous"} on{" "}
              {new Date(answer.created_at).toLocaleDateString()}
            </small>
          </div>
        </div>
      ))}

      {/* Answer Form */}
      <div className="card shadow-sm border-0 mt-4">
        <div className="card-body">
          <h5 className="mb-3">Your Answer</h5>
          <form onSubmit={submitAnswer}>
            <textarea
              className="form-control mb-3"
              rows="5"
              placeholder="Write your answer here..."
              value={answerContent}
              onChange={(e) => setAnswerContent(e.target.value)}
              required
            />
            <button className="btn btn-success">Post Answer</button>
          </form>
        </div>
      </div>
    </div>
  );
}
