import React, { useState } from 'react';
import axios from 'axios';

const Email = () => {
    const [email, setEmail] = useState({ from: '', to: '', subject: '', text: '' });
    const [alertMessage, setAlertMessage] = useState(null);

    const handleChange = (e) => {
        setEmail({ ...email, [e.target.name]: e.target.value });
    };

    const handleSend = async () => {
        try {
            const response = await axios.post('http://localhost:5000/predict', { email: email.text });
            if (response.data.result === 'Spam mail') {
                setAlertMessage('Your email may be considered as spam. Are you sure you want to send it?');
            } else {
                sendEmail();
            }
        } catch (error) {
            console.error('Error checking spam:', error.response ? error.response.data : error.message);
            setAlertMessage("There was an error with spam detection. Please try again later.");
        }
    };



    const sendEmail = async () => {
        try {
            // Proceed to send email via the Node.js backend
            await axios.post('http://localhost:3001/send-email', email);
            alert('Email sent successfully!');
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send email.');
        }
    };

    return (
        // <div>
        //     <h2>Compose Email</h2>
        //     <input type="email" name="from" placeholder="From" value={email.from} onChange={handleChange} />
        //     <input type="email" name="to"  value={email.to} onChange={handleChange} />
        //     <input type="text" name="subject" value={email.subject} onChange={handleChange} />
        //     <textarea name="text" value={email.text} onChange={handleChange} />
        //     <button onClick={handleSend}>Send</button>

        //     {alertMessage && (
        //         <div>
        //             <p>{alertMessage}</p><br />
        //             <button onClick={() => setAlertMessage(null)}>Cancel</button> <br />
        //             <button onClick={() => { setAlertMessage(null); sendEmail(); }}>Proceed Anyway</button>
        //         </div>
        //     )}

        // </div>

        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">

                <div className="py-2">
                    {/* <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">From</label> */}
                    <input type="email" name="from" id="email" value={email.from} onChange={handleChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder='From' required />
                </div>
                <div className="py-2">
                    {/* <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">To</label> */}
                    <input type="email" id="email" name="to" value={email.to} onChange={handleChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder='To' required />
                </div>
                <div className="py-2">
                    {/* <label for="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label> */}
                    <input type="text" id="subject" name="subject" value={email.subject} onChange={handleChange} className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder='Subject' required />
                </div>
                <div className="py-2 sm:col-span-2">
                    {/* <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Text</label> */}
                    <textarea id="message" rows="6" name="text" value={email.text} onChange={handleChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder='Text' required></textarea>
                </div>
                <button onClick={handleSend} className="py-3 mb-4 mt-2 px-5 text-sm font-medium text-center text-white rounded bg-blue-500 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send message</button>

                {alertMessage && (
                    <div>
                        <p className='text-red-600'>{alertMessage}</p><br />
                        <button className="mr-2 py-3 px-5 text-sm font-medium text-center text-white rounded bg-gray-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={() => setAlertMessage(null)}>Cancle</button>
                        <button className="py-3 px-5 text-sm font-medium text-center text-white rounded bg-blue-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={() => { setAlertMessage(null); sendEmail(); }}>Proceed Anyway</button>
                    </div>
                )}

            </div>
        </section>

    );
}

export default Email









