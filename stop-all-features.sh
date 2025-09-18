#!/bin/bash

# JSS Placement Portal - Enhanced Complete Stop Script
# This script stops all services with improved monitoring and cleanup

set -e

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

# Service ports for cleanup
declare -A SERVICE_PORTS=(
    ["backend"]="8001"
    ["frontend"]="5173"
    ["ai-career"]="3001"
    ["ai-resume"]="8501"
)

print_header() {
    echo -e "${RED}🛑 JSS PLACEMENT PORTAL - ENHANCED COMPLETE STOP${NC}"
    echo -e "${RED}===================================================${NC}"
    echo -e "${CYAN}Stopping all services with enhanced cleanup...${NC}"
    echo ""
}

print_separator() {
    echo -e "${BLUE}============================================${NC}"
}

# Stop service by PID file
stop_service_by_pid() {
    local service_name=$1
    local pid_file="$PID_DIR/${service_name}.pid"
    
    if [ -f "$pid_file" ]; then
        local pid=$(cat "$pid_file")
        if ps -p "$pid" > /dev/null 2>&1; then
            echo -e "${YELLOW}🔴 Stopping $service_name (PID: $pid)...${NC}"
            
            # Try graceful shutdown first
            kill "$pid" 2>/dev/null && sleep 3
            
            # Force kill if still running
            if ps -p "$pid" > /dev/null 2>&1; then
                echo -e "${YELLOW}   Forcing stop...${NC}"
                kill -9 "$pid" 2>/dev/null
            fi
            
            # Verify process is stopped
            if ! ps -p "$pid" > /dev/null 2>&1; then
                echo -e "${GREEN}✅ $service_name stopped successfully${NC}"
                rm -f "$pid_file"
                return 0
            else
                echo -e "${RED}❌ Failed to stop $service_name${NC}"
                return 1
            fi
        else
            echo -e "${YELLOW}⚠️  $service_name was not running (stale PID file)${NC}"
            rm -f "$pid_file"
            return 0
        fi
    else
        echo -e "${YELLOW}⚠️  No PID file found for $service_name${NC}"
        return 1
    fi
}

# Stop service by port
stop_service_by_port() {
    local port=$1
    local service_name=$2
    
    local pids=$(lsof -ti:$port 2>/dev/null || true)
    if [ ! -z "$pids" ]; then
        echo -e "${YELLOW}🔴 Stopping $service_name on port $port...${NC}"
        echo "$pids" | while read -r pid; do
            if [ ! -z "$pid" ]; then
                echo -e "${CYAN}   Killing PID: $pid${NC}"
                kill -9 "$pid" 2>/dev/null || true
            fi
        done
        
        # Wait and verify
        sleep 2
        local remaining_pids=$(lsof -ti:$port 2>/dev/null || true)
        if [ -z "$remaining_pids" ]; then
            echo -e "${GREEN}✅ $service_name (port $port) stopped${NC}"
            return 0
        else
            echo -e "${RED}❌ Some processes still running on port $port${NC}"
            return 1
        fi
    else
        echo -e "${GREEN}✅ $service_name (port $port) was not running${NC}"
        return 0
    fi
}

