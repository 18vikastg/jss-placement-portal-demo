#!/bin/bash

# JSS Placement Portal - Enhanced Complete Startup Script
# This script starts all services with improved error handling and monitoring

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Project configuration
PROJECT_ROOT="/home/vikas/Desktop/jss-placement-portal"
LOG_DIR="$PROJECT_ROOT/logs"
PID_DIR="$PROJECT_ROOT/logs"

# Service configuration
declare -A SERVICES=(
    ["backend"]="8001:placement-portal/backend:node index.js"
    ["frontend"]="5173:placement-portal/frontend:npm run dev"
    ["ai-career"]="3001:ai-career-coach:npm run dev"
    ["ai-resume"]="8501:ai-resume-analyser:streamlit run App/App.py --server.port 8501 --server.address 0.0.0.0"
)

# Initialize
print_header() {
    echo -e "${PURPLE}🚀 JSS PLACEMENT PORTAL - ENHANCED COMPLETE STARTUP${NC}"
    echo -e "${PURPLE}======================================================${NC}"
    echo -e "${CYAN}Starting all services with enhanced monitoring...${NC}"
    echo ""
}

print_separator() {
    echo -e "${BLUE}================================================${NC}"
}

# Setup directories
setup_directories() {
    mkdir -p "$LOG_DIR"
    mkdir -p "$PID_DIR"
    
    # Clear old logs (keep last 5)
    find "$LOG_DIR" -name "*.log" -type f -mtime +5 -delete 2>/dev/null || true
}

# Check prerequisites
check_prerequisites() {
    echo -e "${YELLOW}[PREREQ] Checking system prerequisites...${NC}"
    
    # Check if required commands exist
    local required_commands=("node" "npm" "streamlit" "curl" "lsof")
    for cmd in "${required_commands[@]}"; do
        if ! command -v "$cmd" &> /dev/null; then
            echo -e "${RED}❌ $cmd is not installed or not in PATH${NC}"
            exit 1
        else
            echo -e "${GREEN}✅ $cmd found${NC}"
        fi
    done
    
    # Check if MongoDB is running
    if ! pgrep mongod > /dev/null; then
        echo -e "${YELLOW}⚠️  MongoDB is not running. Starting MongoDB...${NC}"
        sudo systemctl start mongod 2>/dev/null || sudo service mongod start 2>/dev/null || {
            echo -e "${RED}❌ Failed to start MongoDB. Please start it manually.${NC}"
            exit 1
        }
    else
        echo -e "${GREEN}✅ MongoDB is running${NC}"
    fi
    
    echo ""
}

# Cleanup function
cleanup_port() {
    local port=$1
    local service_name=$2
    
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo -e "${YELLOW}⚠️  Port $port is in use by $service_name. Cleaning up...${NC}"
        local pids=$(lsof -ti:$port 2>/dev/null)
        if [ ! -z "$pids" ]; then
            echo "$pids" | xargs kill -9 2>/dev/null || true
            sleep 2
        fi
        echo -e "${GREEN}✅ Port $port cleaned${NC}"
    fi
}

# Enhanced service health check
wait_for_service() {
    local url=$1
    local service_name=$2
    local max_attempts=60  # Increased timeout
    local attempt=1
    
    echo -e "${CYAN}⏳ Waiting for $service_name to be ready...${NC}"
    
    while [ $attempt -le $max_attempts ]; do
        if curl -s --max-time 5 "$url" > /dev/null 2>&1; then
            echo -e "${GREEN}✅ $service_name is ready and responding!${NC}"
            return 0
        fi
        
        # Show progress
        if [ $((attempt % 5)) -eq 0 ]; then
            echo -e "${YELLOW}   ... still waiting ($attempt/$max_attempts)${NC}"
        fi
        
        sleep 2
        attempt=$((attempt + 1))
    done
    
    echo -e "${RED}❌ $service_name failed to start within timeout${NC}"
    return 1
}

