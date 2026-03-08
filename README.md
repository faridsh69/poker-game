# Poker Game Full Stack Application

A full-stack poker game application built with NestJS (backend) and React + Vite (frontend).

## Project Structure

- `/back` - NestJS backend application
- `/front` - React + Vite frontend application

## Prerequisites

Make sure you have the following installed on your system:

- Node.js (v14 or higher)
- PostgreSQL or your configured database service

## Installation and Setup

### 1. Install Dependencies

Install dependencies for both backend and frontend applications:

```bash
# Install backend dependencies
cd back
yarn install

# Install frontend dependencies
cd ../front
pnpm install
```

### 2. Environment Configuration

Copy the environment configuration files for both applications:

#### Backend

```bash
# Navigate to the back directory
cd back

# Copy the example environment file (if available)
cp .env.example .env
```

**Required Environment Variables** (configure in `back/.env`):

- Database connection settings
- JWT secrets
- API port configuration
- Any third-party service credentials

#### Frontend

```bash
# Navigate to the front directory
cd front

# Copy the example environment file (if available)
cp .env.example .env
```

**Required Environment Variables** (configure in `front/.env`):

- Backend API endpoint
- Any other client-side configuration

### 3. Database Setup and Migrations

After configuring the backend environment variables:

```bash
# Navigate to the back directory
cd back

# Run NestJS seed
yarn run seed
```

player 1 email: farid.sh69@gmail.com
player 1 password: Aa11

player 2 email: player2@gmail.com
player 1 password: Aa11

## Running the Applications

### Backend (NestJS)

```bash
cd back

# Development mode with hot reload
yarn start:dev

# Production mode
yarn build
yarn start:prod
```

The backend will be running on the configured port (typically `http://localhost:3000`).

### Frontend (React + Vite)

```bash
cd front

# Development mode with hot reload
yarn dev

# Build for production
yarn build

# Preview the production build locally
yarn preview
```

The frontend will be running at `http://localhost:2000` (or the configured port).

## Running Both Applications Together

For development, open two terminal windows:

**Terminal 1 - Backend:**

```bash
cd back
yarn start:dev
```

**Terminal 2 - Frontend:**

```bash
cd front
yarn dev
```

## Common Tasks

### Backend

```bash
# Run tests
yarn test

# Run tests in watch mode
yarn test:watch

# Build the application
yarn build

# Format code with Prettier
yarn format

# Lint code with ESLint
yarn lint
```

### Frontend

```bash
# Run tests
yarn test

# Build for production
yarn build

# Preview production build
yarn preview

# Format code
yarn format

# Lint code
yarn lint
```

## Troubleshooting

### Database Connection Issues

- Verify your database service is running
- Check database credentials in `.env` file
- Ensure the database exists or migrations will create it

### Port Already in Use

- Change the port in your `.env` configuration
- Or kill the process using the port

### Migration Errors

- Check your database schema is up to date
- Ensure all required environment variables are set
- Verify database user has proper permissions

### Dependency Issues

- Clear node_modules: `rm -rf node_modules yarn.lock`
- Reinstall dependencies: `yarn install`

## Project Architecture

### Backend (NestJS)

- **Controllers** - Handle HTTP requests
- **Services** - Core business logic
- **Models/Entities** - Database schema definitions
- **Modules** - Feature-based organization
- **Guards** - Authentication and authorization
- **Middlewares** - Request/response processing
- **Providers** - WebSocket gateway and other services

### Frontend (React + Vite)

- **Components** - Reusable UI components
- **Contexts** - Global state management
- **Hooks** - Custom React hooks
- **Services** - API communication
- **Configs** - Application configuration
- **Locales** - Internationalization

## Additional Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Yarn Documentation](https://yarnpkg.com/)

## License

[Add your license information here]

## Contributing

[Add your contribution guidelines here]
