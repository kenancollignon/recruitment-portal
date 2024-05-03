import { useState } from 'react';
import { submitFormData } from '../utils/api';

export default function ProcessesPage() {
  const [createForm, setCreateForm] = useState({ name: '', email: '', description: '' });
  const [deleteForm, setDeleteForm] = useState({ id: '' });
  const [updateForm, setUpdateForm] = useState({ id: '', name: '', email: '', description: '' });
  const [orgsForm, setOrgsForm] = useState({ id: '' });
  const [eventsForm, setEventsForm] = useState({ id: '' });
  const [usersForm, setUsersForm] = useState({ id: '' });

  const getFormDataAndAction = (form) => {
    switch (form) {
      case 'create':
        return {
          formData: createForm,
          endpoint: '/processes/create',
          method: 'POST',
        };
      case 'delete':
        return {
          formData: deleteForm,
          endpoint: `/processes/${deleteForm.id}/delete`,
          method: 'DELETE',
        };
      case 'update':
        return {
          formData: updateForm,
          endpoint: `/processes/${updateForm.id}/delete`,
          method: 'PUT',
        };
      case 'orgs':
        return {
          formData: orgsForm,
          endpoint: `/processes/${orgsForm.id}/organizations`,
          method: 'GET',
        };
      case 'events':
        return {
          formData: eventsForm,
          endpoint: `/processes/${eventsForm.id}/events`,
          method: 'GET',
        };
      case 'users':
        return {
          formData: usersForm,
          endpoint: `/processes/${usersForm.id}/users`,
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
      <h1>Recruitment Processes</h1>
      <form onSubmit={handleSubmit('create')} style={formStyle}>
        <h2>Create Process</h2>
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
          <label>Email Address:</label>
          <input
            type="email"
            value={createForm.email}
            onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
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
        <button type="submit" style={buttonStyle}>Submit</button>
      </form>

      <form onSubmit={handleSubmit('delete')} style={formStyle}>
        <h2>Delete Process</h2>
        <div>
          <label>Process ID:</label>
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
        <h2>Update Process</h2>
        <div>
          <label>Process ID:</label>
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
          <label>Email Address:</label>
          <input
            type="email"
            value={updateForm.email}
            onChange={(e) => setUpdateForm({ ...updateForm, email: e.target.value })}
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
        <button type="submit" style={buttonStyle}>Submit</button>
      </form>

      <form onSubmit={handleSubmit('orgs')} style={formStyle}>
        <h2>Get Organizations for Process</h2>
        <div>
          <label>Process ID:</label>
          <input
            type="text"
            value={orgsForm.id}
            onChange={(e) => setOrgsForm({ ...orgsForm, id: e.target.value })}
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>Submit</button>
      </form>

      <form onSubmit={handleSubmit('events')} style={formStyle}>
        <h2>Get Events for Process</h2>
        <div>
          <label>Process ID:</label>
          <input
            type="text"
            value={eventsForm.id}
            onChange={(e) => setEventsForm({ ...eventsForm, id: e.target.value })}
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>Submit</button>
      </form>

      <form onSubmit={handleSubmit('users')} style={formStyle}>
        <h2>Get Users for Process</h2>
        <div>
          <label>Process ID:</label>
          <input
            type="text"
            value={usersForm.id}
            onChange={(e) => setUsersForm({ ...usersForm, id: e.target.value })}
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