# Enhanced service startup
start_service() {
    local service_key=$1
    local service_config="${SERVICES[$service_key]}"
    
    IFS=':' read -r port path command <<< "$service_config"
    
    local service_dir="$PROJECT_ROOT/$path"
    local log_file="$LOG_DIR/${service_key}.log"
    local pid_file="$PID_DIR/${service_key}.pid"
    
    echo -e "${BLUE}[STARTING] $service_key (Port $port)${NC}"
    
    # Check if service directory exists
    if [ ! -d "$service_dir" ]; then
        echo -e "${RED}❌ Service directory not found: $service_dir${NC}"
        return 1
    fi
    
    # Check if required files exist
    case $service_key in
        "backend")
            if [ ! -f "$service_dir/index.js" ]; then
                echo -e "${RED}❌ Backend index.js not found!${NC}"
                return 1
            fi
            ;;
        "frontend"|"ai-career")
            if [ ! -f "$service_dir/package.json" ]; then
                echo -e "${RED}❌ package.json not found in $service_dir${NC}"
                return 1
            fi
            ;;
        "ai-resume")
            if [ ! -f "$service_dir/App/App.py" ]; then
                echo -e "${RED}❌ AI Resume Analyzer App.py not found!${NC}"
                return 1
            fi
            ;;
    esac
    
    # Cleanup existing process
    cleanup_port "$port" "$service_key"
    
    # Start the service
    cd "$service_dir"
    echo -e "${CYAN}   Directory: $service_dir${NC}"
    echo -e "${CYAN}   Command: $command${NC}"
    echo -e "${CYAN}   Log: $log_file${NC}"
    
    # Start service in background
    nohup bash -c "$command" > "$log_file" 2>&1 &
    local pid=$!
    
    # Save PID
    echo "$pid" > "$pid_file"
    
    echo -e "${GREEN}✅ $service_key started (PID: $pid)${NC}"
    
    # Give service time to initialize
    sleep 3
    
    # Check if process is still running
    if ! ps -p "$pid" > /dev/null 2>&1; then
        echo -e "${RED}❌ $service_key failed to start. Check log: $log_file${NC}"
        tail -n 10 "$log_file"
        return 1
    fi
    
    echo ""
    return 0
}

# Verify all services
verify_services() {
    echo -e "${BLUE}[VERIFICATION] Checking all services...${NC}"
    echo ""
    
    local all_healthy=true
    
    # Check Backend
    if wait_for_service "http://localhost:8001" "Backend Server"; then
        echo -e "${GREEN}   📊 Backend API: http://localhost:8001${NC}"
    else
        all_healthy=false
    fi
    
    # Check Frontend
    if wait_for_service "http://localhost:5173" "Frontend Server"; then
        echo -e "${GREEN}   🌐 Main Application: http://localhost:5173${NC}"
    else
        all_healthy=false
    fi
    
    # Check AI Career Coach
    if wait_for_service "http://localhost:3001" "AI Career Coach"; then
        echo -e "${GREEN}   🤖 AI Career Coach: http://localhost:3001${NC}"
    else
        echo -e "${YELLOW}   ⚠️  AI Career Coach may still be starting...${NC}"
    fi
    
    # Check AI Resume Analyzer
    if wait_for_service "http://localhost:8501" "AI Resume Analyzer"; then
        echo -e "${GREEN}   🧠 AI Resume Analyzer: http://localhost:8501${NC}"
    else
        echo -e "${YELLOW}   ⚠️  AI Resume Analyzer may still be starting...${NC}"
    fi
    
    echo ""
    
    if [ "$all_healthy" = true ]; then
        return 0
    else
        return 1
    fi
}

