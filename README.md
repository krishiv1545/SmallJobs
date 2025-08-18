# SmallJobs - HangOut Platform

A modern web application for creating and joining virtual hangout rooms with real-time chat functionality. Built with Django backend and React frontend.

## 🚀 Features

### Authentication

- User registration and login system
- Session-based authentication with CORS support
- Secure password handling

### HangOut Rooms

- Create custom hangout rooms with unique tokens
- Join rooms via room tokens
- Real-time chat functionality
- Room management (create, delete)

### User Interface

- Modern, responsive design
- Glassmorphic UI elements
- Real-time chat with incoming/outgoing message bubbles
- Room catalog with search functionality

## 🛠️ Tech Stack

### Backend

- **Django 5.2.1** - Web framework
- **PostgreSQL** - Database
- **django-cors-headers** - CORS handling
- **django-environ** - Environment management

### Frontend

- **React 19.1.0** - UI framework
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **FontAwesome** - Icons

## 📋 Prerequisites

- Python 3.8+
- Node.js 16+
- PostgreSQL database
- Git

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/krishiv1545/SmallJobs.git
cd SmallJobs
```

### 2. Backend Setup

#### Install Python Dependencies

```bash
pip install -r requirements.txt
cd backend
```

#### Environment Configuration

```bash
# Copy the example environment file
cp env.example .env

# Edit .env with your database credentials
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=localhost
DB_PORT=5432
FRONTEND_URL=http://localhost:5173
```

#### Database Setup

```bash
# Create and apply migrations
python manage.py makemigrations
python manage.py migrate

# Create a superuser (optional)
python manage.py createsuperuser
```

#### Run Django Server

```bash
uvicorn SmallJobs.asgi:application --host 0.0.0.0 --port 8000
```

The backend will be available at `http://localhost:8000`

### 3. Frontend Setup

#### Install Node Dependencies

```bash
cd frontend
npm install
```

#### Run Development Server

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 🎯 Usage

### Getting Started

1. Open `http://localhost:5173` in your browser
2. Sign up for a new account or log in
3. Navigate to the HangOut section
4. Create a new room or join an existing one

### Creating a Room

1. Go to `/hangout/home`
2. Enter a room name in the "Create Room" form
3. Click "Create" to generate a new room
4. Copy the room token to share with others

### Joining a Room

1. Click "Jump To" on any room in your list
2. Or navigate directly to `/hangout/room/{room_token}`
3. Use the chat panel on the right to communicate

### Chat Features

- Send messages by typing and pressing Enter
- View incoming and outgoing message bubbles
- Real-time message updates (demo mode)

## 🔧 Configuration

### CORS Settings

The project is configured for cross-origin requests between frontend (port 5173) and backend (port 8000). CORS settings are in `backend/SmallJobs/settings.py`.

### Environment Variables

Key environment variables in `backend/.env`:

- `DB_NAME`, `DB_USER`, `DB_PASSWORD` - Database credentials
- `FRONTEND_URL` - Frontend URL for CORS
- `SECRET_KEY` - Django secret key

## 📁 Project Structure

```
SmallJobs/
├── backend/
│   ├── SmallJobs/          # Django project settings
│   ├── SmallJobsHome/      # Main app (auth, catalog)
│   ├── HangOut/           # HangOut rooms app
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── Base/          # Shared components (Navbar, Footer)
│   │   ├── SmallJobsHome/ # Home and catalog pages
│   │   ├── HangOut/       # HangOut room pages
│   │   └── utils/         # API utilities
│   ├── public/
│   └── package.json
└── README.md
```

## 🔌 API Endpoints

### Authentication

- `POST /auth/signup` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user info

### HangOut Rooms

- `GET /hangout/home/` - Get user's rooms
- `POST /hangout/create-room/` - Create new room
- `POST /hangout/delete-room/` - Delete room

### Catalog

- `GET /catalog/` - Get available services

## 🚀 Deployment

### Production Considerations

1. Set `DEBUG=False` in Django settings
2. Configure proper database credentials
3. Set up HTTPS for production
4. Update CORS settings for production domain
5. Configure static file serving
6. Set up proper session and CSRF settings

### Environment Variables for Production

```env
DEBUG=False
SECRET_KEY=your-production-secret-key
FRONTEND_URL=https://yourdomain.com
DB_HOST=your-production-db-host
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:

1. Check the existing issues
2. Create a new issue with detailed description
3. Include error logs and steps to reproduce

## 🔄 Development Workflow

### Backend Development

```bash
cd backend
python manage.py runserver
```

### Frontend Development

```bash
cd frontend
npm run dev
```

### Database Changes

```bash
cd backend
python manage.py makemigrations
python manage.py migrate
```

### Static Files (Production)

```bash
cd frontend
npm run build
cd ../backend
python manage.py collectstatic
```
