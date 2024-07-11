const db = require('../models/db');

exports.createPoll = (req, res) => {
    const { title, userID, options } = req.body;


    db.query('SELECT * FROM users WHERE id = ?', [userID], (err, results) => {
        if (err) {
            console.error('Error checking userID:', err.stack);
            return res.status(500).json({ error: 'Error creating poll' });
        }

        if (results.length === 0) {
            return res.status(400).json({ error: 'Invalid userID' });
        }

        // Insert the new poll
        db.query('INSERT INTO polls (title, userID, createdate, islock) VALUES (?, ?, NOW(), false)', [title, userID], (err, result) => {
            if (err) {
                console.error('Error creating poll:', err.stack);
                return res.status(500).json({ error: 'Error creating poll' });
            }

            const pollID = result.insertId;

            // Insert options
            const values = options.map(option => [option, new Date(), pollID]);
            db.query('INSERT INTO options (content, created, pollID) VALUES ?', [values], (err, results) => {
                if (err) {
                    console.error('Error inserting options:', err.stack);
                    return res.status(500).json({ error: 'Error creating poll options' });
                }
                res.status(201).json({ message: 'Poll created successfully' });
            });
        });
    });
};
