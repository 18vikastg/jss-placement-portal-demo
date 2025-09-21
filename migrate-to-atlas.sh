#!/bin/bash

# MongoDB Atlas Migration Script for JSS Placement Portal
# This script helps migrate local data to MongoDB Atlas for production

echo "🚀 JSS Placement Portal - MongoDB Atlas Migration"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if MongoDB tools are installed
if ! command -v mongodump &> /dev/null; then
    echo -e "${RED}❌ MongoDB tools not found. Please install mongodb-database-tools${NC}"
    echo "   Ubuntu/Debian: sudo apt install mongodb-database-tools"
    echo "   macOS: brew install mongodb/brew/mongodb-database-tools"
    exit 1
fi

echo -e "${BLUE}📋 Prerequisites Checklist:${NC}"
echo "  1. MongoDB Atlas cluster created"
echo "  2. Database user with read/write permissions"
echo "  3. Network access configured (0.0.0.0/0 for Vercel)"
echo "  4. Connection string ready"
echo ""

# Local database info
LOCAL_DB="jobportal"
LOCAL_PORT="27017"

echo -e "${YELLOW}📂 Step 1: Backup Local Database${NC}"
read -p "Enter your local MongoDB database name (default: jobportal): " user_db_name
LOCAL_DB=${user_db_name:-$LOCAL_DB}

# Create backup directory
BACKUP_DIR="./database-backup-$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

echo "Creating backup of local database: $LOCAL_DB"
mongodump --host localhost:$LOCAL_PORT --db $LOCAL_DB --out "$BACKUP_DIR"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Local database backup created in: $BACKUP_DIR${NC}"
else
    echo -e "${RED}❌ Failed to create backup${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}🌐 Step 2: MongoDB Atlas Connection${NC}"
echo "Please provide your MongoDB Atlas connection string:"
echo "Format: mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/dbname?retryWrites=true&w=majority"
echo ""
read -p "Enter your MongoDB Atlas connection string: " atlas_connection_string

if [ -z "$atlas_connection_string" ]; then
    echo -e "${RED}❌ Connection string is required${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}📤 Step 3: Restore to MongoDB Atlas${NC}"
echo "Restoring database to MongoDB Atlas..."

mongorestore --uri="$atlas_connection_string" --db=$LOCAL_DB "$BACKUP_DIR/$LOCAL_DB"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Database successfully migrated to MongoDB Atlas!${NC}"
else
    echo -e "${RED}❌ Failed to migrate database${NC}"
    echo "Please check your connection string and network access settings"
    exit 1
fi

echo ""
echo -e "${BLUE}🔧 Step 4: Update Environment Variables${NC}"
echo "Update your Vercel environment variables with:"
echo ""
echo "MONGO_URI=$atlas_connection_string"
echo ""

echo -e "${GREEN}🎉 Migration completed successfully!${NC}"
echo ""
echo "Next steps:"
echo "1. Update MONGO_URI in your Vercel project settings"
echo "2. Redeploy your application"
echo "3. Test database connectivity"
echo ""
echo "Backup location: $BACKUP_DIR"
echo "Keep this backup safe for rollback if needed."

echo ""
echo -e "${BLUE}📊 Database Collections Overview:${NC}"
echo "Your JSS Placement Portal includes these collections:"
echo "  • users (student, faculty, recruiter accounts)"
echo "  • jobs (job postings)"
echo "  • applications (job applications)"
echo "  • companies (company profiles)"
echo "  • preparationresources (study materials)"
echo "  • studyplans (career roadmaps)"
echo "  • mockinterviewlogs (interview practice data)"
echo ""
echo "All collections have been migrated to MongoDB Atlas! 🚀"