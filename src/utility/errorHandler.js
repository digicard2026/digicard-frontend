
export function throwError(status, customMessages = {}) {
    const defaultMessages = {
        400: 'Bad Request (400)',
        401: 'Unauthorized (401)',
        403: 'Forbidden (403)',
        404: 'Not Found (404)',
        500: 'Internal Server Error (500)',
    };

    // Combine default and custom messages, prioritizing custom messages
    const messages = { ...defaultMessages, ...customMessages };

    // Check if a message exists for the status; otherwise, use a generic message
    const message = messages[status] || `HTTP Error! Status: ${status}`;

    throw new Error(message);
}
