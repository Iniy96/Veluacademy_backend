
import csvParser from 'csv-parser';
import pool from '../../db/connect.js';


export const fileupload = async (req, res) => {
    try {
        // Check if there is a file in the request
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        // Do something with the file, for example, save it to disk or process it
        // Parse the CSV file
        const data = [];
        const csvString = req.file.buffer.toString();
        const lines = csvString.split('\n');

        // Assuming the first line is the header with column names
        const header = lines[0].split(',');

        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');

            // Skip empty lines
            if (values.length !== header.length) {
                continue;
            }

            const row = {};

            for (let j = 0; j < header.length; j++) {
                row[header[j]?.trim()] = values[j].trim();
            }

            data.push(row);
        }

        // Upload data to MySQL

        try {

            // Iterate over the data and insert into the database
            for (const row of data) {
                const query = 'INSERT INTO questions (question, answer, option_1, option_2, option_3, option_4, testID) VALUES (?, ?,?,?,?,?,?)';
                const values = [row.question, row.answer, row.option_1, row.option_2, row.option_3, row.option_4, row.testID]; // Adjust column names and values accordingly

                const [result] = await pool.query(query, values)
            }


        } catch (error) {
            res.json(error);

        }







        // Respond with a success message
        res.status(200).json({ message: 'data uploaded successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}