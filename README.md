# PulseCare

## Overview

PulseCare is a full-stack blood donation management platform designed to connect blood donors with recipients efficiently and securely. The platform enables users to create blood requests, manage donation activities, discover active requests, and contribute to life-saving initiatives through a modern and responsive web application.

The system incorporates authentication, role-based access control (RBAC), request management, user administration, and online funding support to provide a complete blood donation ecosystem.

---

## Live Demo

Frontend: `https://pulsecare-client-chi.vercel.app`

Backend API: `https://pulsecare-server-sable.vercel.app`

---

## Features

### Authentication & Authorization

- Secure user authentication
- JWT-based API authorization
- Role-Based Access Control (RBAC)
- Protected routes for authenticated users
- Role-specific dashboard functionalities

### User Roles

| Role | Permissions |
|------|-------------|
| Donor | Create and manage blood requests, update profile, donate to requests |
| Volunteer | Access donor features and manage users |
| Admin | Full system control including user management and moderation |

### Blood Request Management

- Create blood donation requests
- Update existing requests
- Delete requests
- View personal requests with pagination
- Browse all public blood requests
- Accept donation requests
- View detailed request information

### User Management

- View all registered users
- Promote donors to volunteers
- Ban users
- Delete users
- Exclude administrators from accidental management actions

### Profile Management

- Update personal information
- Upload profile image
- Manage blood group and location information

### Funding System

- Stripe payment gateway integration
- Secure donation checkout process
- Success and cancellation handling

### Additional Features

- Server-side rendering (SSR)
- Responsive design for mobile, tablet, and desktop devices
- Pagination for large datasets
- Toast notifications
- Loading states and error handling
- Modern dashboard UI

---

## Technology Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| Next.js 15 | React framework |
| React | User interface development |
| Tailwind CSS | Styling |
| shadcn/ui | Reusable UI components |
| Lucide React | Icon library |
| React Hook Form | Form management |
| Sonner | Notifications |
| date-fns | Date formatting |

### Backend

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Express.js | REST API development |
| MongoDB | Database |
| MongoDB Atlas | Cloud database hosting |
| JOSE | JWT verification |

### Authentication

| Technology | Purpose |
|------------|---------|
| Better Auth | Authentication and session management |
| JWT | API security |

### Payment

| Technology | Purpose |
|------------|---------|
| Stripe | Online payments and donations |

---

## Project Structure

```bash
pulsecare/
├── frontend_pulsecare/
├── backend_pulsecare/
└── README.md
```

---

## Environment Variables

### Frontend

```env
NEXT_PUBLIC_SERVER_URL=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

### Backend

```env
PORT=
MONGO_STRING=
FRONTEND_URL=
```

---

## Installation

```bash
git clone https://github.com/jawadjb21/pulsecare_client
npm install


git clone https://github.com/jawadjb21/pulsecare_server
npm install
```

---

## Running the Application

### Backend

```bash
nodemon index.js
```

### Frontend

```bash
npm run dev
```

---

## API Endpoints

### Requests

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/requests` | Retrieve all requests |
| GET | `/requests/:id` | Retrieve request details |
| GET | `/requests/user` | Retrieve current user's requests |
| POST | `/requests` | Create a new request |
| PATCH | `/requests/:id` | Update a request |
| DELETE | `/requests/:id` | Delete a request |

### Users

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/users` | Retrieve all users |
| PATCH | `/users/:id` | Update user information |
| DELETE | `/users/:id` | Delete user |

---

## Security Features

- JWT verification for protected APIs
- Role-based route protection
- Server-side authorization checks
- Secure environment variable management
- Authentication middleware for private routes

---

## Future Improvements

- Search and filtering system
- Blood request approval workflow
- Donation history tracking
- Email notifications
- Real-time chat between donor and recipient
- Analytics dashboard
- Admin reporting tools

---

## Author

**Jawad Bin Jahangir**

---

## License

This project is licensed under the MIT License.
