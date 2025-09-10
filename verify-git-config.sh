#!/bin/bash

# 🔍 GitHub Contributions Verification Script
# This script verifies if your git configuration is correct for GitHub contributions

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

echo "🔍 GitHub Contributions Configuration Checker"
echo "============================================="
echo ""

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    print_error "This is not a git repository!"
    echo "Please run this script from inside your repository directory."
    exit 1
fi

repo_name=$(basename $(git rev-parse --show-toplevel))
print_info "Checking repository: $repo_name"
echo ""

# Current configuration
echo "📋 Current Git Configuration:"
echo "----------------------------"
local_name=$(git config user.name 2>/dev/null || echo "❌ Not set")
local_email=$(git config user.email 2>/dev/null || echo "❌ Not set")
global_name=$(git config --global user.name 2>/dev/null || echo "❌ Not set")
global_email=$(git config --global user.email 2>/dev/null || echo "❌ Not set")

echo "Local Repository:"
echo "  Name:  $local_name"
echo "  Email: $local_email"
echo ""
echo "Global Configuration:"
echo "  Name:  $global_name"  
echo "  Email: $global_email"
echo ""

# Validation checks
echo "🔍 Validation Results:"
echo "====================="

issues_found=false

# Check if name is set
if [[ "$local_name" == "❌ Not set" ]]; then
    print_error "Local git user name is not set"
    issues_found=true
else
    print_status "Local git user name is set: $local_name"
fi

# Check if email is set
if [[ "$local_email" == "❌ Not set" ]]; then
    print_error "Local git user email is not set"
    issues_found=true
else
    # Check for problematic emails
    if [[ "$local_email" == *"example.com"* ]]; then
        print_error "Email is a placeholder: $local_email"
        print_warning "This email will NOT count toward GitHub contributions!"
        issues_found=true
    elif [[ "$local_email" == *"Copilot"* ]]; then
        print_error "Email is a bot email: $local_email"
        print_warning "This email will NOT count toward GitHub contributions!"
        issues_found=true
    elif [[ "$local_email" == *"users.noreply.github.com"* ]]; then
        if [[ "$local_email" == "152787656+18vikastg@users.noreply.github.com" ]]; then
            print_status "Valid GitHub noreply email: $local_email"
        else
            print_warning "GitHub noreply email but not for user 18vikastg: $local_email"
            print_info "Expected: 152787656+18vikastg@users.noreply.github.com"
        fi
    else
        print_status "Custom email set: $local_email"
        print_warning "Make sure this email is verified in your GitHub account!"
        print_info "Verify at: https://github.com/settings/emails"
    fi
fi

# Check recent commits
echo ""
echo "📊 Recent Commit Analysis:"
echo "========================="

recent_commits=$(git log --pretty=format:"%h|%an|%ae|%ad|%s" --date=short -5 2>/dev/null || echo "")

if [[ -z "$recent_commits" ]]; then
    print_warning "No commits found in this repository"
else
    echo "Last 5 commits:"
    echo "Format: [Hash] Author <Email> Date - Subject"
    echo ""
    
    commit_issues=false
    while IFS='|' read -r hash author email date subject; do
        echo "[$hash] $author <$email> $date - $subject"
        
        # Check if commit email will count toward contributions
        if [[ "$email" == *"example.com"* ]] || [[ "$email" == *"Copilot"* ]]; then
            print_error "  → This commit will NOT count toward GitHub contributions!"
            commit_issues=true
        elif [[ "$email" == "152787656+18vikastg@users.noreply.github.com" ]]; then
            print_status "  → This commit WILL count toward GitHub contributions!"
        elif [[ "$author" == "18vikastg" ]]; then
            print_status "  → This commit SHOULD count (verify email is linked to GitHub account)"
        else
            print_warning "  → Unknown if this commit will count - check email verification"
        fi
    done <<< "$recent_commits"
    
    if [ "$commit_issues" = true ]; then
        issues_found=true
    fi
fi

echo ""
echo "🎯 Summary & Recommendations:"
echo "=============================="

if [ "$issues_found" = false ]; then
    print_status "Configuration looks good!"
    print_status "Your commits should count toward GitHub contributions!"
    echo ""
    print_info "If contributions still don't show up:"
    echo "  • Wait 24 hours (GitHub updates contribution graph daily)"
    echo "  • Ensure repository is public or you're a collaborator"
    echo "  • Verify email is confirmed in GitHub settings"
else
    print_warning "Issues found with your git configuration!"
    echo ""
    echo "🔧 To fix these issues:"
    echo "  1. Run the fix script: ./fix-git-config.sh"
    echo "  2. Or manually set your git configuration:"
    echo "     git config user.name 'Vikas T. G'"
    echo "     git config user.email '152787656+18vikastg@users.noreply.github.com'"
    echo ""
    echo "📚 For detailed instructions, see: GITHUB_CONTRIBUTIONS_FIX.md"
fi

echo ""
echo "🔗 Useful Links:"
echo "  • GitHub Email Settings: https://github.com/settings/emails"
echo "  • Contribution Guide: https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile"
echo "  • Fix Script: ./fix-git-config.sh"
echo "  • Detailed Guide: ./GITHUB_CONTRIBUTIONS_FIX.md"

echo ""
print_info "🔍 Verification complete!"