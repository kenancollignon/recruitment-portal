
import { useState } from 'react';
import { submitFormData } from '../utils/api';

export default function MessageChainsPage() {
  const [createForm, setCreateForm] = useState({ subject: '' });
  const [updateForm, setUpdateForm] = useState({ id: '', subject: '' });
  const [addMessageForm, setAddMessageForm] = useState({ messageChainId: '', senderId: '', content: '', tags: '' });
  const [getMessagesForm, setGetMessagesForm] = useState({ messageChainId: '' });

  const getFormDataAndAction = (form) => {
    switch (form) {
      case 'create':
        return {
          formData: createForm,
          endpoint: '/message-chains',
          method: 'POST',
        };
      case 'update':
        return {
          formData: updateForm,
          endpoint: `/message-chains/${updateForm.id}`,
          method: 'PUT',
        };
      case 'addMessage':
        return {
          formData: addMessageForm,
          endpoint: `/message-chains/${addMessageForm.messageChainId}/add-message`,
          method: 'POST',
        };
      case 'getMessages':
        return {
          formData: getMessagesForm,
          endpoint: `/message-chains/${getMessagesForm.messageChainId}/messages`,
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
      <h1>Message Chains</h1>
      {/* Create Message Chain Form */}
      <form onSubmit={handleSubmit('create')} style={formStyle}>
        <h2>Create Message Chain</h2>
        <div>
          <label>Subject:</label>
          <input
            type="text"
            value={createForm.subject}
            onChange={(e) => setCreateForm({ ...createForm, subject: e.target.value })}
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>Submit</button>
      </form>

      <form onSubmit={handleSubmit('update')} style={formStyle}>
        <h2>Update Message Chain</h2>
        <div>
          <label>Message Chain ID:</label>
          <input
            type="text"
            value={updateForm.id}
            onChange={(e) => setUpdateForm({ ...updateForm, id: e.target.value })}
            style={inputStyle}
          />
        </div>
        <div>
          <label>Subject:</label>
          <input
            type="text"
            value={updateForm.subject}
            onChange={(e) => setUpdateForm({ ...updateForm, subject: e.target.value })}
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>Submit</button>
      </form>

      <form onSubmit={handleSubmit('addMessage')} style={formStyle}>
        <h2>Add Message to Chain</h2>
        <div>
          <label>Message Chain ID:</label>
          <input
            type="text"
            value={addMessageForm.messageChainId}
            onChange={(e) => setAddMessageForm({ ...addMessageForm, messageChainId: e.target.value })}
            style={inputStyle}
          />
        </div>
        <div>
          <label>Sender ID:</label>
          <input
            type="text"
            value={addMessageForm.senderId}
            onChange={(e) => setAddMessageForm({ ...addMessageForm, senderId: e.target.value })}
            style={inputStyle}
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={addMessageForm.content}
            onChange={(e) => setAddMessageForm({ ...addMessageForm, content: e.target.value })}
            style={inputStyle}
          />
        </div>
        <div>
          <label>Tags:</label>
          <input
            type="text"
            value={addMessageForm.tags}
            onChange={(e) => setAddMessageForm({ ...addMessageForm, tags: e.target.value })}
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>Submit</button>
      </form>

      <form onSubmit={handleSubmit('getMessages')} style={formStyle}>
        <h2>Get Messages for Message Chain</h2>
        <div>
          <label>Message Chain ID:</label>
          <input
            type="text"
            value={getMessagesForm.messageChainId}
            onChange={(e) => setGetMessagesForm({ ...getMessagesForm, messageChainId: e.target.value })}
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
