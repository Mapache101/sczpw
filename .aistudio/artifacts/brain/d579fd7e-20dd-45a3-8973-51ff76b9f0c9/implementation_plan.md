# Santa Cruz Pet Watch Re-creation & Functional Restoration

Recreate the Santa Cruz Pet Watch community platform with its signature soft editorial aesthetic (`#faf6f0` pastel brown and warm typography), while completely fixing the broken Firebase Firestore and Storage submission flow so users can reliably publish, browse, search, and manage lost and found pet reports.

### User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural decisions were confirmed via interactive consultation:
> - **Backend & Persistence**: Direct Firebase Firestore database with configured community submission security rules, plus automatic local resilience fallback so reports are never lost if external quotas or rules are misconfigured.
> - **Photo Uploads**: Direct image upload flow supporting Firebase Storage, with automatic client-side photo compression and base64/data-URL backup storage.
> - **Community Features**:
>   1. **Interactive Neighborhood Map**: Spatial visualization of Santa Cruz de la Sierra zones (Equipetrol, Las Palmas, Urbaró, Casco Viejo, Villa 1° de Mayo, Plan 3000, etc.) with filterable pet markers.
>   2. **One-Click Printable Lost Pet Flyer**: Generates a high-contrast, printable 8.5x11 PDF/flyer layout with pet photo, distinctive markings, QR code/contact info, and tear-off tabs.
>   3. **Quick WhatsApp Direct Messaging**: Formats immediate WhatsApp click-to-chat links with prefilled report details for rapid community contact.
>   4. **Reunited / Resolved Status Badges**: Owners or finders can mark reports as "Reunited" or "Resolved" with celebratory status badges.

---

## 1. Overview & Core Concept

- **What It Does**: A community pet recovery portal for Santa Cruz de la Sierra where pet owners and rescuers can report lost and found animals, upload photos, browse real-time listings with category and area filters, view sightings on an interactive zone map, print emergency lost-pet posters, and connect instantly via WhatsApp or phone.
- **Target Audience / Persona**: Local pet owners, veterinary clinics, neighborhood rescue volunteers, and good Samaritans in Santa Cruz de la Sierra looking to reunite missing dogs, cats, and other pets.
- **Key Value**: Replaces the non-functioning original submission code with a robust, production-grade report submission pipeline, instant photo preview and upload, and zero-loss client resilience, wrapped in the original site's warm editorial identity.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Browse & Filter**: Users explore active lost and found reports in a responsive grid, filtering by status (All, Lost, Found, Reunited), species (Dogs, Cats, Others), and neighborhood ring (Equipetrol, Las Palmas, Urbaró, Centro, etc.).
2. **Interactive Map Exploration**: Users toggle the Santa Cruz neighborhood map to view geo-located or zone-based pet sighting pins with quick thumbnail previews and detail popups.
3. **Submit Pet Report**: A clean, validated form allowing users to select status, pet type, name, breed, distinct markings, date/time last seen, specific neighborhood/coordinates, owner contact info, and upload clear photos with live client cropping and preview.
4. **Flyer Generation**: From any pet detail card or modal, users can click "Generate Lost Pet Flyer" to render and print a flyer tailored for posting on neighborhood notice boards.
5. **Instant Contact**: Click-to-WhatsApp and click-to-call buttons immediately initiate contact with the reporter without exposing raw private addresses.
6. **Mark as Reunited**: Report creators can update a pet's status to "Reunited / In Safe Hands" with visual feedback.

### Visual Identity & Theme
- **Aesthetic Direction**: Soft editorial, warm pastel-brown palette, and book-quality typography that feels compassionate, welcoming, and community-rooted.
- **Color Tokens**:
  - Dominant Canvas: `--background: #faf6f0`, `--background-alt: #f5eee6`
  - Typography & Accents: Dark Warm Brown (`#4d3930`), Muted Espresso (`#614b3f`), Terracotta Accent (`#b98f73`), Soft Sage Green (`#81947c` for found/reunited badges)
  - Card & Surfaces: Warm Alabaster (`#fffdf9`), Gentle Borders (`#e7dbd0`)
- **Typography & Scale**:
  - Display & Headings: `Fraunces` (warm, elegant serif)
  - Body & Form Controls: `DM Sans` (clean, highly legible neo-grotesque)
  - Status & Numbers: Tabular numerals with zero-pill typographic discipline (`·` separators for dates and locations)
