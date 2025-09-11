import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './Admin.css';

function UserRequests() {
  const [requests, setRequests] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [feedbackData, setFeedbackData] = useState([]);
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false); // ✅ popup state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}request`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        );

        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();

        const formattedRequests = data.map(req => ({
          ...req,
          showDetails: false,
        }));

        setRequests(formattedRequests);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, []);

  const toggleDetails = id => {
    setRequests(prevRequests =>
      prevRequests.map(req =>
        req._id === id ? { ...req, showDetails: !req.showDetails } : req
      )
    );
  };

  const updateStatus = async (id, newStatus) => {
    try {
      navigate(`/admin/accept/${id}`);

      setRequests(prevRequests =>
        prevRequests.map(req =>
          req._id === id ? { ...req, status: newStatus } : req
        )
      );

      toast.success(`Request ${newStatus} ✅`);
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update request ❌');
    }
  };

  const fetchFeedback = async id => {
    let userId = id;

    if (typeof id === 'object' && id !== null) {
      if ('_id' in id) {
        userId = id._id;
      } else if ('id' in id) {
        userId = id.id;
      }
    }

    setSelectedId(userId);

    try {
      const response = await fetch(`http://localhost:8080/getfeed/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setFeedbackData(data);
      setShowFeedbackPopup(true); // ✅ open popup
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  return (
    <div className='admin-container'>
      <h2 className='admin-title'>Manage User Requests</h2>
      <table className='admin-table'>
        <thead>
          <tr>
            <th>NAME</th>
            <th>CONTACT</th>
            <th>EMAIL</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(req => (
            <React.Fragment key={req._id}>
              <tr>
                <td>{req.name.charAt(0).toUpperCase() + req.name.slice(1)}</td>
                <td>{req.contact}</td>
                <td>{req.email}</td>
                <td>
                  <button
                    className='btn btn-view'
                    onClick={() => toggleDetails(req._id)}
                  >
                    {req.showDetails ? 'Hide Details' : 'View Details'}
                  </button>

                  {req.status === 'pending' && (
                    <>
                      <button
                        className='btn btn-accept'
                        onClick={() => updateStatus(req._id, 'accepted')}
                      >
                        Accept
                      </button>
                      <button
                        className='btn btn-reject'
                        onClick={() => updateStatus(req._id, 'rejected')}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
              {req.showDetails && (
                <tr className='details-row'>
                  <td colSpan='4' className='details-cell'>
                    <strong>Service:</strong> {req.serves} <br />
                    <strong>Address:</strong> {req.address} <br />
                    <strong>Description:</strong> {req.description} <br />
                    <strong>Status:</strong> {req.status}
                    <br />
                    {req.status === 'Complete' && (
                      <button
                        className='btn btn-view'
                        onClick={() => fetchFeedback(req.userID)}
                      >
                        View Feedback
                      </button>
                    )}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* ✅ Feedback Popup */}
      {showFeedbackPopup && (
        <div className='feedback-popup'>
          <div className='feedback-popup-content'>
            <button
              className='close-btn'
              onClick={() => setShowFeedbackPopup(false)}
            >
              ❌
            </button>
            <h3>User Feedback</h3>
            <table border='1'>
              <thead>
                <tr>
                  <th>Rating</th>
                  <th>Feedback</th>
                  <th>Timely</th>
                  <th>Behavior</th>
                </tr>
              </thead>
              <tbody>
                {feedbackData.map(fb => (
                  <tr key={fb._id}>
                    <td>{fb.rating}</td>
                    <td>{fb.feedback || 'N/A'}</td>
                    <td>{fb.selectedOptions?.timely || 'N/A'}</td>
                    <td>{fb.selectedOptions?.behavior || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ToastContainer position='top-right' autoClose={2000} />
    </div>
  );
}

export default UserRequests;





// import React, { useState, useEffect } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import 'react-toastify/dist/ReactToastify.css';
// import './Admin.css';
// import Feedback from './Feedback';

// function UserRequests() {
//   const [requests, setRequests] = useState([]);
//   const [selectedId, setSelectedId] = useState(null);
//   const [feedbackData , setFeedbackData] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         console.log(process.env.REACT_APP_API_BASE_URL);

//         const response = await fetch(
//           `${process.env.REACT_APP_API_BASE_URL}request`,
//           {
//             method: 'GET',
//             headers: { 'Content-Type': 'application/json' },
//           }
//         );

//         if (!response.ok) throw new Error('Network response was not ok');

//         const data = await response.json();
//         console.log(data);

//         // Ensure each request has `showDetails: false`
//         const formattedRequests = data.map(req => ({
//           ...req,
//           showDetails: false,
//         }));

//         setRequests(formattedRequests);
//       } catch (error) {
//         console.error('Error fetching requests:', error);
//       }
//     };

//     fetchRequests();
//   }, []);

//   const toggleDetails = id => {
//     setRequests(prevRequests =>
//       prevRequests.map(req =>
//         req._id === id ? { ...req, showDetails: !req.showDetails } : req
//       )
//     );
//   };

//   const updateStatus = async (id, newStatus) => {
//     try {
//       navigate(`/admin/accept/${id}`);

//       setRequests(prevRequests =>
//         prevRequests.map(req =>
//           req._id === id ? { ...req, status: newStatus } : req
//         )
//       );

//       toast.success(`Request ${newStatus} ✅`);
//     } catch (error) {
//       console.error('Error updating status:', error);
//       toast.error('Failed to update request ❌');
//     }
//   };

//   const fetchFeedback = async (id) => {
//   // Always extract string id
//   let userId = id;

//   if (typeof id === "object" && id !== null) {
//     if ("_id" in id) {
//       userId = id._id; // ✅ use _id property if object
//     } else if ("id" in id) {
//       userId = id.id; // ✅ handle {id: "..."} case
//     }
//   }

//   setSelectedId(userId);

//   try {
//     const response = await fetch(`http://localhost:8080/getfeed/${userId}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     const data = await response.json();
//     console.log("Feedback response:", data);
//     setFeedbackData(data)
//   } catch (error) {
//     console.error("Error fetching feedback:", error);
//   }
// };

// console.log(feedbackData);



//   return (
//     <div className='admin-container'>
//       <h2 className='admin-title'>Manage User Requests</h2>
//       <table className='admin-table'>
//         <thead>
//           <tr>
//             <th>NAME</th>
//             <th>CONTACT</th>
//             <th>EMAIL</th>
//             <th>ACTIONS</th>
//           </tr>
//         </thead>
//         <tbody>
//           {requests.map(req => (
//             <React.Fragment key={req._id}>
//               <tr>
//                 <td>{req.name.charAt(0).toUpperCase() + req.name.slice(1)}</td>
//                 <td>{req.contact}</td>
//                 <td>{req.email}</td>
//                 <td>
//                   <button
//                     className='btn btn-view'
//                     onClick={() => toggleDetails(req._id)}
//                   >
//                     {req.showDetails ? 'Hide Details' : 'View Details'}
//                   </button>

//                   {req.status === 'pending' && (
//                     <>
//                       <button
//                         className='btn btn-accept'
//                         onClick={() => updateStatus(req._id, 'accepted')}
//                       >
//                         Accept
//                       </button>
//                       <button
//                         className='btn btn-reject'
//                         onClick={() => updateStatus(req._id, 'rejected')}
//                       >
//                         Reject
//                       </button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//               {req.showDetails && (
//                 <tr className='details-row'>
//                   <td colSpan='4' className='details-cell'>
//                     <strong>Service:</strong> {req.serves} <br />
//                     <strong>Address:</strong> {req.address} <br />
//                     <strong>Description:</strong> {req.description} <br />
//                     <strong>Status:</strong> {req.status}
//                     <br />
//                     {req.status === 'Complete' && (
//                       <button
//                         className='btn btn-view'
//                         onClick={() => fetchFeedback(req.userID)}
//                       >
//                         View Feedback
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               )}
//             </React.Fragment>
//           ))}
//         </tbody>
//       </table>

// <div className="feedback-section">
//   <h3>User Feedback</h3>
//   <table border="1">
//     <thead>
//       <tr>
//         <th>Rating</th>
//         <th>Feedback</th>
//         <th>Timely</th>
//         <th>Behavior</th>
//       </tr>
//     </thead>
//     <tbody>
//       {feedbackData.map(fb => (
//         <tr key={fb._id}>
//           <td>{fb.rating}</td>
//           <td>{fb.feedback || 'N/A'}</td>
//           <td>{fb.selectedOptions?.timely || 'N/A'}</td>
//           <td>{fb.selectedOptions?.behavior || 'N/A'}</td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
// </div>



//       <ToastContainer position='top-right' autoClose={2000} />
//     </div>
//   );
// }

// export default UserRequests;
