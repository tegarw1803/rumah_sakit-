# RS Sehat Selalu - Hospital Management System

A full-stack hospital management web application with public interface and admin panel.

## Features

### Public Interface
- Modern, responsive landing page with dark mode support
- Hero section with call-to-action
- Hospital profile and statistics
- Medical services listing
- Doctor directory with photos and schedules
- Appointment booking system
- Contact information
- Professional footer with social links

### Admin Panel
- Dashboard with statistics and summaries
- Doctor management (CRUD with photo upload)
- Schedule management (CRUD with filters)
- Appointment management (status updates, filters)
- Content management (CMS for website sections)
- Site settings (branding, theme, notifications)
- JWT-based authentication
- Protected routes with middleware

## Technology Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS 4, shadcn/ui, Lucide Icons
- **Backend**: Next.js API Routes
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT with bcryptjs (HTTP-only cookies)
- **State**: React hooks, Zustand client state

## Getting Started

### Installation

```bash
# Install dependencies
bun install

# Set up database
bun prisma db push

# Seed initial data (creates admin user and sample data)
bun run prisma/seed.ts
```

### Running the Application

```bash
# Development server (already running on port 3000)
bun run dev
```

### Default Admin Credentials

- **Email**: admin@rs.com
- **Password**: admin123

> ⚠️ **Important**: Change the admin password in production!

## Database Schema

The application includes the following models:

- **Admin**: System administrators with authentication
- **Doctor**: Medical staff with schedules and appointments
- **DoctorSchedule**: Doctor practice schedules
- **Appointment**: Patient appointments with status tracking
- **PageSection**: CMS content sections (hero, profile, contact)
- **SiteSetting**: Configuration settings
- **Service**: Medical services offered
- **Branding**: Brand assets and social media links

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout

### Public APIs (No Authentication Required)
- `GET /api/public/doctors` - Get active doctors with schedules
- `POST /api/public/appointments` - Create appointment

### Admin APIs (Authentication Required)
- `GET/POST /api/doctors` - List/create doctors
- `GET/PATCH/DELETE /api/doctors/[id]` - Doctor details
- `GET/POST /api/schedules` - List/create schedules
- `GET/PATCH/DELETE /api/schedules/[id]` - Schedule details
- `GET/POST /api/appointments` - List/create appointments
- `GET/PATCH/DELETE /api/appointments/[id]` - Appointment details

## Project Structure

```
/home/z/my-project/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts              # Seed script
├── src/
│   ├── app/
│   │   ├── page.tsx          # Public landing page
│   │   ├── admin/            # Admin panel
│   │   │   ├── login/        # Admin login
│   │   │   ├── dashboard/    # Admin dashboard
│   │   │   ├── doctors/      # Doctor management
│   │   │   ├── schedules/    # Schedule management
│   │   │   ├── appointments/ # Appointment management
│   │   │   ├── content/      # CMS
│   │   │   └── settings/     # Site settings
│   │   └── api/             # API routes
│   │       ├── auth/         # Authentication APIs
│   │       ├── doctors/      # Doctor APIs
│   │       ├── schedules/    # Schedule APIs
│   │       ├── appointments/ # Appointment APIs
│   │       └── public/       # Public APIs
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   └── theme-provider.tsx # Theme context
│   └── lib/
│       ├── db.ts             # Prisma client
│       ├── auth.ts           # JWT auth utilities
│       └── utils.ts         # Utility functions
├── public/                  # Static assets
└── db/                     # SQLite database
```

## Design Features

### Color Scheme
- Primary colors: Cyan (#06b6d4) and Teal (#14b8a6)
- Dark mode support with neon glow effects
- Gradient backgrounds
- Hover effects with cyan/teal transitions

### UI Components
- shadcn/ui component library
- Lucide icons
- Responsive cards and dialogs
- Form validation with error handling
- Toast notifications

### Accessibility
- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- Focus management

## Development

### Available Scripts

```bash
# Development
bun run dev

# Linting
bun run lint

# Database
bun run db:push

# Seeding
bun run prisma/seed.ts
```

### Code Style
- TypeScript strict mode enabled
- ESLint with Next.js rules
- Prettier formatting
- Semantic HTML

## Security

- Passwords hashed with bcryptjs
- JWT tokens for authentication
- HTTP-only cookies for sessions
- Protected admin routes
- Input validation and sanitization
- SQL injection prevention (Prisma ORM)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

### Production Build

```bash
# Build the application
bun run build

# Start production server
bun run start
```

### Environment Variables

Create a `.env` file with:

```
DATABASE_URL="file:./db/custom.db"
JWT_SECRET="your-secret-key-change-in-production"
NODE_ENV="production"
```

## Future Enhancements

- Email notifications for appointments
- SMS integration for reminders
- File upload for doctor photos
- Advanced reporting and analytics
- Patient portal
- Medical records integration
- Payment processing
- Mobile app

## Support

For issues and questions, please contact the development team.

---

**Developed with ❤️ using Next.js 15 and shadcn/ui**
