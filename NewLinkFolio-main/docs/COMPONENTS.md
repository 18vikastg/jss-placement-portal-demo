# LinkFolio Components Documentation

## Component Structure

### Common Components

#### Navbar
**File:** `src/components/common/Navbar.jsx`
**Purpose:** Main navigation bar with logo, navigation links, and user menu
**Props:**
- `user`: User object
- `onLogout`: Logout function
- `currentPage`: Current active page

#### Sidebar
**File:** `src/components/common/Sidebar.jsx`
**Purpose:** Sidebar navigation for portfolio pages
**Props:**
- `activeTab`: Currently active tab
- `onTabChange`: Tab change handler
- `collapsed`: Whether sidebar is collapsed

#### LoadingSpinner
**File:** `src/components/common/LoadingSpinner.jsx`
**Purpose:** Reusable loading spinner component
**Props:**
- `size`: Size of spinner (sm, md, lg)
- `color`: Color of spinner
- `text`: Optional loading text

### Auth Components

#### SignupForm
**File:** `src/components/auth/SignupForm.jsx`
**Purpose:** User registration form
**Props:**
- `onSubmit`: Form submission handler
- `loading`: Loading state
- `error`: Error message

#### LoginForm
**File:** `src/components/auth/LoginForm.jsx`
**Purpose:** User login form
**Props:**
- `onSubmit`: Form submission handler
- `loading`: Loading state
- `error`: Error message

#### AuthGuard
**File:** `src/components/auth/AuthGuard.jsx`
**Purpose:** Route protection component
**Props:**
- `children`: Protected content
- `redirectTo`: Redirect path if not authenticated

### Profile Components

#### ProfileSetup
**File:** `src/components/profile/ProfileSetup.jsx`
**Purpose:** Multi-step profile setup form
**Props:**
- `onComplete`: Completion handler
- `initialData`: Initial form data

#### ProfileDisplay
**File:** `src/components/profile/ProfileDisplay.jsx`
**Purpose:** Display user profile information
**Props:**
- `profile`: Profile data object
- `editable`: Whether profile is editable

#### ProfileEdit
**File:** `src/components/profile/ProfileEdit.jsx`
**Purpose:** Profile editing form
**Props:**
- `profile`: Current profile data
- `onUpdate`: Update handler
- `onCancel`: Cancel handler

#### ProfilePictureUpload
**File:** `src/components/profile/ProfilePictureUpload.jsx`
**Purpose:** Profile picture upload component
**Props:**
- `currentPicture`: Current profile picture URL
- `onUpload`: Upload handler
- `onRemove`: Remove handler

### Alumni Components

#### AlumniDirectory
**File:** `src/components/alumni/AlumniDirectory.jsx`
**Purpose:** Display list of alumni with search and filters
**Props:**
- `alumni`: Array of alumni data
- `loading`: Loading state
- `onSearch`: Search handler
- `onFilter`: Filter handler

#### AlumniCard
**File:** `src/components/alumni/AlumniCard.jsx`
**Purpose:** Individual alumni card component
**Props:**
- `alumni`: Alumni data object
- `onConnect`: Connect handler
- `onViewProfile`: View profile handler

#### AlumniSearch
**File:** `src/components/alumni/AlumniSearch.jsx`
**Purpose:** Search and filter interface for alumni
**Props:**
- `onSearch`: Search handler
- `onFilter`: Filter handler
- `loading`: Loading state

#### AlumniProfile
**File:** `src/components/alumni/AlumniProfile.jsx`
**Purpose:** Detailed alumni profile view
**Props:**
- `alumni`: Alumni data object
- `onConnect`: Connect handler
- `onMessage`: Message handler

### Messaging Components

#### MessageList
**File:** `src/components/messaging/MessageList.jsx`
**Purpose:** List of message threads
**Props:**
- `threads`: Array of message threads
- `onThreadSelect`: Thread selection handler
- `loading`: Loading state

#### MessageThread
**File:** `src/components/messaging/MessageThread.jsx`
**Purpose:** Individual message thread view
**Props:**
- `thread`: Thread data object
- `messages`: Array of messages
- `onSendMessage`: Send message handler
- `onLoadMore`: Load more messages handler

