# Midnight Room Scene - Requirements & Asset Prompts

## 1. Requirements

- **Framework:** Next.js 13+ (App Router)
- **Styling:** Tailwind CSS (v3 or v4)
- **Icons:** `lucide-react` (optional, current code uses CSS shapes)
- **Video Format:** MP4 (h.264 is best for compatibility)
- **Image Format:** PNG with transparency for overlays

## 2. Asset Generation Prompts (Midjourney v6 / DALL-E 3)

### A. Background Video (Midnight City)
**Goal:** Creates the depth and mood outside the window.
**Midjourney Prompt:**
> /imagine prompt: **Cinematic wide shot, view from a high-rise apartment window at night, rainy cyberpunk city skyline with subtle neon blue and purple lights, moody atmosphere, dark shadows, photorealistic, 8k, --ar 16:9 --v 6.0**
**Action:**
- Take the generated image and animate it using **Runway Gen-2** or **Pika Labs**.
- Use prompt: "Static camera, subtle rain movement, flickering neon lights, slow drifting clouds".
- **Save as:** `public/assets/midnight-city.mp4`

### B. Window Frame Overlay (Optional)
**Goal:** Frames the view realistically.
**Prompt:**
> /imagine prompt: **Interior view of a modern large industrial window frame, matte black metal, empty center (transparent glass), dark room context, architectural detail, photorealistic, isolated on white background --no landscape --v 6.0**
**Action:**
- Use Photoshop/Remove.bg to make the glass/center transparent.
- **Save as:** `public/assets/window-frame.png`

### C. Programmer Silhouette
**Goal:** Adds human element without distraction.
**Prompt:**
> /imagine prompt: **Side profile silhouette of a hacker wearing a hoodie sitting at a desk in a dark room, rim lighting from computer screen (cyan/blue light), mysterious, cyberpunk vibe, minimalistic, vector style flat silhouette but realistic edges --no background --v 6.0**
**Action:**
- Remove background completely.
- **Save as:** `public/assets/programmer.png`

## 3. Implementation Steps

1. Create a folder `public/assets`.
2. Place your `midnight-city.mp4` inside.
3. (Optional) Place `window-frame.png` and `programmer.png` inside if you want those layers (uncomment them in `MidnightRoomScene.tsx`).
4. The component is already set up to handle missing assets gracefully with CSS fallbacks, so it will work even before you add the files!
