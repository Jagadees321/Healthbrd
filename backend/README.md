# Healthbrd Backend

A comprehensive backend API for the Healthbrd Campaign Management System built with Express.js and MongoDB.

## Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **Campaign Management**: Create, update, and manage health campaigns
- **Medical Content Management**: Upload, approve, and manage medical content
- **HCP Engagement Tracking**: Monitor healthcare professional engagement
- **Patient Analytics**: Track patient engagement and content performance
- **Dashboard Analytics**: Comprehensive metrics and insights
- **File Upload Support**: Handle medical content files with validation
- **Audit Logging**: Complete audit trail for compliance

## Tech Stack

- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Multer** for file uploads
- **Express Validator** for input validation
- **Helmet** for security
- **CORS** for cross-origin requests
- **Morgan** for logging

## Installation

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp config.env.example config.env
   ```
   Edit `config.env` with your configuration:
   ```
   NODE_ENV=development
   PORT=4000
   MONGODB_URI=mongodb://localhost:27017/healthbrd
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=7d
   MAX_FILE_SIZE=10485760
   UPLOAD_PATH=./uploads
   FRONTEND_URL=http://localhost:5173
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Seed the database**
   ```bash
   npm run seed
   ```

6. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Campaigns
- `GET /api/campaigns` - Get all campaigns
- `GET /api/campaigns/:id` - Get single campaign
- `POST /api/campaigns` - Create campaign (Marketing only)
- `PUT /api/campaigns/:id` - Update campaign (Marketing only)
- `DELETE /api/campaigns/:id` - Delete campaign (Marketing only)
- `PUT /api/campaigns/:id/status` - Update campaign status

### Medical Content
- `GET /api/medical/content` - Get medical content
- `POST /api/medical/content` - Upload content (Medical only)
- `PUT /api/medical/content/:id/approve` - Approve/reject content
- `PUT /api/medical/content/:id/toggle-label` - Toggle on/off label
- `GET /api/medical/audit-logs` - Get audit logs
- `PUT /api/medical/content/:id/reminder` - Update reminder frequency

### HCP Management
- `GET /api/hcp` - Get all HCPs
- `GET /api/hcp/:id` - Get single HCP
- `POST /api/hcp` - Create HCP
- `PUT /api/hcp/:id` - Update HCP
- `PUT /api/hcp/:id/engagement` - Update engagement metrics
- `GET /api/hcp/analytics/summary` - Get HCP analytics
- `GET /api/hcp/engagement/top` - Get top engaged HCPs
- `GET /api/hcp/engagement/least` - Get least engaged HCPs

### Patient Engagement
- `GET /api/patients/engagement` - Get engagement data
- `POST /api/patients/engagement` - Create engagement record
- `PUT /api/patients/engagement/:id` - Update engagement record
- `GET /api/patients/analytics` - Get patient analytics

### Dashboard
- `GET /api/dashboard/metrics` - Get dashboard metrics
- `GET /api/dashboard/campaigns` - Get campaign data
- `GET /api/dashboard/alerts` - Get alerts
- `GET /api/dashboard/roi-signals` - Get ROI signals
- `POST /api/dashboard/metrics/update` - Update metrics

## Database Models

### User
- Authentication and user management
- Role-based access (marketing/medical)

### Campaign
- Health campaign management
- Therapy areas, cities, reach metrics

### HCP (Healthcare Professional)
- Doctor profiles and engagement tracking
- Specialty and city information

### MedicalContent
- Medical content upload and approval workflow
- File management and expiry tracking

### PatientEngagement
- Patient interaction tracking
- Content performance metrics

### AuditLog
- Complete audit trail for compliance
- Action tracking and timestamps

### DashboardMetrics
- Aggregated metrics for dashboards
- Performance indicators

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-based Authorization**: Different access levels for marketing/medical teams
- **Input Validation**: Comprehensive validation using express-validator
- **Rate Limiting**: Protection against abuse
- **Helmet**: Security headers
- **CORS**: Controlled cross-origin access
- **File Upload Security**: File type and size validation

## File Upload

The system supports file uploads for medical content with:
- Multiple file types (images, PDFs, videos, documents)
- Size limits (configurable, default 10MB)
- Secure file storage
- File metadata tracking

## Error Handling

Comprehensive error handling with:
- Validation errors
- Authentication errors
- Authorization errors
- Database errors
- File upload errors
- Custom error messages

## Development

### Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with sample data

### Environment Variables
All configuration is handled through environment variables for security and flexibility.

## Testing

Test credentials (after seeding):
- **Marketing User**: marketing@healthbrd.com / password123
- **Medical User**: medical@healthbrd.com / password123

## API Response Format

All API responses follow a consistent format:

```json
{
  "status": "success|error",
  "message": "Human readable message",
  "data": {
    // Response data
  },
  "errors": [] // Only present on validation errors
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
