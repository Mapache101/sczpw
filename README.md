# 🐾 Santa Cruz Pet Watch

Community lost and found pet recovery platform for Santa Cruz de la Sierra, Bolivia.

Recreated with soft editorial aesthetic, working report submission, client photo compression, Santa Cruz neighborhood interactive map, WhatsApp alerts, and printable flyers.

---

## 📸 Cloudinary Photo Storage (No Credit Card Required)

To avoid Firebase Storage credit card requirements, all pet photos are uploaded directly to **Cloudinary** using client-side signed uploads.

- **API Key**: `392472952221462` (Configured)
- **API Secret**: `Ac93DFmI7Mqfpne_l6wSsfjFjOE` (Configured)
- **Cloud Name**: Enter your Cloud Name in the app under **"Cloud & Storage"** (top navigation bar), or set `VITE_CLOUDINARY_CLOUD_NAME` in `.env`.

> 💡 **Where is your Cloud Name?** Log in to [Cloudinary](https://cloudinary.com/console) and look at the top left of the Dashboard under **"Cloud name"** (e.g., `dxyz123`).

---

## 🚀 GitHub Pages Deployment

You can deploy using either of two methods:

### Option A: Direct CLI Deployment via `gh-pages` (Recommended)
Run:
```bash
npm run deploy
```
This automatically runs `npm run build` and publishes the `dist` folder to your `gh-pages` branch.

### Option B: Automated GitHub Actions
Push to `main` or `master` with the included `.github/workflows/deploy.yml` workflow:
1. In your GitHub repository, open **Settings > Pages**.
2. Under **Build and deployment > Source**, select **GitHub Actions** (or `Deploy from a branch` with `gh-pages` if using Option A).
3. Your site will be live at: `https://<your-username>.github.io/<your-repo>/`.

---

## 💾 How Reports are Saved & Displayed

The application features a **dual-storage engine**:

### 1. Community Shared Database (Firestore)
When visitors submit reports, text data is saved to Firebase Firestore (`petReports` collection) and photos are hosted on Cloudinary. Any report submitted by one neighbor is **immediately visible to everyone else** across Santa Cruz on the feed and interactive map.

#### To activate free Firestore rules:
In your [Firebase Console](https://console.firebase.google.com/) under **Firestore Database > Rules**:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /petReports/{reportId} {
      allow read, write: if true;
    }
  }
}
```

### 2. Zero-Loss Local Fallback
If offline or if credentials are pending:
- Reports are **saved safely in browser storage** (LocalStorage/IndexedDB).
- Photos are preserved in high quality.
- The user can export all reports as a JSON backup with one click.
