# LinkFolio API Documentation

## Base URL
```
http://localhost:3001/api
```

## Authentication

### Signup
```http
POST /auth/signup
Content-Type: application/json

{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "user": {
    "id": "string",
    "username": "string",
    "email": "string",
    "role": "student"
  },
  "token": "jwt_token"
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "string",
    "username": "string",
    "email": "string",
    "role": "student"
  },
  "token": "jwt_token"
}
```

### Logout
```http
POST /auth/logout
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

## Profile Management

### Get Profile
```http
GET /profile/me
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phone": "string",
  "location": "string",
  "objective": "string",
  "profilePicture": "string",
  "education": [],
  "experience": [],
  "projects": [],
  "skills": [],
  "interestedJobs": [],
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### Update Profile
```http
PUT /profile/me
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phone": "string",
  "location": "string",
  "objective": "string"
}
```

### Upload Profile Picture
```http
POST /profile/picture
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <image_file>
```

## Alumni Network

### Get Alumni Directory
```http
GET /alumni/directory?page=1&limit=20&filters={}
Authorization: Bearer <token>
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `filters`: JSON string with filters

**Response:**
```json
{
  "alumni": [
    {
      "id": "string",
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "currentCompany": "string",
      "currentRole": "string",
      "graduationYear": "number",
      "profilePicture": "string",
      "isConnected": "boolean"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

### Search Alumni
```http
GET /alumni/search?q=search_term&filters={}
Authorization: Bearer <token>
```

### Send Connection Request
```http
POST /alumni/{alumniId}/connect
Authorization: Bearer <token>
Content-Type: application/json

{
  "message": "string"
}
```

## Messaging

### Get Message Threads
```http
GET /messages/threads
Authorization: Bearer <token>
```

**Response:**
```json
{
  "threads": [
    {
      "id": "string",
      "participants": [
        {
          "id": "string",
          "firstName": "string",
          "lastName": "string",
          "profilePicture": "string"
        }
      ],
      "lastMessage": {
        "content": "string",
        "timestamp": "datetime",
        "senderId": "string"
      },
      "unreadCount": "number"
    }
  ]
}
```

### Get Messages in Thread
```http
GET /messages/threads/{threadId}?page=1&limit=50
Authorization: Bearer <token>
```

### Send Message
```http
POST /messages/threads/{threadId}
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "string",
  "type": "text"
}
```

## Notifications

### Get Notifications
```http
GET /notifications?page=1&limit=20
Authorization: Bearer <token>
```

**Response:**
```json
{
  "notifications": [
    {
      "id": "string",
      "type": "connection_request",
      "title": "string",
      "message": "string",
      "read": "boolean",
      "createdAt": "datetime",
      "data": {}
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 50,
    "pages": 3
  }
}
```

### Mark Notification as Read
```http
PUT /notifications/{notificationId}/read
Authorization: Bearer <token>
```

### Mark All Notifications as Read
```http
PUT /notifications/mark-all-read
Authorization: Bearer <token>
```

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {}
  }
}
```

## Common Error Codes

- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Internal Server Error

## Rate Limiting

API requests are rate limited to:
- 100 requests per minute per IP
- 1000 requests per hour per authenticated user

## WebSocket Events

### Connection
```javascript
const ws = new WebSocket('ws://localhost:3001/ws?token=jwt_token');
```

### Events
- `message` - New message received
- `notification` - New notification received
- `connection_request` - New connection request received