#### MessageInput
**File:** `src/components/messaging/MessageInput.jsx`
**Purpose:** Message input component
**Props:**
- `onSend`: Send message handler
- `onTyping`: Typing indicator handler
- `disabled`: Disabled state

#### MessageNotification
**File:** `src/components/messaging/MessageNotification.jsx`
**Purpose:** Message notification component
**Props:**
- `message`: Message data
- `onRead`: Mark as read handler
- `onDismiss`: Dismiss handler

### Notification Components

#### NotificationList
**File:** `src/components/notifications/NotificationList.jsx`
**Purpose:** List of notifications
**Props:**
- `notifications`: Array of notifications
- `onMarkAsRead`: Mark as read handler
- `onDelete`: Delete handler
- `loading`: Loading state

#### NotificationItem
**File:** `src/components/notifications/NotificationItem.jsx`
**Purpose:** Individual notification item
**Props:**
- `notification`: Notification data object
- `onMarkAsRead`: Mark as read handler
- `onDelete`: Delete handler

#### NotificationSettings
**File:** `src/components/notifications/NotificationSettings.jsx`
**Purpose:** Notification preferences settings
**Props:**
- `settings`: Current settings
- `onUpdate`: Update settings handler

## Page Components

### HomePage
**File:** `src/pages/HomePage.jsx`
**Purpose:** Landing page with welcome content
**Features:**
- Hero section
- Feature highlights
- Call-to-action buttons

### SignupPage
**File:** `src/pages/SignupPage.jsx`
**Purpose:** User registration page
**Features:**
- Signup form
- Form validation
- Success/error handling

### ProfileSetupPage
**File:** `src/pages/ProfileSetupPage.jsx`
**Purpose:** Multi-step profile creation page
**Features:**
- Step-by-step form
- Progress indicator
- Data validation

### PortfolioPage
**File:** `src/pages/PortfolioPage.jsx`
**Purpose:** Main portfolio display page
**Features:**
- Profile display
- Sidebar navigation
- Dynamic content loading

### AlumniLinkPage
**File:** `src/pages/AlumniLinkPage.jsx`
**Purpose:** Alumni network page
**Features:**
- Alumni directory
- Search and filters
- Connection management

### MessagingPage
**File:** `src/pages/MessagingPage.jsx`
**Purpose:** Messaging interface page
**Features:**
- Message threads
- Real-time messaging
- File sharing

### NotificationPage
**File:** `src/pages/NotificationPage.jsx`
**Purpose:** Notifications management page
**Features:**
- Notification list
- Mark as read
- Settings

### EditProfilePage
**File:** `src/pages/EditProfilePage.jsx`
**Purpose:** Profile editing page
**Features:**
- Profile edit form
- Image upload
- Validation

## Custom Hooks

### useAuth
**File:** `src/hooks/useAuth.js`
**Purpose:** Authentication state management
**Returns:**
- `isAuthenticated`: Boolean
- `user`: User object
- `login`: Login function
- `logout`: Logout function
- `loading`: Loading state

### useProfile
**File:** `src/hooks/useProfile.js`
**Purpose:** Profile data management
**Returns:**
- `profile`: Profile object
- `updateProfile`: Update function
- `uploadPicture`: Upload function
- `loading`: Loading state

### useMessaging
**File:** `src/hooks/useMessaging.js`
**Purpose:** Messaging functionality
**Returns:**
- `threads`: Message threads
- `sendMessage`: Send message function
- `loadMessages`: Load messages function
- `unreadCount`: Unread count

### useNotifications
**File:** `src/hooks/useNotifications.js`
**Purpose:** Notification management
**Returns:**
- `notifications`: Notifications array
- `markAsRead`: Mark as read function
- `unreadCount`: Unread count
- `addNotification`: Add notification function

## Styling

All components use Tailwind CSS classes and follow the design system:

### Colors
- Primary: Red gradient (`from-red-700 to-red-900`)
- Background: Gray-50 (`bg-gray-50`)
- Cards: White with backdrop blur
- Text: Gray-900 for headings, Gray-600 for body

### Spacing
- Consistent padding and margins
- Responsive breakpoints
- Proper spacing between elements

### Typography
- Inter font family
- Consistent font weights and sizes
- Proper line heights

### Animations
- Smooth transitions
- Hover effects
- Loading states
- Form validation feedback
