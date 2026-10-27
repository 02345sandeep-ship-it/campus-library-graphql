# Campus Library Management System — GraphQL

A simple Library Management System built using **GraphQL, Node.js, Apollo Server, and MySQL**. This project demonstrates how to manage library books and authors through GraphQL queries and mutations.

## 🚀 Features

- Fetch all authors and their books.
- Retrieve book details using GraphQL queries.
- Add and manage library data using GraphQL.
- Store book and author information in a MySQL database.
- Test GraphQL APIs using Apollo Sandbox.
- Simple frontend built with HTML, CSS, and JavaScript.

## 🛠️ Tech Stack

- **Backend:** Node.js, Apollo Server, GraphQL
- **Database:** MySQL
- **Frontend:** HTML, CSS, JavaScript
- **Tools:** VS Code, npm, Git, GitHub, Apollo Sandbox

## 📁 Project Structure

```text
CampusLibrary/
├── public/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── server.js
├── db.js
├── schema.sql
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/02345sandeep-ship-it/campus-library-graphql.git
cd campus-library-graphql
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example environment file:

**Windows CMD:**
```cmd
copy .env.example .env
```

Open `.env` and configure your MySQL username and password according to your local setup.

Example:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=gqldemo
PORT=4000
```

Use the variable names already defined in your project's `.env.example` file if they differ from this example.

### 4. Create the database

Open MySQL and create the database:

```sql
CREATE DATABASE gqldemo;
```

Then, from the project folder, import the schema:

```bash
mysql -u root -p gqldemo < schema.sql
```

Enter your MySQL password when prompted.

### 5. Start the server

```bash
npm start
```

Open Apollo Sandbox in your browser:

http://localhost:4000/

## 🔍 Example GraphQL Query

Fetch authors and their books:

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

This query retrieves author information along with the books associated with each author.

## 🖥️ Run the Frontend

Open `public/index.html` in your browser, or use the VS Code Live Server extension if required by your project setup.

Keep the backend server running while testing frontend functionality.

## 🎯 Learning Outcomes

- Understanding GraphQL schemas, queries, and mutations.
- Connecting a Node.js backend to a MySQL database.
- Building and testing APIs with Apollo Server.
- Integrating a frontend with backend APIs.
- Using Git and GitHub for version control.

## 👨‍💻 Author

**Sandeep Gupta**

GitHub: [02345sandeep-ship-it](https://github.com/02345sandeep-ship-it)

---

*This project was developed for learning and practicing GraphQL API development and database integration.*
