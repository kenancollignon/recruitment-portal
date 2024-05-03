import { useState } from 'react';
import { submitFormData } from '../utils/api';

export default function OrganizationsPage() {
  const [createForm, setCreateForm] = useState({ name: '', processId: '', email: '' });
  const [deleteForm, setDeleteForm] = useState({ id: '' });
  const [updateForm, setUpdateForm] = useState({ id: '', name: '' });
  const [eventsForm, setEventsForm] = useState({ id: '' });

  const getFormDataAndAction = (form) => {
    switch (form) {
      case 'create':
        return {
          formData: createForm,
          endpoint: '/organizations',
          method: 'POST',
        };
      case 'delete':
        return {
          formData: deleteForm,
          endpoint: `/organizations/${deleteForm.id}`,
          method: 'DELETE',
        };
      case 'update':
        return {
          formData: updateForm,
          endpoint: `/organizations/${updateForm.id}`,
          method: 'PUT',
        };
      case 'events':
        return {
          formData: eventsForm,
          endpoint: `/organizations/${eventsForm.id}/events`,
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
      <h1>Organizations</h1>
      <form onSubmit={handleSubmit('create')} style={formStyle}>
        <h2>Create Organization</h2>
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
          <label>Process ID:</label>
          <input
            type="text"
            value={createForm.processId}
            onChange={(e) => setCreateForm({ ...createForm, processId: e.target.value })}
            style={inputStyle}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={createForm.email}
            onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>Submit</button>
      </form>

      <form onSubmit={handleSubmit('delete')} style={formStyle}>
        <h2>Delete Organization</h2>
        <div>
          <label>Organization ID:</label>
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
        <h2>Update Organization</h2>
        <div>
            <label>Organization ID:</label>
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
            <label>Email:</label>
            <input
            type="email"
            value={updateForm.email}
            onChange={(e) => setUpdateForm({ ...updateForm, email: e.target.value })}
            style={inputStyle}
            />
        </div>
        <button type="submit" style={buttonStyle}>Submit</button>
        </form>

      <form onSubmit={handleSubmit('events')} style={formStyle}>
        <h2>Get Events for Organization</h2>
        <div>
          <label>Organization ID:</label>
          <input
            type="text"
            value={eventsForm.id}
            onChange={(e) => setEventsForm({ ...eventsForm, id: e.target.value })}
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
