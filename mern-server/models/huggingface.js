// huggingface.js
require('dotenv').config();


async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1",
        {
            headers: {
                Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(data),
        }
    );

    const text = await response.text(); // Get the raw text response
    console.log('response from Hugging Face API:', text);

    try {
        const result = JSON.parse(text); // Attempt to parse it as JSON
        return result;
    } catch (error) {
        console.error('Error parsing JSON response:', error);
        throw new Error('Invalid JSON response from Hugging Face API');
    }

    // const contentType = response.headers.get('content-type');
    // const text = await response.text(); // Get the raw text response

    // console.log('Raw response from Hugging Face API:', text);

    // if (response.ok) {
    //     if (contentType && contentType.includes('application/json')) {
    //         try {
    //             const result = JSON.parse(text); // Attempt to parse it as JSON
    //             return result;
    //         } catch (error) {
    //             console.error('Error parsing JSON response:', error);
    //             throw new Error('Invalid JSON response from Hugging Face API');
    //         }
    //     } else {
    //         console.error('Received non-JSON response from Hugging Face API:', text);
    //         throw new Error('Received non-JSON response from Hugging Face API');
    //     }
    // } else {
    //     console.error('HTTP Error:', response.status, response.statusText);
    //     throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
    // }
}

module.exports = { query };
