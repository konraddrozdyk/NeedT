# NeedT: Healthcare Transport Coordination App

## Purpose

**NeedT** is a web application designed to enhance communication and coordination between healthcare departments, particularly for transporters responsible for moving patients across various hospital sections. Having firsthand experience in this field, the app addresses the challenges faced by healthcare workers in ensuring accurate and effective transportation requests.

### Key Features

- **Streamlined Request Creation**: Fill out a comprehensive form that ensures all critical information, such as infectious disease status, is captured.
- **Role-Specific Dashboards**:
  - **Transporter Dashboard**: View, accept, and manage transportation jobs.
  - **Orderer Dashboard**: Quickly create and monitor transportation requests.
  - **Admin Dashboard** (upcoming): Manage user accounts and oversee the system.
- **Real-Time Job Management**:
  - "Pending" transports: Available for transporters to accept.
  - "Accepted" transports: Assigned jobs displayed for the responsible transporter.

---

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Features](#features)
4. [Tech Stack](#tech-stack)
5. [Configuration](#configuration)
6. [Future Improvements](#future-improvements)
7. [Contributing](#contributing)
8. [License](#license)

---

## Installation

### Prerequisites

- Docker (for the database setup)
- Node.js and npm (for frontend dependencies)
- .NET SDK (for backend)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/konraddrozdyk/NeedT.git
   cd NeedT
   ```
2. Set up the backend:
   ```bash
   cd backend
   dotnet restore
   dotnet run
   ```
3. Set up the frontend:
   ```bash
   cd frontend
   npm install
   npm start
   ```
4. Run Docker for the database:
   ```bash
   docker-compose up
   ```
5. Access the application:
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:5000`

---

## Usage

### Logging In

- **Transporters**: Navigate to the dashboard to view and manage jobs.
- **Orderers**: Create detailed transportation requests through an intuitive form.
- **Admins**: (upcoming) Manage user accounts and system configurations.

### Dashboards

- **Transporter Dashboard**:
  - View all pending transportation requests.
  - Accept jobs and manage active assignments.
- **Orderer Dashboard**:
  - Create and track requests.
- **Admin Dashboard**:
  - Future feature to manage system users and roles.

---

## Features

- Role-based access control for transporters, orderers, and admins.
- Real-time updates on job statuses.
- Form validation to ensure accurate and complete request submissions.

---

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, TanStack Router.
- **Backend**: .NET, Entity Framework.
- **Database**: SQL Server (running in Docker).
- **Development Tools**:
  - Docker for containerized database setup.
  - Visual Studio Code for code editing.

---

## Configuration

### Environment Variables

Create a `.env` file in the root directory with the following keys:

```env
DATABASE_CONNECTION_STRING=<your-database-connection-string>
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:5013
```

---

## Future Improvements

- Add filtering options for transporters (e.g., priority jobs, location-based filtering).
- Mark jobs as "important" to highlight them at the top of the list.
- Prompt transporters when accepting multiple jobs to confirm the action.
- Integrate notifications for new jobs and updates.
- Cloud deployment to ensure scalability and reliability.

---

## Contributing

We welcome contributions to NeedT! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

