// Deployment target: Render (Node server)
// Reason: Node server mode is chosen over static export because it allows
// future API routes (contact form, product CMS webhooks) without a
// full redeploy. Deploy on Render: Build Command = "npm run build",
// Start Command = "npm run start", Environment = Node.

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
