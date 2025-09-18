#!/bin/bash

# JSS Placement Portal - System Status Checker
# This script provides comprehensive status monitoring for all services

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
    ["backend"]="8001:Backend API:placement-portal/backend"
    ["frontend"]="5173:Frontend App:placement-portal/frontend"
    ["ai-career"]="3001:AI Career Coach:ai-career-coach"
    ["ai-resume"]="8501:AI Resume Analyzer:ai-resume-analyser"
)

print_header() {
    echo -e "${PURPLE}📊 JSS PLACEMENT PORTAL - SYSTEM STATUS${NC}"
    echo -e "${PURPLE}=========================================${NC}"
    echo -e "${CYAN}Real-time monitoring of all services...${NC}"
    echo ""
    echo -e "${BLUE}Timestamp: $(date '+%Y-%m-%d %H:%M:%S')${NC}"
    echo ""
}

print_separator() {
    echo -e "${BLUE}==============================================${NC}"
}

# Check if a service is responding
check_service_health() {
    local url=$1
    local timeout=5
    
    if curl -s --max-time $timeout "$url" > /dev/null 2>&1; then
        return 0  # Healthy
    else
        return 1  # Unhealthy
    fi
}

# Get process info
get_process_info() {
    local pid=$1
    if ps -p "$pid" > /dev/null 2>&1; then
        local info=$(ps -p "$pid" -o pid,ppid,user,pcpu,pmem,time,cmd --no-headers 2>/dev/null)
        echo "$info"
        return 0
    else
        return 1
    fi
}

# Check service detailed status
check_service_detailed() {
    local service_key=$1
    local service_config="${SERVICES[$service_key]}"
    
    IFS=':' read -r port service_name path <<< "$service_config"
    
    local pid_file="$PID_DIR/${service_key}.pid"
    local log_file="$LOG_DIR/${service_key}.log"
    local service_url="http://localhost:$port"
    
    echo -e "${BLUE}🔍 $service_name (Port $port)${NC}"
    echo -e "${BLUE}├─────────────────────────────────${NC}"
    
    # Check PID file and process
    if [ -f "$pid_file" ]; then
        local pid=$(cat "$pid_file")
        echo -e "${CYAN}│ 📝 PID File: $pid${NC}"
        
        if get_process_info "$pid" > /dev/null 2>&1; then
            echo -e "${GREEN}│ ✅ Process: Running${NC}"
        else
            echo -e "${RED}│ ❌ Process: Not running (stale PID)${NC}"
        fi
    else
        echo -e "${RED}│ ❌ PID File: Not found${NC}"
    fi
    
    # Check port binding
    local port_check=$(lsof -ti:$port 2>/dev/null || echo "free")
    if [ "$port_check" = "free" ]; then
        echo -e "${RED}│ ❌ Port $port: Not in use${NC}"
    else
        echo -e "${GREEN}│ ✅ Port $port: Active (PID: $port_check)${NC}"
    fi
    
    # Check service health
    if check_service_health "$service_url"; then
        echo -e "${GREEN}│ ✅ Health: Responding${NC}"
        echo -e "${GREEN}│ 🌐 URL: $service_url${NC}"
    else
        echo -e "${RED}│ ❌ Health: Not responding${NC}"
        echo -e "${RED}│ 🌐 URL: $service_url (unreachable)${NC}"
    fi
    
    echo -e "${BLUE}└─────────────────────────────────${NC}"
    echo ""
}

# Quick summary
show_quick_summary() {
    print_separator
    echo -e "${GREEN}📊 QUICK STATUS SUMMARY${NC}"
    print_separator
    
    local healthy_services=0
    local total_services=${#SERVICES[@]}
    
    for service in "${!SERVICES[@]}"; do
        local service_config="${SERVICES[$service]}"
        IFS=':' read -r port service_name path <<< "$service_config"
        
        local status_icon="❌"
        local status_text="Offline"
        local status_color="$RED"
        
        # Check if service is healthy
        if check_service_health "http://localhost:$port"; then
            status_icon="✅"
            status_text="Online"
            status_color="$GREEN"
            ((healthy_services++))
        else
            # Check if process is running but not responding
            local pid_file="$PID_DIR/${service}.pid"
            if [ -f "$pid_file" ]; then
                local pid=$(cat "$pid_file")
                if ps -p "$pid" > /dev/null 2>&1; then
                    status_icon="⚠️"
                    status_text="Starting"
                    status_color="$YELLOW"
                fi
            fi
        fi
        
        echo -e "${status_color}$status_icon $service_name ($status_text)${NC}"
    done
    
    echo ""
    echo -e "${PURPLE}📊 Overall Health: $healthy_services/$total_services services online${NC}"
    
    if [ $healthy_services -eq $total_services ]; then
        echo -e "${GREEN}🎉 All systems operational!${NC}"
    elif [ $healthy_services -gt 0 ]; then
        echo -e "${YELLOW}⚠️  Partial system availability${NC}"
    else
        echo -e "${RED}❌ System offline${NC}"
    fi
    
    print_separator
}

echo ""
echo -e "${CYAN}🔍 Checking Service Status...${NC}"
echo ""

# Check Backend Server  
for service in "${!SERVICES[@]}"; do
    check_service_detailed "$service"
done

# System resource usage
check_system_resources() {
    echo -e "${PURPLE}� SYSTEM RESOURCES${NC}"
    echo -e "${PURPLE}===================${NC}"
    
    # CPU usage
    local cpu_usage=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1)
    echo -e "${CYAN}🔥 CPU Usage: ${cpu_usage}%${NC}"
    
    # Memory usage
    local mem_info=$(free -h | grep Mem)
    local mem_total=$(echo $mem_info | awk '{print $2}')
    local mem_used=$(echo $mem_info | awk '{print $3}')
    local mem_percent=$(free | grep Mem | awk '{printf("%.1f", $3/$2 * 100.0)}')
    echo -e "${CYAN}🧠 Memory: $mem_used/$mem_total (${mem_percent}%)${NC}"
    
    # Disk usage for project directory
    local disk_usage=$(du -sh "$PROJECT_ROOT" 2>/dev/null | cut -f1)
    echo -e "${CYAN}💾 Project Size: $disk_usage${NC}"
    
    # Load average
    local load_avg=$(uptime | awk -F'load average:' '{print $2}')
    echo -e "${CYAN}⚖️  Load Average:$load_avg${NC}"
    
    echo ""
}

