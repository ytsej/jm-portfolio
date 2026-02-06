# JM.EXE Phone - Admin Guide

## Phone Gallery Admin Panel

### Access
- **Local**: `http://localhost:3003/admin/phone-gallery`
- **Production**: `https://your-domain.vercel.app/admin/phone-gallery`

### Features

✅ **Upload Images**: Select and upload multiple images  
✅ **View Gallery**: See all images in a responsive grid  
✅ **Delete Images**: Remove images with a single click  
✅ **Cloud Storage**: Uses Vercel Blob Storage in production  
✅ **Local Fallback**: Uses local filesystem in development  

### How to Add Images

1. Navigate to the admin panel
2. Click "Choose Files" in the Upload section
3. Select unlimited images (JPEG, PNG, WEBP)
4. Click "Upload Images"
5. Images are uploaded to cloud storage (production) or local filesystem (dev)
6. Gallery updates automatically
7. Open the phone to see new images!

### How to Delete Images

1. Scroll to the Gallery Images section
2. Hover over any image
3. Click the "Delete" button
4. Confirm deletion
5. Image is removed from storage and gallery updates

### Storage Locations

**Production (Vercel Blob Storage):**
- Images stored in Vercel Blob Storage
- URLs stored in `src/data/phone-gallery.json`
- Accessible from anywhere

**Development (Local Filesystem):**
- Images saved to `public/images/phone-gallery/`
- URLs stored in `src/data/phone-gallery.json`
- Works without cloud setup

### Gallery JSON

Image URLs are stored in: `src/data/phone-gallery.json`

```json
[
  "/images/phone-gallery/gallery-1234567890-001.jpg",
  "https://blob.vercel-storage.com/phone-gallery/gallery-1234567890-002.png"
]
```

### Phone Apps

The JM.EXE Phone includes 4 interactive apps:

1. **Messages** 💬
   - Fake chat threads about skills and work style
   - Edit: `src/data/phone-messages.json`

2. **Contacts** 👤
   - Role-based contacts (Frontend Dev, Full-Stack, etc.)
   - Edit: `src/data/phone-contacts.json`

3. **Gallery** 🖼️
   - Your uploaded images
   - Managed via admin panel

4. **Phone** 📞
   - Fake call logs showing completed tasks
   - Edit: `src/data/phone-call-logs.json`

### Bottom Buttons

- **EMAIL** - Opens mailto:jmdc7737@gmail.com
- **CALL** - Opens tel:09498422084

No navigation - the phone is purely interactive content!
