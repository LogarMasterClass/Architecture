import express from 'express';
import { Request, Response } from 'express';
import { resolve } from 'url';
const sqlite3 = require('sqlite3')

const app = express();
const port = process.env.PORT || '8080';
app.use(express.json());

let db = new sqlite3.Database("./mydb.sqlite3", (err: any) => { 
    if (err) { 
        console.log('Error when creating the database', err) 
    } else { 
        console.log('Database created!') 
        /* Put code to create table(s) here */
        createTable()
    } 
});

const createTable = () => {
    db.run("CREATE TABLE IF NOT EXISTS contacts(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, phone TEXT)");
}

const insertData = (name: string, phone: string) => db.run('INSERT INTO contacts (name, phone) VALUES (?, ?)', [name, phone]);


const read = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT rowid AS id, name, phone FROM contacts", function(err: any, rows: any[]) {
            if (err) reject(err);
            if (rows) resolve(rows);
        });
    })
}

app.get('/', async (req: Request, res: Response) => {
    const rows: any[] = await read() as any[];
    res.send(
        `<html>
            <body>
                <table border="1" width="600">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PHONE</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows.map(r => `<tr>
                            <td>${r.id}</td>
                            <td>${r.name}</td>
                            <td>${r.phone}</td>
                        </tr>`).join('')}
                    </body>
                </table>
            </body>
        </html>`
    );
} );

app.post('/contact', async (req: Request, res: Response) => {
    const { name, phone } = req.body;
    await insertData(name, phone);
    res.send();
} );

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});