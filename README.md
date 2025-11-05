# Junior Web Developer Skill Test - John Rendel San Luis

A web application for managing trade fair exhibitors with search, filter, and CRUD operations.

## Project Overview

This application consists of:
- **Frontend**: Single-page application using HTML, Bootstrap 5.3, and jQuery
- **Backend**: Laravel 11 REST API
- **Database**: MySQL database for exhibitor data

## Features

- Display exhibitors in a responsive table
- Search exhibitors by name, country, or category
- Sort exhibitors by name, country, or category
- Create, read, update, and delete exhibitor records
- View exhibitor websites in new tabs
- Responsive design using Bootstrap 5.3

## Project Structure

```
/
├── index.html          # Frontend application
├── script.js           # Frontend JavaScript logic
├── trade_fair.sql      # Database setup script
└── backend/            # Laravel backend
    ├── app/
    │   ├── Http/Controllers/ExhibitorController.php
    │   └── Models/Exhibitor.php
    ├── database/migrations/
    ├── routes/
    │   ├── api.php
    │   └── web.php
    └── resources/views/welcome.blade.php
```

## Prerequisites

- PHP 8.1 or higher
- Composer
- Node.js and npm
- MySQL 8.0 or higher
- Git

## Installation & Setup

### 1. Database Setup

1. Create a MySQL database named `trade_fair`
2. Run the SQL script to create tables and insert sample data:
   ```sql
   mysql -u your_username -p trade_fair < trade_fair.sql
   ```

### 2. Backend Setup (Laravel)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install PHP dependencies:
   ```bash
   composer install
   ```

3. Copy environment file and configure database:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` file with your database credentials:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=trade_fair
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

5. Generate application key:
   ```bash
   php artisan key:generate
   ```

6. Run database migrations (optional, since we're using raw SQL):
   ```bash
   php artisan migrate
   ```

7. Install Node.js dependencies and build assets:
   ```bash
   npm install
   npm run build
   ```

8. Start the Laravel development server:
   ```bash
   php artisan serve
   ```

The backend API will be available at `http://localhost:8000`

### 3. Frontend Setup

The frontend files (`index.html` and `script.js`) are ready to use. Simply open `index.html` in a web browser or serve it through a web server.

## API Endpoints

### Exhibitors API

- `GET /api/exhibitors` - Get all exhibitors
- `GET /api/exhibitors/{id}` - Get specific exhibitor
- `POST /api/exhibitors` - Create new exhibitor
- `PUT /api/exhibitors/{id}` - Update exhibitor
- `DELETE /api/exhibitors/{id}` - Delete exhibitor

### Query Parameters

- `search` - Search by name, country, or category
- `sort_by` - Sort by field (name, country, category)
- `sort_order` - Sort order (asc, desc)

## Usage

1. Open `index.html` in your web browser
2. The application will load and display all exhibitors
3. Use the search bar to filter exhibitors
4. Use the sort dropdown to sort the results
5. Click "View Website" to open exhibitor websites
6. Use the "Add Exhibitor" button to create new records
7. Use the action buttons to edit or delete existing records

## Technologies Used

- **Frontend**:
  - HTML5
  - Bootstrap 5.3
  - jQuery 3.7.1
  - Font Awesome 6.0.0

- **Backend**:
  - Laravel 11
  - MySQL 8.0
  - PHP 8.1+

- **Development Tools**:
  - Composer
  - npm/Node.js
  - Git

## Database Schema

### exhibitors table

| Field    | Type          | Constraints |
|----------|---------------|-------------|
| id       | INT           | AUTO_INCREMENT, PRIMARY KEY |
| name     | VARCHAR(255)  | NOT NULL |
| country  | VARCHAR(100)  | NOT NULL |
| category | VARCHAR(100)  | NOT NULL |
| website  | VARCHAR(255)  | NULL |

## Sample Data

The application includes 7 sample exhibitors across different categories:
- Technology
- Manufacturing
- Fashion
- Agriculture
- Healthcare
- Education
- Energy

## Development Notes

- The frontend uses AJAX calls to interact with the Laravel API
- All CRUD operations are handled through the REST API
- The application is fully responsive and works on mobile devices
- Error handling is implemented for API calls
- Loading states are shown during data fetching

## Testing

Run the Laravel test suite:
```bash
cd backend
php artisan test
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is for educational purposes as part of a junior web developer skill test.
