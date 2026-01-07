#!/bin/bash

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${RED}🛑 Stopping all JSS Portal services...${NC}"
echo ""

# Read PIDs from file if it exists
if [ -f /home/vikas/Desktop/Projects/jss-placement-portal/logs/pids.txt ]; then
    while read pid; do
        if ps -p $pid > /dev/null 2>&1; then
            echo -e "${YELLOW}Stopping process $pid${NC}"
            kill $pid 2>/dev/null
        fi
    done < /home/vikas/Desktop/Projects/jss-placement-portal/logs/pids.txt
    rm /home/vikas/Desktop/Projects/jss-placement-portal/logs/pids.txt
fi

# Also kill by port
echo -e "${YELLOW}Checking ports...${NC}"
for port in 8001 5173 3001 5001; do
    if lsof -i:$port > /dev/null 2>&1; then
        echo -e "${YELLOW}Stopping service on port $port${NC}"
        fuser -k $port/tcp 2>/dev/null
    fi
done

sleep 2

echo ""
echo -e "${GREEN}✅ All services stopped${NC}"
