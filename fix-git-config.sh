#!/bin/bash

# 🔧 GitHub Contributions Fix Script
# This script helps configure git properly for GitHub contributions

set -e

echo "🔧 GitHub Contributions Fix Script"
echo "=================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    print_error "This is not a git repository!"
    echo "Please run this script from inside your repository directory."
    exit 1
fi

print_info "Repository detected: $(basename $(git rev-parse --show-toplevel))"
echo ""

# Current configuration
echo "📋 Current Git Configuration:"
echo "----------------------------"
current_name=$(git config user.name 2>/dev/null || echo "Not set")
current_email=$(git config user.email 2>/dev/null || echo "Not set")

echo "Name:  $current_name"
echo "Email: $current_email"
echo ""

# Check if current email is problematic
problematic_emails=("your-email@example.com" "user@example.com" "test@example.com" "*@users.noreply.github.com" "*Copilot*")
is_problematic=false

for pattern in "${problematic_emails[@]}"; do
    if [[ "$current_email" == *"example.com"* ]] || [[ "$current_email" == *"Copilot"* ]]; then
        is_problematic=true
        break
    fi
done

if [ "$is_problematic" = true ]; then
    print_warning "Problematic email detected: $current_email"
    print_warning "This email will NOT count toward GitHub contributions!"
    echo ""
fi

# Ask user for their preference
echo "🎯 Choose Your Configuration:"
echo "=============================="
echo "1) Use GitHub noreply email (Privacy protection - RECOMMENDED)"
echo "2) Use your verified email address"
echo "3) View current configuration only"
echo ""

read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        echo ""
        print_info "Setting up GitHub noreply email..."
        
        # For user 18vikastg with ID 152787656
        github_email="152787656+18vikastg@users.noreply.github.com"
        github_name="Vikas T. G"
        
        echo ""
        echo "📧 Configuration to be set:"
        echo "Name:  $github_name"
        echo "Email: $github_email"
        echo ""
        
        read -p "Apply this configuration? (y/N): " confirm
        if [[ $confirm =~ ^[Yy]$ ]]; then
            git config user.name "$github_name"
            git config user.email "$github_email"
            
            print_status "Git configuration updated successfully!"
            
            # Ask about global configuration
            echo ""
            read -p "Also set this as global configuration for all repositories? (y/N): " global_confirm
            if [[ $global_confirm =~ ^[Yy]$ ]]; then
                git config --global user.name "$github_name"
                git config --global user.email "$github_email"
                print_status "Global git configuration updated!"
            fi
        else
            print_info "Configuration not applied."
        fi
        ;;
        
    2)
        echo ""
        print_info "Setting up custom email address..."
        print_warning "Make sure this email is verified in your GitHub account settings!"
        echo "Verify at: https://github.com/settings/emails"
        echo ""
        
        read -p "Enter your full name: " custom_name
        read -p "Enter your verified email: " custom_email
        
        # Basic email validation
        if [[ ! "$custom_email" =~ ^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$ ]]; then
            print_error "Invalid email format!"
            exit 1
        fi
        
        echo ""
        echo "📧 Configuration to be set:"
        echo "Name:  $custom_name"
        echo "Email: $custom_email"
        echo ""
        
        read -p "Apply this configuration? (y/N): " confirm
        if [[ $confirm =~ ^[Yy]$ ]]; then
            git config user.name "$custom_name"
            git config user.email "$custom_email"
            
            print_status "Git configuration updated successfully!"
            
            # Ask about global configuration  
            echo ""
            read -p "Also set this as global configuration for all repositories? (y/N): " global_confirm
            if [[ $global_confirm =~ ^[Yy]$ ]]; then
                git config --global user.name "$custom_name"
                git config --global user.email "$custom_email"
                print_status "Global git configuration updated!"
            fi
        else
            print_info "Configuration not applied."
        fi
        ;;
        
    3)
        print_info "Showing current configuration only."
        ;;
        
    *)
        print_error "Invalid choice!"
        exit 1
        ;;
esac

echo ""
echo "📋 Updated Git Configuration:"
echo "----------------------------"
echo "Local Repository:"
echo "  Name:  $(git config user.name 2>/dev/null || echo 'Not set')"
echo "  Email: $(git config user.email 2>/dev/null || echo 'Not set')"
echo ""
echo "Global Configuration:"
echo "  Name:  $(git config --global user.name 2>/dev/null || echo 'Not set')"
echo "  Email: $(git config --global user.email 2>/dev/null || echo 'Not set')"

echo ""
echo "🎯 Next Steps:"
echo "============="
echo "1. Make a test commit to verify the configuration:"
echo "   git add ."
echo "   git commit -m 'Test: Verify GitHub contributions fix'"
echo "   git push"
echo ""
echo "2. Check your GitHub contribution graph after 24 hours"
echo ""
echo "3. For fixing past commits, see: GITHUB_CONTRIBUTIONS_FIX.md"
echo ""

print_status "Configuration script completed!"

# Test if we can make a sample commit
if [[ $choice -eq 1 || $choice -eq 2 ]] && [[ $confirm =~ ^[Yy]$ ]]; then
    echo ""
    read -p "Create a test commit now to verify the fix? (y/N): " test_commit
    if [[ $test_commit =~ ^[Yy]$ ]]; then
        # Create a small verification file
        echo "# GitHub Contributions Configuration Fixed ✅" > .github-contributions-fixed
        echo "" >> .github-contributions-fixed
        echo "✅ Git user name: $(git config user.name)" >> .github-contributions-fixed
        echo "✅ Git user email: $(git config user.email)" >> .github-contributions-fixed
        echo "✅ Configuration applied on: $(date)" >> .github-contributions-fixed
        echo "✅ Future commits will count toward GitHub contribution streak!" >> .github-contributions-fixed
        
        git add .github-contributions-fixed
        git commit -m "Fix: Configure git for proper GitHub contributions

- Set correct user name and email for GitHub contributions
- Fixed issue where commits were not showing in contribution graph
- Future commits will now count toward contribution streak"

        print_status "Test commit created successfully!"
        print_info "Push this commit to see it in your GitHub contribution graph within 24 hours."
        echo ""
        echo "Run: git push origin main"
    fi
fi

echo ""
print_status "🎉 GitHub contributions fix is complete!"
echo "Your future commits will now properly count toward your contribution streak!"