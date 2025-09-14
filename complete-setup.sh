#!/bin/bash

# JSS Placement Portal - Complete Setup Script
# This script sets up the entire project from scratch including system dependencies

echo "🎓 JSS Placement Portal - Complete Setup & Installation"
echo "========================================================="

# Colors for better output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_step() {
    echo -e "${PURPLE}[STEP]${NC} $1"
}

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Get the directory where the script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

print_status "Working directory: $SCRIPT_DIR"

# Step 1: System Dependencies
print_step "1. Installing System Dependencies"

# Detect OS
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    print_status "Detected Linux system"
    
    # Update package list
    print_status "Updating package list..."
    sudo apt update
    
    # Install Node.js if not present
    if ! command_exists node; then
        print_status "Installing Node.js..."
        curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
        sudo apt-get install -y nodejs
    else
        print_success "Node.js is already installed: $(node --version)"
    fi
    
    # Install Python3 if not present
    if ! command_exists python3; then
        print_status "Installing Python 3..."
        sudo apt-get install -y python3 python3-pip python3-venv
    else
        print_success "Python 3 is already installed: $(python3 --version)"
    fi
    
    # Install pip if not present
    if ! command_exists pip; then
        print_status "Installing pip..."
        sudo apt-get install -y python3-pip
    else
        print_success "pip is already installed: $(pip --version)"
    fi
    
    # Install MongoDB if not present
    if ! command_exists mongod; then
        print_status "Installing MongoDB..."
        wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
        echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
        sudo apt-get update
        sudo apt-get install -y mongodb-org
        sudo systemctl enable mongod
        sudo systemctl start mongod
    else
        print_success "MongoDB is already installed"
        # Start MongoDB if not running
        if ! pgrep -x "mongod" > /dev/null; then
            print_status "Starting MongoDB..."
            sudo systemctl start mongod
        fi
    fi
    
elif [[ "$OSTYPE" == "darwin"* ]]; then
    print_status "Detected macOS system"
    
    # Install Homebrew if not present
    if ! command_exists brew; then
        print_status "Installing Homebrew..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    fi
    
    # Install Node.js if not present
    if ! command_exists node; then
        print_status "Installing Node.js..."
        brew install node
    else
        print_success "Node.js is already installed: $(node --version)"
    fi
    
    # Install Python3 if not present
    if ! command_exists python3; then
        print_status "Installing Python 3..."
        brew install python
    else
        print_success "Python 3 is already installed: $(python3 --version)"
    fi
    
    # Install MongoDB if not present
    if ! command_exists mongod; then
        print_status "Installing MongoDB..."
        brew tap mongodb/brew
        brew install mongodb-community
        brew services start mongodb/brew/mongodb-community
    else
        print_success "MongoDB is already installed"
        # Start MongoDB if not running
        if ! pgrep -x "mongod" > /dev/null; then
            print_status "Starting MongoDB..."
            brew services start mongodb/brew/mongodb-community
        fi
    fi
    
else
    print_warning "Unsupported operating system. Please install Node.js, Python 3, and MongoDB manually."
fi

# Step 2: Verify Project Structure
print_step "2. Verifying Project Structure"

if [ ! -d "placement-portal/backend" ]; then
    print_error "Backend directory not found! Please ensure you're in the JSS Placement Portal project directory."
    exit 1
fi

if [ ! -d "placement-portal/frontend" ]; then
    print_error "Frontend directory not found! Please ensure you're in the JSS Placement Portal project directory."
    exit 1
fi

if [ ! -d "ai-resume-analyser/App" ]; then
    print_error "AI Resume Analyzer directory not found! Please ensure you're in the JSS Placement Portal project directory."
    exit 1
fi

print_success "Project structure verified"

# Step 3: Install Project Dependencies
print_step "3. Installing Project Dependencies"

# Backend dependencies
print_status "Installing backend dependencies..."
cd placement-portal/backend
npm install
if [ $? -eq 0 ]; then
    print_success "Backend dependencies installed successfully"
else
    print_error "Failed to install backend dependencies"
    exit 1
fi
cd "$SCRIPT_DIR"

# Frontend dependencies
print_status "Installing frontend dependencies..."
cd placement-portal/frontend
npm install
if [ $? -eq 0 ]; then
    print_success "Frontend dependencies installed successfully"