# Database status
check_database_status() {
    echo -e "${PURPLE}🗃️  DATABASE STATUS${NC}"
    echo -e "${PURPLE}==================${NC}"
    
    # Check MongoDB
    if pgrep mongod > /dev/null; then
        echo -e "${GREEN}✅ MongoDB: Running${NC}"
        
        # Try to connect and get basic info
        if command -v mongo > /dev/null 2>&1; then
            local db_info=$(mongo --quiet --eval "db.runCommand({connectionStatus: 1})" 2>/dev/null || echo "Connection failed")
            if [[ "$db_info" == *"ok"*"1"* ]]; then
                echo -e "${GREEN}✅ MongoDB Connection: Active${NC}"
                
                # Get database stats
                local collections=$(mongo jobportal --quiet --eval "db.getCollectionNames().length" 2>/dev/null || echo "Unknown")
                echo -e "${CYAN}📊 Collections in jobportal DB: $collections${NC}"
            else
                echo -e "${YELLOW}⚠️  MongoDB Connection: Failed${NC}"
            fi
        else
            echo -e "${YELLOW}⚠️  MongoDB CLI not available for detailed check${NC}"
        fi
    else
        echo -e "${RED}❌ MongoDB: Not running${NC}"
        echo -e "${YELLOW}💡 Start with: sudo systemctl start mongod${NC}"
    fi
    
    echo ""
}

# Recent activity summary
show_recent_activity() {
    echo -e "${PURPLE}📈 RECENT ACTIVITY${NC}"
    echo -e "${PURPLE}=================${NC}"
    
    for service in "${!SERVICES[@]}"; do
        local log_file="$LOG_DIR/${service}.log"
        if [ -f "$log_file" ]; then
            echo -e "${CYAN}📋 $service (last 2 lines):${NC}"
            tail -n 2 "$log_file" 2>/dev/null | while read -r line; do
                echo -e "${YELLOW}   $line${NC}"
            done
            echo ""
        fi
    done
}

# Interactive monitoring mode
interactive_mode() {
    echo -e "${YELLOW}� Starting interactive monitoring mode...${NC}"
    echo -e "${CYAN}Press Ctrl+C to exit${NC}"
    echo ""
    
    while true; do
        clear
        print_header
        show_quick_summary
        echo -e "${BLUE}Next update in 10 seconds...${NC}"
        sleep 10
    done
}

# Main execution
main() {
    local mode="${1:-status}"
    
    cd "$PROJECT_ROOT" || {
        echo -e "${RED}❌ Failed to change to project directory: $PROJECT_ROOT${NC}"
        exit 1
    }
    
    case $mode in
        "detailed"|"-d"|"--detailed")
            print_header
            for service in "${!SERVICES[@]}"; do
                check_service_detailed "$service"
            done
            check_system_resources
            check_database_status
            show_recent_activity
            show_quick_summary
            ;;
            
        "monitor"|"-m"|"--monitor")
            interactive_mode
            ;;
            
        "quick"|"-q"|"--quick")
            print_header
            show_quick_summary
            ;;
            
        "help"|"-h"|"--help")
            echo -e "${PURPLE}JSS Placement Portal - Status Checker${NC}"
            echo ""
            echo -e "${CYAN}Usage: $0 [mode]${NC}"
            echo ""
            echo -e "${BLUE}Modes:${NC}"
            echo -e "${CYAN}  status, -s     Default status check${NC}"
            echo -e "${CYAN}  detailed, -d   Detailed system analysis${NC}"
            echo -e "${CYAN}  monitor, -m    Interactive monitoring mode${NC}"
            echo -e "${CYAN}  quick, -q      Quick status summary${NC}"
            echo -e "${CYAN}  help, -h       Show this help${NC}"
            echo ""
            ;;
            
        *)
            print_header
            show_quick_summary
            check_system_resources
            check_database_status
            show_recent_activity
            echo -e "${CYAN}💡 For detailed analysis: $0 detailed${NC}"
            echo -e "${CYAN}💡 For continuous monitoring: $0 monitor${NC}"
            echo -e "${CYAN}💡 For help: $0 help${NC}"
            ;;
    esac
}

# Handle interrupts for interactive mode
cleanup_on_exit() {
    echo ""
    echo -e "${YELLOW}👋 Monitoring stopped.${NC}"
    exit 0
}

trap cleanup_on_exit SIGINT SIGTERM

# Run main function
main "$@"