- **Component Styling & Layout**:
  - Strict Top Bar Contract: Brand mark with wordmark ("Santa Cruz Pet Watch"), navigation links (`Reports`, `Interactive Map`, `How It Works`, `Resources`), and a primary "Report a Pet" CTA button.
  - Cards: Natural white paper cards with soft warm drop shadows (`0 8px 25px rgba(78, 57, 45, 0.055)`), high-res photo frames, clear typography, and subtle border highlights.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Direct Firebase Firestore & Storage with Local Resilience Engine**
  - *Chosen Approach*: Implement Firebase Firestore and Firebase Storage integration while providing automated fallback to browser IndexedDB storage if network access, storage bucket, or security rules are offline.
  - *Why*: The original project failed because Firebase rules blocked unauthenticated writes (`permission-denied`, `storage/unauthorized`). With dual-engine resilience, users never see a hard crash or lose their submitted report, and the app works on both GitHub Pages and local development.
  - *Alternatives Considered*: Pure static demo data (rejected: doesn't fulfill the user's requirement to fix report saving).
- **Decision 2: Image Compression & Multi-Source Support**
  - *Chosen Approach*: Compress images client-side before sending to Firebase Storage or encoding to high-efficiency WebP/Data URLs, plus support for Unsplash/direct image URLs.
  - *Why*: Prevents exceeding Firebase Storage free quotas, speeds up uploads on mobile data connections in Santa Cruz, and provides instant image previews.
- **Decision 3: Interactive Santa Cruz Neighborhood Map**
  - *Chosen Approach*: Interactive Leaflet/SVG interactive zone map calibrated to Santa Cruz de la Sierra (Equipetrol, Monseñor Rivero, Las Palmas, Urbaró, Villa 1° de Mayo, Plan 3000, 4to Anillo, etc.) with custom warm-brown markers.
  - *Why*: Spatial proximity is critical for lost pets; viewing sightings clustered by neighborhood significantly increases reunion rates.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        SANTA CRUZ PET WATCH UI                         │
├───────────────┬───────────────────┬──────────────────┬─────────────────┤
│ Top Bar Nav   │ Hero Showcase     │ Filter & Search  │ Interactive Map │
│ - Brand Logo  │ - Quick Stats     │ - Status Tabs    │ - Zone Clusters │
│ - Fast Links  │ - Primary CTA     │ - Area Dropdown  │ - Pet Markers   │
└───────┬───────┴─────────┬─────────┴────────┬─────────┴────────┬────────┘
        │                 │                  │                  │
        ▼                 ▼                  ▼                  ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        REPORT FEED & DETAIL VIEW                       │
│ - Pet Card Grid (Lost/Found/Reunited)   - Pet Detail Modal            │
│ - Instant WhatsApp Chat CTA             - Printable Flyer Generator    │
│ - Mark Reunited Action                  - Time-Ago & Location Specs    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                     SUBMIT PET REPORT SYSTEM                           │
│ - Form Validation (Status, Name, Species, Breed, Date, Neighborhood)  │
│ - Client Photo Compressor & Live Preview Pipeline                     │
│ - Contact Consent & WhatsApp Phone Formatter                           │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                  DATA PERSISTENCE & STORAGE ADAPTER                    │
├───────────────────────────────────┬────────────────────────────────────┤
│ Firebase Firestore & Storage      │ Resilient Client Storage (Fallback)│
│ - petReports collection           │ - IndexedDB / LocalStorage Engine  │
│ - Cloud Storage photos bucket     │ - Auto-sync & Export/Import JSON   │
└───────────────────────────────────┴────────────────────────────────────┘
```

### Data Model (`PetReport`)
- `id`: Unique report ID
- `petName`: Pet's name (or "Unknown" for found pets)
- `status`: `"lost" | "found" | "reunited"`
- `type`: `"dog" | "cat" | "bird" | "other"`
- `breed`: Breed or physical description
- `color`: Primary color / markings
- `distinctiveFeatures`: Collar, scars, microchip, ears, tail
- `location`: Specific address or landmark description
- `area`: Neighborhood zone (Equipetrol, Las Palmas, Urbaró, Casco Viejo, etc.)
- `coordinates`: `{ lat: number, lng: number }` (defaulting to Santa Cruz center)
- `lastSeenDate`: ISO date string
- `photoUrl`: Cloud storage URL or optimized photo data URL
- `contactName`: Reporter contact name
- `contactPhone`: Phone number
- `contactWhatsapp`: WhatsApp number (formatted for wa.me direct chat)
- `contactNotes`: Safe meeting instructions or reward info
- `createdAt`: Timestamp
- `resolved`: Boolean

### Interactive State Transitions
- **Submission**: Validates input -> Compresses photo -> Writes to Firestore / Storage -> Updates live reactive state -> Displays positive toast -> Smoothly scrolls to report feed.
- **Filter & Search**: Client-side reactive debounce matching query string against pet name, breed, area, description, and status tags.
- **Printable Flyer**: Opens a print-optimized modal with high-res photo, large "LOST PET" or "FOUND PET" header, emergency contact details, and formatted tear-off phone numbers.