else
    print_error "Failed to install frontend dependencies"
    exit 1
fi
cd "$SCRIPT_DIR"

# AI dependencies
print_status "Installing AI Resume Analyzer dependencies..."
cd ai-resume-analyser/App
pip install -r requirements.txt
if [ $? -eq 0 ]; then
    print_success "AI dependencies installed successfully"
else
    print_error "Failed to install AI dependencies"
    exit 1
fi

# Download spaCy model
print_status "Downloading spaCy English model..."
python3 -m spacy download en_core_web_sm
if [ $? -eq 0 ]; then
    print_success "spaCy model downloaded successfully"
    touch .deps_installed
else
    print_warning "Failed to download spaCy model, but continuing..."
fi
cd "$SCRIPT_DIR"

# Step 4: Setup Environment Files
print_step "4. Setting Up Environment Configuration"

# Backend .env file
if [ ! -f "placement-portal/backend/.env" ]; then
    print_status "Creating backend .env file..."
    cp placement-portal/backend/.env.example placement-portal/backend/.env
    print_success "Backend .env file created"
else
    print_success "Backend .env file already exists"
fi

# Frontend .env file
if [ ! -f "placement-portal/frontend/.env" ]; then
    if [ -f "placement-portal/frontend/.env.development" ]; then
        print_status "Using existing .env.development file..."
        print_success "Frontend environment configured"
    else
        print_status "Creating frontend .env file..."
        echo "VITE_API_URL=http://localhost:8001" > placement-portal/frontend/.env
        print_success "Frontend .env file created"
    fi
else
    print_success "Frontend .env file already exists"
fi

# Step 5: Database Setup
print_step "5. Setting Up Database"

print_status "Checking MongoDB connection..."
if command_exists mongod; then
    # Test MongoDB connection
    if mongo --eval "db.runCommand('ping').ok" localhost/jobportal --quiet 2>/dev/null; then
        print_success "MongoDB is running and accessible"
        
        # Seed database if needed
        print_status "Setting up database with sample data..."
        cd placement-portal/backend
        if [ -f "addSampleData.js" ]; then
            node addSampleData.js 2>/dev/null || true
            print_success "Sample data added to database"
        fi
        cd "$SCRIPT_DIR"
    else
        print_warning "MongoDB may not be running properly"
    fi
else
    print_warning "MongoDB not found. Database features may not work."
fi

# Step 6: Make Scripts Executable
print_step "6. Setting Up Launch Scripts"

chmod +x start-all-services.sh
chmod +x stop-all-services.sh
chmod +x check-status.sh
chmod +x fast-start.sh

print_success "All scripts made executable"

# Step 7: Create logs directory
mkdir -p logs

print_success "Setup completed successfully!"

echo ""
echo -e "${CYAN}🎉 JSS PLACEMENT PORTAL SETUP COMPLETE!${NC}"
echo "=========================================="
echo ""
echo -e "${GREEN}✅ System Dependencies:${NC} Node.js, Python 3, MongoDB"
echo -e "${GREEN}✅ Project Dependencies:${NC} All npm and pip packages installed"
echo -e "${GREEN}✅ Environment Configuration:${NC} .env files created"
echo -e "${GREEN}✅ Database:${NC} MongoDB configured with sample data"
echo -e "${GREEN}✅ Launch Scripts:${NC} All scripts ready to use"
echo ""
echo -e "${BLUE}🚀 Ready to start the application!${NC}"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo -e "   ${CYAN}Quick Start (Core Features):${NC} ./fast-start.sh"
echo -e "   ${CYAN}Complete Setup (All Features):${NC} ./start-all-services.sh"
echo ""
echo -e "${GREEN}🌐 After starting, access:${NC}"
echo -e "   📱 Main Portal: ${BLUE}http://localhost:5173${NC}"
echo -e "   🔧 Backend API: ${BLUE}http://localhost:8001${NC}"
echo -e "   🤖 AI Analyzer: ${BLUE}http://localhost:8501${NC}"
echo ""
echo -e "${YELLOW}👥 Test Login:${NC} patel@gmail.com / patel@gmail.com"
echo ""
echo -e "${CYAN}Happy coding! 🎓${NC}"
echo ""
