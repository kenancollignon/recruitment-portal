import { useState } from 'react';
import { submitFormData } from '../utils/api';

export default function EventsPage() {
  const [createForm, setCreateForm] = useState({ name: '', date: '', location: '', duration: '', description: '', startTime: '', organizationId: '' });
  const [deleteForm, setDeleteForm] = useState({ id: '' });
  const [updateForm, setUpdateForm] = useState({ id: '', name: '', date: '', location: '', duration: '', description: '', startTime: '', organizationId: '' });
  const [getByIdForm, setGetByIdForm] = useState({ id: '' });
  const [getAttendeesForm, setGetAttendeesForm] = useState({ eventId: '' });

  const getFormDataAndAction = (form) => {
    switch (form) {
      case 'create':
        return {
          formData: createForm,
          endpoint: '/events',
          method: 'POST',
        };
      case 'delete':
        return {
          formData: deleteForm,
          endpoint: `/events/${deleteForm.id}`,
          method: 'DELETE',
        };
      case 'update':
        return {
          formData: updateForm,
          endpoint: `/events/${updateForm.id}`,
          method: 'PUT',
        };
      case 'getById':
        return {
          formData: getByIdForm,
          endpoint: `/events/${getByIdForm.id}`,
          method: 'GET',
        };
      case 'getAttendees':
        return {
          formData: getAttendeesForm,
          endpoint: `/events/${getAttendeesForm.eventId}/attendees`,
          method: 'GET',
        };
      default:
        return {};
    }
  };

  const handleSubmit = (form) => async (event) => {
    event.preventDefault();
    const { formData, endpoint, method } = getFormDataAndAction(form);
    console.log('Submitting form data:', formData);
    try {
      const responseData = await submitFormData(formData, endpoint, method);
      console.log('Response from API:', responseData);
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Events</h1>
      <form onSubmit={handleSubmit('create')} style={formStyle}>
        <h2>Create Event</h2>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={createForm.name}
            onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
            style={inputStyle}
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={createForm.date}
            onChange={(e) => setCreateForm({ ...createForm, date: e.target.value })}
            style={inputStyle}
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            value={createForm.location}
            onChange={(e) => setCreateForm({ ...createForm, location: e.target.value })}
            style={inputStyle}
          />
        </div>
        <div>
          <label>Duration:</label>
          <input
            type="text"
            value={createForm.duration}
            onChange={(e) => setCreateForm({ ...createForm, duration: e.target.value })}
            style={inputStyle}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={createForm.description}
            onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
            style={inputStyle}
          />
        </div>
        <div>
          <label>Start Time:</label>
          <input
            type="time"
            value={createForm.startTime}
            onChange={(e) => setCreateForm({ ...createForm, startTime: e.target.value })}
            style={inputStyle}
          />
        </div>
        <div>
          <label>Organization ID:</label>
          <input
            type="text"
            value={createForm.organizationId}
            onChange={(e) => setCreateForm({ ...createForm, organizationId: e.target.value })}
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>Submit</button>
      </form>

      <form onSubmit={handleSubmit('delete')} style={formStyle}>
        <h2>Delete Event</h2>
        <div>
          <label>Event ID:</label>
          <input
            type="text"
            value={deleteForm.id}
            onChange={(e) => setDeleteForm({ ...deleteForm, id: e.target.value })}
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>Submit</button>
      </form>

      <form onSubmit={handleSubmit('update')} style={formStyle}>
        <h2>Update Event</h2>
        <div>
          <label>Event ID:</label>
          <input
            type="text"
            value={updateForm.id}
            onChange={(e) => setUpdateForm({ ...updateForm, id: e.target.value })}
            style={inputStyle}
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={updateForm.name}
            onChange={(e) => setUpdateForm({ ...updateForm, name: e.target.value })}
            style={inputStyle}
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={updateForm.date}
            onChange={(e) => setUpdateForm({ ...updateForm, date: e.target.value })}
            style={inputStyle}
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            value={updateForm.location}
            onChange={(e) => setUpdateForm({ ...updateForm, location: e.target.value })}
            style={inputStyle}
          />
        </div>
        <div>
          <label>Duration:</label>
          <input
            type="text"
            value={updateForm.duration}
            onChange={(e) => setUpdateForm({ ...updateForm, duration: e.target.value })}
            style={inputStyle}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={updateForm.description}
            onChange={(e) => setUpdateForm({ ...updateForm, description: e.target.value })}
            style={inputStyle}
          />
        </div>
        <div>
          <label>Start Time:</label>
          <input
            type="time"
            value={updateForm.startTime}
            onChange={(e) => setUpdateForm({ ...updateForm, startTime: e.target.value })}
            style={inputStyle}
          />
        </div>
        <div>
          <label>Organization ID:</label>
          <input
            type="text"
            value={updateForm.organizationId}
            onChange={(e) => setUpdateForm({ ...updateForm, organizationId: e.target.value })}
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>Submit</button>
      </form>

      <form onSubmit={handleSubmit('getById')} style={formStyle}>
        <h2>Get Event by ID</h2>
        <div>
          <label>Event ID:</label>
          <input
            type="text"
            value={getByIdForm.id}
            onChange={(e) => setGetByIdForm({ ...getByIdForm, id: e.target.value })}
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>Submit</button>
      </form>

      <form onSubmit={handleSubmit('getAttendees')} style={formStyle}>
        <h2>Get Attendees for Event</h2>
        <div>
          <label>Event ID:</label>
          <input
            type="text"
            value={getAttendeesForm.eventId}
            onChange={(e) => setGetAttendeesForm({ ...getAttendeesForm, eventId: e.target.value })}
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>Submit</button>
      </form>
      <a href="/">
        <h3>Return Home</h3>
      </a>
    </div>
  );
}

const formStyle = {
  marginBottom: '20px',
  padding: '20px',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  width: '100%',
  maxWidth: '600px',
  margin: '0 auto',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '15px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  boxSizing: 'border-box',
  fontFamily: 'Arial, sans-serif',
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};