# Display final status
show_final_status() {
    print_separator
    echo -e "${GREEN}🎉 JSS PLACEMENT PORTAL - ALL SERVICES STARTED!${NC}"
    print_separator
    echo ""
    
    echo -e "${PURPLE}📱 MAIN APPLICATION PORTAL:${NC}"
    echo -e "${CYAN}   🌐 URL: http://localhost:5173${NC}"
    echo -e "${CYAN}   📋 Features: Complete Placement Portal with Enhanced UI${NC}"
    echo ""
    
    echo -e "${PURPLE}🔧 BACKEND API SERVER:${NC}"
    echo -e "${CYAN}   🌐 URL: http://localhost:8001${NC}"
    echo -e "${CYAN}   📋 Features: Authentication, Database, File Management${NC}"
    echo ""
    
    echo -e "${PURPLE}🤖 AI CAREER COACH:${NC}"
    echo -e "${CYAN}   🌐 URL: http://localhost:3001${NC}"
    echo -e "${CYAN}   📋 Features: Career Roadmaps, Skill Assessment, Learning Paths${NC}"
    echo ""
    
    echo -e "${PURPLE}🧠 AI RESUME ANALYZER:${NC}"
    echo -e "${CYAN}   🌐 URL: http://localhost:8501${NC}"
    echo -e "${CYAN}   📋 Features: Resume Analysis, Career Insights, Skill Matching${NC}"
    echo ""
    
    echo -e "${PURPLE}👥 TEST ACCOUNTS:${NC}"
    echo -e "${CYAN}   👨‍🎓 Student: vikastg2000@gmail.com / vikas123${NC}"
    echo -e "${CYAN}   🏢 Recruiter: recruiter@company.com / recruiter123${NC}"
    echo -e "${CYAN}   👨‍🏫 Faculty: faculty@jssateb.ac.in / faculty123${NC}"
    echo ""
    
    echo -e "${PURPLE}🎯 ENHANCED FEATURES AVAILABLE:${NC}"
    echo -e "${GREEN}   ✅ Advanced Student Dashboard with AI Integration${NC}"
    echo -e "${GREEN}   ✅ Enhanced Faculty Dashboard with Analytics${NC}"
    echo -e "${GREEN}   ✅ Comprehensive Recruiter Dashboard${NC}"
    echo -e "${GREEN}   ✅ Professional LinkFolio Networking Platform${NC}"
    echo -e "${GREEN}   ✅ AI-Powered Resume Analysis & Career Guidance${NC}"
    echo -e "${GREEN}   ✅ Mock Interview System with AI Training${NC}"
    echo -e "${GREEN}   ✅ Preparation Hub with Study Materials${NC}"
    echo -e "${GREEN}   ✅ Real-time Notifications & Messaging${NC}"
    echo ""
    
    echo -e "${PURPLE}📁 LOG FILES & MONITORING:${NC}"
    local pids=""
    for service in "${!SERVICES[@]}"; do
        local pid_file="$PID_DIR/${service}.pid"
        if [ -f "$pid_file" ]; then
            local pid=$(cat "$pid_file")
            pids="$pids $pid"
            echo -e "${CYAN}   $service: $LOG_DIR/${service}.log (PID: $pid)${NC}"
        fi
    done
    echo ""
    
    echo -e "${PURPLE}🛑 TO STOP ALL SERVICES:${NC}"
    echo -e "${CYAN}   ./stop-all-complete.sh${NC}"
    echo -e "${CYAN}   Or kill PIDs:$pids${NC}"
    echo ""
    
    echo -e "${PURPLE}💡 USEFUL COMMANDS:${NC}"
    echo -e "${CYAN}   Monitor logs: tail -f logs/[service].log${NC}"
    echo -e "${CYAN}   Check status: ps aux | grep -E '(node|npm|streamlit)'${NC}"
    echo -e "${CYAN}   Check ports: netstat -tlnp | grep -E ':(5173|8001|3001|8501)'${NC}"
    echo ""
    
    print_separator
    echo -e "${GREEN}🚀 READY FOR IEEE CONFERENCE DEMONSTRATION!${NC}"
    print_separator
}

# Handle interrupts
cleanup_on_exit() {
    echo ""
    echo -e "${YELLOW}⚠️  Script interrupted. Services are still running in background.${NC}"
    echo -e "${CYAN}Use ./stop-all-complete.sh to stop all services.${NC}"
    exit 0
}

trap cleanup_on_exit SIGINT SIGTERM

# Main execution
main() {
    print_header
    
    # Change to project root
    cd "$PROJECT_ROOT" || {
        echo -e "${RED}❌ Failed to change to project directory: $PROJECT_ROOT${NC}"
        exit 1
    }
    
    # Setup
    setup_directories
    check_prerequisites
    
    echo -e "${YELLOW}[STEP 1] Starting all services...${NC}"
    echo ""
    
    # Start services in order
    local services_order=("backend" "frontend" "ai-career" "ai-resume")
    local failed_services=()
    
    for service in "${services_order[@]}"; do
        if start_service "$service"; then
            echo -e "${GREEN}✅ $service started successfully${NC}"
        else
            echo -e "${RED}❌ Failed to start $service${NC}"
            failed_services+=("$service")
        fi
        echo ""
    done
    
    # Wait for services to fully initialize
    echo -e "${YELLOW}[STEP 2] Waiting for services to initialize...${NC}"
    sleep 10
    
    # Verify services
    echo -e "${YELLOW}[STEP 3] Verifying service health...${NC}"
    if verify_services; then
        echo -e "${GREEN}✅ All core services are healthy${NC}"
    else
        echo -e "${YELLOW}⚠️  Some services may still be starting up${NC}"
    fi
    
    echo ""
    
    # Show final status
    show_final_status
    
    # Final message
    if [ ${#failed_services[@]} -eq 0 ]; then
        echo -e "${GREEN}🎉 SUCCESS: All services started successfully!${NC}"
        echo -e "${CYAN}You can now close this terminal. Services will continue running.${NC}"
    else
        echo -e "${YELLOW}⚠️  Some services failed to start: ${failed_services[*]}${NC}"
        echo -e "${CYAN}Check the respective log files for details.${NC}"
    fi
    
    echo ""
    echo -e "${PURPLE}Press Enter to exit (all services will continue running)...${NC}"
    read -r
}

# Run main function
main "$@"
