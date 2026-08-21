# Deploying UrbanNest on Render

Follow these steps to deploy this Next.js application live on Render:

## Prerequisites
1. Ensure your latest changes are pushed to GitHub: [https://github.com/rajkrish0608/UrbanNest.git](https://github.com/rajkrish0608/UrbanNest.git).

## Step-by-Step Deployment

1. **Sign in to Render**
   - Go to [Render Dashboard](https://dashboard.render.com/) and log in using your GitHub account.

2. **Create Web Service**
   - Click the **New +** button in the top right corner.
   - Select **Web Service** from the menu.

3. **Link GitHub Repository**
   - Connect your GitHub account (if not already connected).
   - Find and select the `UrbanNest` repository.

4. **Configuration Settings**
   Configure the deployment form with the following settings:
   - **Name**: `urbannest-store`
   - **Region**: Choose the closest region (e.g. Singapore or Oregon)
   - **Branch**: `main`
   - **Runtime**: `Node`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm run start`

5. **Select Plan**
   - Scroll down and choose the **Free** instance tier.

6. **Deploy**
   - Click **Deploy Web Service** at the bottom of the page.
   - Render will start building the project and provide a public URL (e.g. `https://urbannest-store.onrender.com`).
