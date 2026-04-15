# Lendsqr Dashboard

An admin dashboard for managing lending platform users, built with React, TypeScript, and SCSS.

## Description

This application provides a lending admin interface for Lendsqr's platform. It now includes a post-login Dashboard summary page, a responsive users data table with filtering, detailed user profiles, and persistent data storage using localStorage. The application demonstrates modern React development practices with a focus on code quality, accessibility, and maintainability.

## Architecture

The application follows **SOLID principles** with a **component-driven architecture**:

1. **Presentation Layer** - Reusable UI components (Button, Input, Table, Badge, etc.)
2. **Business Logic Layer** - Custom React hooks for data management and storage
3. **Data Layer** - Mock API with 500 user records, localStorage for persistence
4. **Routing Layer** - React Router for navigation.

Each layer maintains single responsibility with clear interfaces, ensuring scalability and ease of testing.

## Features

- **Dashboard Overview** - View key summary metrics and recent loan requests
- **User Management** - View and filter 500 user records
- **Advanced Filtering** - Filter by organization, username, email, phone, status, and date
- **Pagination** - Configurable page sizes (10, 25, 50, 100 records per page)
- **User Details** - Comprehensive user profile with tabs for different information sections
- **Persistent Storage** - localStorage integration for user data across sessions
- **Responsive Design** - Fully responsive across desktop, tablet, and mobile devices
- **Accessibility** - WCAG compliant with proper ARIA attributes and keyboard navigation
- **Type Safety** - Full TypeScript coverage with strict mode enabled
- **Client-side Navigation** - Sidebar routing uses React Router without full page refreshes

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/lendsqr-fe-test.git

# Navigate to project directory
cd lendsqr-fe-test

# Install dependencies
npm install
```

## Configuration

The application uses SCSS variables for consistent theming. Update design tokens in `src/styles/abstracts/_variables.scss` if needed:

```scss
// Primary colors
$color-primary: #39cdcc;
$color-text-primary: #213f7d;

// Status colors
$color-status-active: #39cd62;
$color-status-pending: #e9b200;
$color-status-inactive: #e4033b;
```

## Usage

### Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Run Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test -- --watch
```

## How to Login

To access the application, use any valid email address and a password that meets the requirements. This should suffice for logging in.

After successful login, users are redirected to `/dashboard`.

Sample credentials:

- Email: johndoe@gmail.com
- Password: Johndoe123#

## Testing

The application includes comprehensive unit tests covering:

- **Components** - Button, BaseInput, FormInput, Dashboard components
- **Hooks** - useUsersQuery, useUserStorage, useUserDetails
- **Views** - Dashboard view scenarios (rendering, fallback states, and summary table behavior)

Run `npm test` to execute the test suite.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Generic components (Button, Input, Table, etc.)
│   ├── layout/         # Layout components (Sidebar, Navbar)
├── hooks/              # Custom React hooks
│   ├── useUserStorage.ts    # localStorage operations
│   ├── useUserDetails.ts    # User data management
│   └── useDataTable.ts      # Table state management
├── modules/            # Feature modules
│   ├── login/          # Login module
│   │   ├── components/ # Login components
│   │   ├── hooks/      # Login hooks
│   │   ├── utils/      # Login utilities
│   │   └── views/      # Login views
│   ├── dashboard/      # Dashboard module
│   │   ├── components/ # Dashboard-specific components
│   │   ├── constants/  # Dashboard mock data
│   │   ├── utils/      # Dashboard types
│   │   └── views/      # Dashboard views
│   └── users/          # User management module
│       ├── components/ # Module-specific components
│       ├── views/      # User views (List, Details)
│       └── utils/      # Type definitions and helpers
├── router/             # Route definitions
├── styles/             # SCSS architecture
│   ├── abstracts/      # Variables, mixins, functions
│   ├── base/           # Reset, typography, global styles
│   └── main.scss       # Main stylesheet
└── assets/             # Static assets (images, icons, fonts)
```

## Key Technologies

- **React** - UI library
- **TypeScript** - Type safety and improved DX
- **SCSS** - Maintainable styling
- **React Router** - Client-side routing
- **TanStack Table** - Table management
- **Vitest** - Unit testing framework
- **Vite** - Lightning-fast build tool

## Requirements

- Node.js 18+
- npm 9+