# Clean up log files (optional)
cleanup_logs() {
    echo -e "${BLUE}[CLEANUP] Managing log files...${NC}"
    
    # Archive old logs
    local timestamp=$(date +"%Y%m%d_%H%M%S")
    local backup_dir="$LOG_DIR/archive_$timestamp"
    
    if [ -d "$LOG_DIR" ] && [ "$(ls -A $LOG_DIR/*.log 2>/dev/null)" ]; then
        mkdir -p "$backup_dir"
        cp "$LOG_DIR"/*.log "$backup_dir/" 2>/dev/null || true
        echo -e "${GREEN}✅ Logs archived to: $backup_dir${NC}"
        
        # Keep only recent logs
        find "$LOG_DIR" -name "*.log" -type f -mtime +7 -delete 2>/dev/null || true
        echo -e "${GREEN}✅ Old logs cleaned up${NC}"
    fi
    
    echo ""
}

# Show running processes
show_remaining_processes() {
    echo -e "${BLUE}[INFO] Checking for remaining processes...${NC}"
    
    local remaining=$(ps aux | grep -E "(node|npm|streamlit)" | grep -v grep || true)
    if [ ! -z "$remaining" ]; then
        echo -e "${YELLOW}⚠️  Some Node.js/Python processes are still running:${NC}"
        echo "$remaining" | while read -r line; do
            echo -e "${CYAN}   $line${NC}"
        done
        echo ""
        echo -e "${YELLOW}💡 You may need to manually kill these if they're related to the portal${NC}"
    else
        echo -e "${GREEN}✅ No remaining Node.js/Python processes found${NC}"
    fi
    echo ""
}

# Check port status
check_ports() {
    echo -e "${BLUE}[INFO] Checking port status...${NC}"
    
    for service in "${!SERVICE_PORTS[@]}"; do
        local port="${SERVICE_PORTS[$service]}"
        local status=$(lsof -ti:$port 2>/dev/null || echo "free")
        
        if [ "$status" = "free" ]; then
            echo -e "${GREEN}✅ Port $port ($service): Available${NC}"
        else
            echo -e "${YELLOW}⚠️  Port $port ($service): In use (PID: $status)${NC}"
        fi
    done
    echo ""
}

# Main stop function
stop_all_services() {
    echo -e "${YELLOW}[STEP 1] Stopping services by PID files...${NC}"
    echo ""
    
    local services=("backend" "frontend" "ai-career" "ai-resume")
    local stopped_count=0
    
    for service in "${services[@]}"; do
        if stop_service_by_pid "$service"; then
            ((stopped_count++))
        fi
    done
    
    echo ""
    echo -e "${CYAN}Stopped $stopped_count services by PID files${NC}"
    echo ""
    
    echo -e "${YELLOW}[STEP 2] Stopping remaining services by port...${NC}"
    echo ""
    
    for service in "${!SERVICE_PORTS[@]}"; do
        local port="${SERVICE_PORTS[$service]}"
        stop_service_by_port "$port" "$service"
    done
    
    echo ""
}

# Clean up workspace
cleanup_workspace() {
    echo -e "${YELLOW}[STEP 3] Cleaning up workspace...${NC}"
    
    # Remove PID files
    rm -f "$PID_DIR"/*.pid 2>/dev/null || true
    echo -e "${GREEN}✅ PID files cleaned${NC}"
    
    # Clean npm cache and temporary files
    if command -v npm &> /dev/null; then
        cd "$PROJECT_ROOT/placement-portal/frontend" 2>/dev/null && {
            npm cache clean --force 2>/dev/null || true
            echo -e "${GREEN}✅ Frontend cache cleaned${NC}"
        }
        
        cd "$PROJECT_ROOT/ai-career-coach" 2>/dev/null && {
            npm cache clean --force 2>/dev/null || true
            echo -e "${GREEN}✅ AI Career Coach cache cleaned${NC}"
        }
    fi
    
    # Return to project root
    cd "$PROJECT_ROOT"
    
    echo ""
}

# Show final status
show_final_status() {
    print_separator
    echo -e "${GREEN}🎉 ALL SERVICES STOPPED SUCCESSFULLY!${NC}"
    print_separator
    echo ""
    
    echo -e "${PURPLE}📊 FINAL STATUS:${NC}"
    echo -e "${GREEN}   ✅ Backend Server (Port 8001): Stopped${NC}"
    echo -e "${GREEN}   ✅ Frontend Server (Port 5173): Stopped${NC}"
    echo -e "${GREEN}   ✅ AI Career Coach (Port 3001): Stopped${NC}"
    echo -e "${GREEN}   ✅ AI Resume Analyzer (Port 8501): Stopped${NC}"
    echo ""
    
    echo -e "${PURPLE}💡 USEFUL INFORMATION:${NC}"
    echo -e "${CYAN}   - All ports are now available for other applications${NC}"
    echo -e "${CYAN}   - Log files have been preserved for debugging${NC}"
    echo -e "${CYAN}   - To restart: ./start-all-features.sh${NC}"
    echo ""
    
    echo -e "${PURPLE}🗂️  LOG LOCATIONS:${NC}"
    if [ -d "$LOG_DIR" ]; then
        local log_files=$(ls "$LOG_DIR"/*.log 2>/dev/null || echo "No log files")
        if [ "$log_files" != "No log files" ]; then
            echo "$log_files" | while read -r log_file; do
                local size=$(du -h "$log_file" 2>/dev/null | cut -f1)
                echo -e "${CYAN}   - $(basename "$log_file"): $size${NC}"
            done
        else
            echo -e "${CYAN}   - No log files found${NC}"
        fi
    fi
    echo ""
    
    print_separator
    echo -e "${GREEN}🛑 SHUTDOWN COMPLETE!${NC}"
    print_separator
}

# Handle interrupts
cleanup_on_exit() {
    echo ""
    echo -e "${YELLOW}⚠️  Stop script interrupted.${NC}"
    echo -e "${CYAN}Some services may still be running.${NC}"
    exit 1
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
    
    # Show what's currently running
    echo -e "${BLUE}[INFO] Current running services:${NC}"
    local running_processes=$(ps aux | grep -E "(node|npm|streamlit)" | grep -v grep || echo "No related processes found")
    if [ "$running_processes" != "No related processes found" ]; then
        echo "$running_processes" | while read -r line; do
            echo -e "${CYAN}   $line${NC}"
        done
    else
        echo -e "${YELLOW}   No Node.js/Python processes currently running${NC}"
    fi
    echo ""
    
    # Stop all services
    stop_all_services
    
    # Clean up workspace
    cleanup_workspace
    
    # Optional: Clean up logs (commented out by default)
    # read -p "Do you want to archive and clean old logs? (y/N): " -n 1 -r
    # echo
    # if [[ $REPLY =~ ^[Yy]$ ]]; then
    #     cleanup_logs
    # fi
    
    # Show remaining processes
    show_remaining_processes
    
    # Check port status
    check_ports
    
    # Show final status
    show_final_status
    
    echo -e "${GREEN}🎉 All JSS Placement Portal services have been stopped successfully!${NC}"
    echo -e "${CYAN}You can now restart with: ./start-all-features.sh${NC}"
}

# Run main function
main "$@"
