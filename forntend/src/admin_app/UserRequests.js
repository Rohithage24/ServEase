import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './Admin.css';
import Feedback from './Feedback';

function UserRequests() {
  const [requests, setRequests] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        console.log(process.env.REACT_APP_API_BASE_URL);

        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}request`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        );

        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        console.log(data);

        // Ensure each request has `showDetails: false`
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
    // Ensure `id` is a string or number, not an object
    if (typeof id === 'object' && id !== null && '_id' in id) {
      setSelectedId(id._id);
    } else {
      setSelectedId(id);
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
                        onClick={() => fetchFeedback(req._id)}
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

      {selectedId && (
        <div className='feedback-section'>
          <h3>User Feedback</h3>
          {/* <Feedback id={selectedId} /> */}
        </div>
      )}

      <ToastContainer position='top-right' autoClose={2000} />
    </div>
  );
}

export default UserRequests;
