# Campus Library — GraphQL + MySQL (CS543)

A small hands-on project based on the CS543 GraphQL tutorial: HTML/CSS/JavaScript frontend → GraphQL API (Node.js + Apollo Server) → MySQL database.

## Requirements
- Node.js 18 or newer and npm
- MySQL Community Server running locally
- VS Code (recommended) and Live Server extension (or any static HTTP server)

## 1. Install dependencies
Open a terminal in this project folder and run:

```bash
npm install
```

## 2. Create the database and sample data
1. Open MySQL Workbench or a terminal logged into MySQL as a user allowed to create databases.
2. Run the complete contents of `schema.sql`.
   - In MySQL terminal, you can run `SOURCE C:/full/path/to/campus-library/schema.sql;` using the actual path.
   - In MySQL Workbench, open `schema.sql` and click the lightning bolt (Execute).
3. The script creates database `gqldemo`, tables `authors` and `books`, and sample rows.

## 3. Configure credentials
1. Copy `.env.example` to a new file named `.env` in the project root.
2. Edit `.env` and set `DB_USER`, `DB_PASSWORD`, and other values to match your local MySQL setup.
3. Do not share or commit your `.env` file.

Example:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_actual_mysql_password
DB_NAME=gqldemo
PORT=4000
```

## 4. Start the GraphQL API
In the project root, run:

```bash
npm start
```

Expected output:
`GraphQL API ready at http://localhost:4000/`

Keep this terminal open. Visit http://localhost:4000/ to open Apollo Sandbox and test GraphQL queries.

Example query:
```graphql
query {
  authors {
    name
    country
    books {
      title
      year
    }
  }
}
```

Example mutation:
```graphql
mutation {
  addBook(title: "GraphQL for Beginners", year: 2025, authorId: "2") {
    id
    title
    year
  }
}
```

## 5. Start the frontend
- In VS Code, install the **Live Server** extension if needed.
- Open `public/index.html`, right-click it, and choose **Open with Live Server**.
- Keep the API terminal running. The frontend expects the API at `http://localhost:4000/`.

You should see author cards and a form to add a book. Added books are saved in MySQL and appear after refresh.

## Troubleshooting
- **Access denied for user**: verify `DB_USER` and `DB_PASSWORD` in `.env`.
- **ECONNREFUSED / connect ECONNREFUSED 127.0.0.1:3306**: start MySQL Server and confirm its port.
- **Unknown database `gqldemo` / table doesn't exist**: execute `schema.sql`.
- **Port 4000 already in use**: set a different `PORT` in `.env` and also update `API_URL` in `public/app.js` to the same port.
- **Frontend says API unavailable**: start the API, check `http://localhost:4000/`, then reload the frontend.
- If MySQL CLI isn't recognized, use MySQL Workbench to execute `schema.sql`.
