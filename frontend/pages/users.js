import { useState } from 'react';
import { submitFormData } from '../utils/api';

export default function UsersPage() {
  const [createForm, setCreateForm] = useState({ name: '', email: '', password: '' });
  const [deleteForm, setDeleteForm] = useState({ id: '' });
  const [updateForm, setUpdateForm] = useState({ id: '', name: '', email: '', password: '' });
  const [getProcessesForm, setGetProcessesForm] = useState({ userId: '' });
  const [getOrganizationsForm, setGetOrganizationsForm] = useState({ userId: '' });
  const [getEventsForm, setGetEventsForm] = useState({ userId: '' });

  const getFormDataAndAction = (form) => {
    switch (form) {
      case 'create':
        return {
          formData: createForm,
          endpoint: '/users',
          method: 'POST',
        };
      case 'delete':
        return {
          formData: deleteForm,
          endpoint: `/users/${deleteForm.id}`,
          method: 'DELETE',
        };
      case 'update':
        return {
          formData: updateForm,
          endpoint: `/users/${updateForm.id}`,
          method: 'PUT',
        };
      case 'getProcesses':
        return {
          formData: getProcessesForm,
          endpoint: `/users/${getProcessesForm.userId}/processes`,
          method: 'GET',
        };
      case 'getOrganizations':
        return {
          formData: getOrganizationsForm,
          endpoint: `/users/${getOrganizationsForm.userId}/organizations`,
          method: 'GET',
        };
      case 'getEvents':
        return {
          formData: getEventsForm,
          endpoint: `/users/${getEventsForm.userId}/events`,
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
      <h1>Users</h1>
      <form onSubmit={handleSubmit('create')} style={formStyle}>
        <h2>Create User</h2>
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
          <label>Email:</label>
          <input
            type="email"
            value={createForm.email}
            onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
            style={inputStyle}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={createForm.password}
            onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>Submit</button>
      </form>

      <form onSubmit={handleSubmit('delete')} style={formStyle}>
        <h2>Delete User</h2>
        <div>
          <label>User ID:</label>
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
        <h2>Update User</h2>
        <div>
          <label>User ID:</label>
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
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={updateForm.password}
            onChange={(e) => setUpdateForm({ ...updateForm, password: e.target.value })}
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>Submit</button>
      </form>

      <form onSubmit={handleSubmit('getProcesses')} style={formStyle}>
        <h2>Get Processes for User</h2>
        <div>
          <label>User ID:</label>
          <input
            type="text"
            value={getProcessesForm.userId}
            onChange={(e) => setGetProcessesForm({ ...getProcessesForm, userId: e.target.value })}
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>Submit</button>
      </form>

      <form onSubmit={handleSubmit('getOrganizations')} style={formStyle}>
        <h2>Get Organizations for User</h2>
        <div>
          <label>User ID:</label>
          <input
            type="text"
            value={getOrganizationsForm.userId}
            onChange={(e) => setGetOrganizationsForm({ ...getOrganizationsForm, userId: e.target.value })}
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>Submit</button>
      </form>

      <form onSubmit={handleSubmit('getEvents')} style={formStyle}>
        <h2>Get Events for User</h2>
        <div>
          <label>User ID:</label>
          <input
            type="text"
            value={getEventsForm.userId}
            onChange={(e) => setGetEventsForm({ ...getEventsForm, userId: e.target.value })}
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
