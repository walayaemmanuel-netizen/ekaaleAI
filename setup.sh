#!/bin/bash

# ekaaleAI - Multi-component Setup Script
# This script installs dependencies for all project components

set -e

echo "================================"
echo "ekaaleAI Setup - Installing Dependencies"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to install dependencies for a component
install_component() {
    local component_path=$1
    local component_name=$2
    
    if [ -d "$component_path" ]; then
        echo -e "${BLUE}📦 Installing dependencies for $component_name...${NC}"
        cd "$component_path"
        npm install
        cd - > /dev/null
        echo -e "${GREEN}✓ $component_name setup complete${NC}"
        echo ""
    else
        echo -e "${RED}✗ $component_name directory not found: $component_path${NC}"
        echo ""
    fi
}

# Install all components
install_component "backend" "Backend API"
install_component "bots/discord" "Discord Bot"
install_component "bots/telegram" "Telegram Bot"
install_component "frontend" "Frontend"
install_component "firebase/functions" "Firebase Functions"

echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}✓ All components installed successfully!${NC}"
echo -e "${GREEN}================================${NC}"
echo ""
echo "Next steps:"
echo "1. Configure environment variables (.env files)"
echo "2. Backend: npm run dev"
echo "3. Discord Bot: npm run dev"
echo "4. Telegram Bot: npm run dev"
echo "5. Frontend: npm start"
echo "6. Firebase: npm start"