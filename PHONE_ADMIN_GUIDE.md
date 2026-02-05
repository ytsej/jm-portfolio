# JM.EXE Phone - Admin Guide

## Phone Gallery Upload

### Access
Navigate to: **http://localhost:3003/admin/phone-gallery**

### How to Add Images

1. Click "Choose Files"
2. Select unlimited images (JPEG, PNG, WEBP)
3. Click "Upload Images"
4. Images automatically copy to `public/images/phone-gallery/`
5. Gallery JSON auto-updates
6. Open the phone to see new images!

### What Gets Uploaded

Images are saved to:
```
public/images/phone-gallery/
  ├── gallery-1707123456-001.jpg
  ├── gallery-1707123456-002.png
  └── ...
```

And paths are added to: `src/data/phone-gallery.json`

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
