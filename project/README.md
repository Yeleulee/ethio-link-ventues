# Ethio Links Ventures

## Environment Setup

1. Create a `.env` file in the root directory
2. Copy the contents from `.env.example` to `.env`
3. Replace the placeholder values with your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
```

⚠️ **Important**: Never commit the `.env` file to version control. It contains sensitive information.

## Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

## Building for Production

```bash
npm run build
```

## Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Email/Password authentication in the Firebase Console
3. Get your Firebase configuration from Project Settings
4. Add the configuration values to your `.env` file 