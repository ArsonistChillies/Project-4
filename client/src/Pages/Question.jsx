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
  const [submitting, setSubmitting] = useState(false);

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

    setSubmitting(true);

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
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="container mt-5 text-center py-5">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-muted mt-3">Loading question...</p>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="container mt-5 py-4">
        <div className="card shadow-sm border-0 p-5 text-center">
          <div className="mb-4">
            <span style={{fontSize: '4rem'}}>❌</span>
          </div>
          <h3 className="mb-3">Question not found</h3>
          <p className="text-muted mb-4">The question you're looking for doesn't exist or has been removed.</p>
          <Link to="/dashboard" className="btn btn-success btn-lg">
            <i className="bi bi-house me-2"></i>
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 py-4" style={{maxWidth: 900}}>
      
      {/* Back button */}
      <Link to={`/category/${question.category_id}`} className="btn btn-outline-secondary mb-4">
        <i className="bi bi-arrow-left me-2"></i>
        Back to Category
      </Link>

      {/* Question Card */}
      <div className="card shadow-lg border-0 mb-4">
        <div className="card-body p-5">
          
          <div className="mb-3">
            <span className="badge bg-success bg-opacity-10 text-success px-3 py-2">
              <i className="bi bi-chat-left-text me-1"></i>
              Question
            </span>
          </div>

          <h2 className="fw-bold mb-4">{question.title}</h2>
          
          <div className="bg-light rounded p-4 mb-4">
            <p className="mb-0 lead" style={{whiteSpace: 'pre-wrap'}}>{question.content}</p>
          </div>

          <hr className="my-4"/>
          
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div className="d-flex align-items-center">
              <div className="bg-success bg-opacity-10 rounded-circle p-2 me-3">
                <i className="bi bi-person-circle text-success" style={{fontSize: '1.5rem'}}></i>
              </div>
              <div>
                <small className="text-muted d-block">Posted by</small>
                <strong>{question.author_email || "Anonymous"}</strong>
              </div>
            </div>
            <div className="text-end">
              <small className="text-muted d-block">Posted on</small>
              <strong>
                {new Date(question.created_at).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </strong>
            </div>
          </div>

        </div>
      </div>

      {/* Answers Section Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">
          <i className="bi bi-chat-dots me-2"></i>
          {answers.length} {answers.length === 1 ? "Answer" : "Answers"}
        </h4>
      </div>

      {/* No Answers Message */}
      {answers.length === 0 && (
        <div className="card border-0 bg-light mb-4">
          <div className="card-body p-4 text-center">
            <span style={{fontSize: '3rem'}}>💬</span>
            <p className="text-muted mb-0 mt-3">
              No answers yet. Be the first to help answer this question!
            </p>
          </div>
        </div>
      )}

      {/* Answers List */}
      {answers.map((answer, index) => (
        <div key={answer.id} className="card shadow-sm border-0 mb-3">
          <div className="card-body p-4">
            
            <div className="d-flex align-items-start mb-3">
              <div className="bg-success bg-opacity-10 rounded-circle p-2 me-3 flex-shrink-0">
                <i className="bi bi-person-circle text-success" style={{fontSize: '1.25rem'}}></i>
              </div>
              <div className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-2">
                  <strong>{answer.author_email || "Anonymous"}</strong>
                  <small className="text-muted">
                    <i className="bi bi-clock me-1"></i>
                    {new Date(answer.created_at).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </small>
                </div>
                <p className="mb-0" style={{whiteSpace: 'pre-wrap'}}>{answer.content}</p>
              </div>
            </div>

          </div>
        </div>
      ))}

      {/* Answer Form */}
      <div className="card shadow-lg border-0 mt-5">
        <div className="card-body p-5">
          
          <h5 className="mb-4">
            <i className="bi bi-pencil-square me-2"></i>
            Your Answer
          </h5>
          
          <form onSubmit={submitAnswer}>
            <div className="mb-4">
              <textarea
                className="form-control"
                rows="6"
                placeholder="Share your knowledge and help answer this question..."
                value={answerContent}
                onChange={(e) => setAnswerContent(e.target.value)}
                required
                style={{minHeight: '150px'}}
              />
              <small className="text-muted">
                Provide a clear and helpful answer. Be respectful and constructive.
              </small>
            </div>

            <button 
              className="btn btn-success btn-lg big-btn w-100" 
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Posting Answer...
                </>
              ) : (
                <>
                  <i className="bi bi-send me-2"></i>
                  Post Answer
                </>
              )}
            </button>
          </form>

        </div>
      </div>

    </div>
  );
}
