 Booking Backend

This is the backend of the Booking Table project, built with Express.js and PostgreSQL.
It provides APIs for managing sessions (events), users, and reservations.

 Features

User authentication and session management

Create / update / delete sessions

Store session details: title, description, invited people, start & end time

PostgreSQL as the main database

RESTful API design

Ready to connect with the frontend (React + FullCalendar)

 Tech Stack

Node.js

Express.js

PostgreSQL (with pg / sequelize / pgvector if needed)

TypeScript (if your backend is TS)

dotenv for environment variables

⚙️ Setup
1. Clone the repository
git clone https://github.com/your-username/booking-backend.git
cd booking-backend

2. Install dependencies
npm install

3. Setup environment variables

Create a .env file in the root directory:

PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=booking_db

4. Run database migrations (if using Sequelize/Prisma)
npx sequelize db:migrate

or

npx prisma migrate dev

5. Start the server
npm run dev


 Development

Run the server in watch mode:

npm run dev


Format code:

npm run format

📜 License

This project is licensed under the MIT License.
