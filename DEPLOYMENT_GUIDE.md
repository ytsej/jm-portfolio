# Deployment Guide - Cloud Storage Setup

## Overview

The phone gallery admin panel now uses **Vercel Blob Storage** for production deployments. This allows you to upload and manage images directly on your deployed site.

## Setup Steps

### 1. Get Vercel Blob Storage Token

**Step-by-Step Instructions:**

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Log in with your account

2. **Navigate to Storage**
   - In the left sidebar, click on **"Storage"** (or go to: https://vercel.com/dashboard/stores)
   - You'll see a list of storage options

3. **Create or Select Blob Store**
   - Click **"Create"** → Select **"Blob"**
   - Or if you already have a Blob store, click on it
   - Give it a name (e.g., "jm-portfolio-gallery")

4. **Get the Read/Write Token**
   - Once the store is created, you'll see a page with store details
   - Look for **"Tokens"** section or **"Environment Variables"**
   - Click **"Create Token"** or **"Generate Token"**
   - Select **"Read/Write"** permissions
   - Copy the token (it starts with `vercel_blob_rw_...`)
   - **Important:** Save this token immediately - you won't be able to see it again!

**Alternative Method:**
- If you can't find the token section, go to your **project settings** → **Storage** tab
- The token might be displayed there, or you can create a new one

### 2. Set Environment Variables in Vercel

1. **Go to your project in Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Click on your project (JM-Portfolio or whatever you named it)

2. **Navigate to Environment Variables**
   - Click on **"Settings"** tab (top navigation)
   - Click on **"Environment Variables"** in the left sidebar

3. **Add Environment Variables**
   - Click **"Add New"** button
   - Add each variable one by one:

   **Required for Production:**
   - **Key**: `BLOB_READ_WRITE_TOKEN`
   - **Value**: `vercel_blob_rw_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` (your token from step 1)
   - **Environment**: Select **Production**, **Preview**, and **Development** (or just Production if you only want it there)
   - Click **"Save"**

   **Required for Admin Protection:**
   - **Key**: `ADMIN_PASSWORD`
   - **Value**: `your-secure-password-here` (choose a strong password!)
   - **Environment**: Select **Production**, **Preview**, and **Development**
   - Click **"Save"**

4. **Redeploy Your Project**
   - After adding environment variables, you need to redeploy
   - Go to **"Deployments"** tab
   - Click the **"..."** menu on your latest deployment
   - Click **"Redeploy"**
   - Or push a new commit to trigger a new deployment

**Important Notes:**
- If `ADMIN_PASSWORD` is not set, the admin routes will be publicly accessible. **Always set a strong password for production!**
- Environment variables are only applied after redeployment
- The password you set here is what you'll enter in the admin panel login screen

### 3. Local Development

For local development, you can either:

**Option A: Use Local Filesystem (No Setup Required)**
- Just run `npm run dev`
- Images will be saved to `public/images/phone-gallery/`
- No environment variables needed

**Option B: Use Vercel Blob (Same as Production)**
- Create a `.env.local` file in the project root:
```
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
ADMIN_PASSWORD=your-password
```

## How It Works

### Upload Flow:
1. User selects images in admin panel
2. Images are uploaded to Vercel Blob Storage (or local filesystem in dev)
3. Blob URLs are stored in `src/data/phone-gallery.json`
4. Images appear in the phone gallery immediately

### Delete Flow:
1. User clicks delete on an image
2. Image is removed from Vercel Blob Storage
3. URL is removed from `src/data/phone-gallery.json`
4. Gallery updates automatically

## Admin Panel Features

- **Upload Images**: Select multiple images and upload them
- **View Gallery**: See all images in a responsive grid
- **Delete Images**: Hover over an image and click delete
- **Real-time Updates**: Gallery refreshes after upload/delete

## Access Admin Panel

- **Local**: `http://localhost:3003/admin/phone-gallery`
- **Production**: `https://your-domain.vercel.app/admin/phone-gallery`

## Troubleshooting

### Images not uploading in production?
- Check that `BLOB_READ_WRITE_TOKEN` is set correctly in Vercel
- Check Vercel deployment logs for errors

### Admin panel shows 401 Unauthorized?
- Set `ADMIN_PASSWORD` in environment variables
- The password is checked server-side for security

### Images not displaying?
- Check that blob URLs are being generated correctly
- Verify the gallery JSON file is being updated
- Check browser console for image loading errors

## Security Notes

- **Admin Password**: Always set `ADMIN_PASSWORD` in production
- **Blob Token**: Never commit tokens to git
- **Public Access**: Blob images are public by default (required for the phone gallery)
