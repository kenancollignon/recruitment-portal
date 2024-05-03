const BASE_URL = 'https://localhost:8000/api';

export const submitFormData = async (formData, endpoint, method) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Data received from API:', data);
    return data;
  } catch (error) {
    console.error('Error submitting form data:', error);
    return null;
  }
};
