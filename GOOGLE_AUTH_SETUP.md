# Google Authentication Setup for Admin Panel

## Required Environment Variables

Add the following variables to your `.env.local` file:

```bash
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## Steps to Set Up Google OAuth

### 1. Generate NextAuth Secret

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

Add the output to `NEXTAUTH_SECRET` in your `.env.local` file.

### 2. Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **OAuth 2.0 Client ID**
5. Configure the OAuth consent screen if prompted:
   - User Type: External
   - App name: Your Blog Name
   - User support email: your email
   - Developer contact: your email
6. For Application type, select **Web application**
7. Add Authorized JavaScript origins:
   - `http://localhost:3000` (for development)
   - Your production URL (when deploying)
8. Add Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - `https://yourdomain.com/api/auth/callback/google` (for production)
9. Click **Create**
10. Copy the **Client ID** and **Client Secret**
11. Add them to your `.env.local` file

### 3. Update .env.local

Your `.env.local` should now include:

```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<your_generated_secret>
GOOGLE_CLIENT_ID=<your_google_client_id>
GOOGLE_CLIENT_SECRET=<your_google_client_secret>
```

### 4. Restart the Development Server

```bash
npm run dev
```

## How It Works

- The admin panel (`/admin`) is now protected
- Only the email `sujithvi08@gmail.com` can access the admin panel
- Unauthorized users are redirected to the sign-in page
- If an unauthorized email tries to sign in, they'll see an error page

## Testing

1. Navigate to `/admin`
2. You'll be redirected to `/auth/signin`
3. Click "Sign in with Google"
4. Sign in with `sujithvi08@gmail.com`
5. You'll be redirected back to the admin panel

## Production Deployment

When deploying to production:

1. Update `NEXTAUTH_URL` to your production URL
2. Add your production URL to Google OAuth authorized origins and redirect URIs
3. Set all environment variables in your hosting platform (Vercel, Netlify, etc.)
