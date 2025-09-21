#!/bin/bash

# 🚀 JSS Placement Portal - Complete Vercel Deployment Script
# This script prepares and deploys your entire portal to Vercel

echo "🚀 JSS Placement Portal - Vercel Deployment"
echo "============================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "vercel.json" ]; then
    echo -e "${RED}❌ Please run this script from the project root directory${NC}"
    exit 1
fi

echo -e "${BLUE}📋 Pre-deployment Checklist:${NC}"
echo "  1. Vercel CLI installed (npm i -g vercel)"
echo "  2. MongoDB Atlas cluster ready"
echo "  3. Cloudinary account configured"
echo "  4. All code committed to Git"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}⚠️ Vercel CLI not found. Installing...${NC}"
    npm install -g vercel
fi

echo -e "${PURPLE}🔐 Step 1: Environment Variables Configuration${NC}"
echo ""
echo "Please provide the following information for production deployment:"
echo ""

# MongoDB Atlas Configuration
read -p "Enter your MongoDB Atlas connection string: " mongo_uri
if [ -z "$mongo_uri" ]; then
    echo -e "${RED}❌ MongoDB connection string is required${NC}"
    exit 1
fi

# JWT Secret
read -p "Enter a secure JWT secret (min 32 characters): " jwt_secret
if [ ${#jwt_secret} -lt 32 ]; then
    echo -e "${YELLOW}⚠️ JWT secret should be at least 32 characters. Generating one...${NC}"
    jwt_secret="jss_placement_portal_$(openssl rand -hex 16)_production_secret_key"
    echo "Generated JWT secret: $jwt_secret"
fi

# Cloudinary Configuration
echo ""
echo "Cloudinary Configuration:"
read -p "Enter Cloudinary Cloud Name: " cloudinary_name
read -p "Enter Cloudinary API Key: " cloudinary_key
read -p "Enter Cloudinary API Secret: " cloudinary_secret

echo ""
echo -e "${PURPLE}🏗️ Step 2: Build Preparation${NC}"

# Install dependencies
echo "Installing dependencies..."
cd placement-portal/frontend
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Frontend dependency installation failed${NC}"
    exit 1
fi

cd ../backend
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Backend dependency installation failed${NC}"
    exit 1
fi

cd ../..

# Build frontend locally to test
echo "Testing frontend build..."
cd placement-portal/frontend
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Frontend build failed${NC}"
    exit 1
fi
cd ../..

echo -e "${GREEN}✅ Build preparation completed${NC}"

echo ""
echo -e "${PURPLE}🚀 Step 3: Vercel Deployment${NC}"

# Login to Vercel
echo "Logging into Vercel..."
vercel login

# Deploy to Vercel
echo "Deploying to Vercel..."
vercel --prod

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Deployment successful!${NC}"
else
    echo -e "${RED}❌ Deployment failed${NC}"
    exit 1
fi

# Get the deployment URL
echo ""
echo "Getting deployment URL..."
DEPLOYMENT_URL=$(vercel --prod --confirm 2>&1 | grep -o 'https://[^[:space:]]*')

if [ -z "$DEPLOYMENT_URL" ]; then
    echo -e "${YELLOW}⚠️ Could not automatically detect deployment URL${NC}"
    echo "Please check your Vercel dashboard for the deployment URL"
    DEPLOYMENT_URL="https://your-app-name.vercel.app"
fi

echo ""
echo -e "${PURPLE}⚙️ Step 4: Environment Variables Setup${NC}"
echo ""
echo "Please add these environment variables in your Vercel project dashboard:"
echo "Go to: https://vercel.com/dashboard → Your Project → Settings → Environment Variables"
echo ""
echo -e "${BLUE}Required Environment Variables:${NC}"
echo ""
echo "MONGO_URI=$mongo_uri"
echo "JWT_SECRET=$jwt_secret"
echo "SECRET_KEY=$jwt_secret"
echo "CLOUDINARY_CLOUD_NAME=$cloudinary_name"
echo "CLOUDINARY_API_KEY=$cloudinary_key"
echo "CLOUDINARY_API_SECRET=$cloudinary_secret"
echo "NODE_ENV=production"
echo "VITE_API_BASE_URL=$DEPLOYMENT_URL"
echo ""

# Save environment variables to a file for reference
cat > deployment-env-vars.txt << EOF
# JSS Placement Portal - Production Environment Variables
# Add these to your Vercel project settings

MONGO_URI=$mongo_uri
JWT_SECRET=$jwt_secret
SECRET_KEY=$jwt_secret
CLOUDINARY_CLOUD_NAME=$cloudinary_name
CLOUDINARY_API_KEY=$cloudinary_key
CLOUDINARY_API_SECRET=$cloudinary_secret
NODE_ENV=production
VITE_API_BASE_URL=$DEPLOYMENT_URL

# After adding these variables, redeploy your application:
# vercel --prod
EOF

echo -e "${GREEN}📄 Environment variables saved to: deployment-env-vars.txt${NC}"

echo ""
echo -e "${PURPLE}🧪 Step 5: Testing Deployment${NC}"
echo ""
echo "Testing your deployed application..."

# Wait a moment for deployment to be ready
sleep 10

# Test health endpoint
echo "Testing API health endpoint..."
curl -s "$DEPLOYMENT_URL/health" > /dev/null
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ API health check passed${NC}"
else
    echo -e "${YELLOW}⚠️ API health check failed - may need environment variables${NC}"
fi

# Test frontend
echo "Testing frontend..."
curl -s "$DEPLOYMENT_URL" > /dev/null
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Frontend is accessible${NC}"
else
    echo -e "${YELLOW}⚠️ Frontend test failed${NC}"
fi

echo ""
echo -e "${GREEN}🎉 Deployment Process Complete!${NC}"
echo ""
echo -e "${BLUE}📱 Your JSS Placement Portal is deployed at:${NC}"
echo "🌐 Frontend: $DEPLOYMENT_URL"
echo "🔧 Backend API: $DEPLOYMENT_URL/api/v1"
echo "🩺 Health check: $DEPLOYMENT_URL/health"
echo ""

echo -e "${BLUE}📋 Next Steps:${NC}"
echo "1. Add environment variables in Vercel dashboard (see deployment-env-vars.txt)"
echo "2. Redeploy after adding environment variables: vercel --prod"
echo "3. Test all features in production"
echo "4. Deploy AI services separately (see AI_SERVICES_DEPLOYMENT.md)"
echo ""

echo -e "${YELLOW}⚠️ Important Notes:${NC}"
echo "• Environment variables must be added in Vercel dashboard"
echo "• Redeploy after adding environment variables"
echo "• AI services need separate deployment (Railway/Render)"
echo "• Keep deployment-env-vars.txt file secure"
echo ""

echo -e "${PURPLE}🎯 For AI Services Deployment:${NC}"
echo "See the detailed guide: AI_SERVICES_DEPLOYMENT.md"
echo "• AI Resume Analyzer → Railway.app"
echo "• AI Career Coach → Vercel (separate deployment)"
echo ""

echo -e "${GREEN}Your JSS Placement Portal is ready for the IEEE conference! 🚀${NC}"

# Final reminder
echo ""
echo -e "${BLUE}💡 Don't forget to:${NC}"
echo "  ✅ Add environment variables in Vercel dashboard"
echo "  ✅ Test user registration and login"
echo "  ✅ Test job applications and features"
echo "  ✅ Deploy AI services for complete functionality"
echo ""
echo "Happy conferencing! 🎓"