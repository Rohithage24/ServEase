import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Feedback(reid) {
 
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}feedback/${reid}`);
        if (!response.ok) throw new Error("Failed to fetch feedback");

        const data = await response.json();
        setFeedback(data.message);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchFeedback();
  }, [reid]);

  return (
    <div>
      <h2>Feedback Details</h2>
      <p><strong>Request ID:</strong> {reid}</p>
      <p><strong>Feedback:</strong> {feedback || "No feedback available."}</p>
    </div>
  );
}

export default Feedback;
