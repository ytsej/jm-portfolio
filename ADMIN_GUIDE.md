# Admin Guide - JM.EXE Portfolio

## Adding Projects (AUTO-UPLOAD + JSON GENERATION!)

### Access the Admin Panel

Navigate to: **http://localhost:3003/admin/projects**

### How It Works (SUPER EASY!)

1. **Fill out the form**:
   - **Title*** (required)
   - **Type*** (Web App, Game, etc.)
   - **Role*** (Frontend Developer, etc.)
   - **Descriptions**
   - **Key Features**: One per line (just press Enter!)
   - **Technologies**: Comma-separated (e.g., "React, Next.js")
   - **Links**: GitHub, Demo, Figma, APK
   - **Upload Images**: Select all your screenshots

2. **Click "Generate & Upload"**:
   - ✅ Images **automatically copy** to `public/images/projects/<project-id>/`
   - ✅ Clean JSON generated for you to copy
   - ✅ Success screen shows everything

3. **Copy JSON to portfolio.ts**:
   - Click "Copy JSON" button
   - Open `src/data/portfolio.ts`
   - Find the `projects: [` array
   - Paste your JSON inside (add comma if needed)
   - Save file

4. **Refresh browser** - Your project appears!

### What Gets Auto-Uploaded

**Images** are automatically saved to:
```
public/images/projects/<project-name-timestamp>/
  ├── img-001.jpg
  ├── img-002.png
  ├── img-003.jpg
  └── ...
```

You don't touch these files. They're done! ✅

### What You Add Manually

Just the **JSON object** to `src/data/portfolio.ts`:

```typescript
projects: [
  {
    // Paste your generated JSON here
    id: "my-project-12345",
    title: "My Project",
    // ...
  },
],
```

### Why This Approach?

- ✅ Images upload automatically (no manual copying!)
- ✅ Data stays in source control (portfolio.ts)
- ✅ You review JSON before adding
- ✅ Works perfectly on localhost
- ✅ Simple copy/paste workflow

### Example Workflow

1. Go to admin panel
2. Fill form for "My Game"
3. Upload 5 screenshots
4. Click "Generate & Upload"
5. **→ Images auto-copy to public folder** ✅
6. **→ JSON appears on screen**
7. Click "Copy JSON"
8. Open `src/data/portfolio.ts`
9. Paste JSON in `projects` array
10. Save & refresh
11. **Done!** Your project is live with all images!

### Tips

- Upload all images at once (hold Ctrl/Cmd for multi-select)
- Use clear project titles (they become folder names)
- Press Enter for new features (much easier!)
- Use commas for technologies
- Check the success message for confirmation

### Troubleshooting

If project doesn't appear after refresh:
1. Check you pasted JSON correctly in `portfolio.ts`
2. Check for missing commas between projects
3. Make sure file is saved
4. Hard refresh browser (Ctrl+Shift+R)

### Note

This works on **localhost only** (requires Node.js filesystem access).
