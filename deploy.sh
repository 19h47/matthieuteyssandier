#!/bin/bash

# Production deployment script for the Matthieu Teyssandier WordPress theme.
# Installs dependencies, builds assets, and removes files not needed in production.

set -e  # Exit on error

# Log file configuration
LOG_FILE="${1:-deploy.log}"

# Write a timestamped message to the log
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}

# Log and print errors to stderr
error() {
    local message="❌ Error: $1"
    log "$message"
    echo "$message" >&2
    exit 1
}

# Log success messages
success() {
    log "✅ $1"
}

# Log informational messages
info() {
    log "ℹ️  $1"
}

# Initialize log file
log "🚀 Starting production deployment..."

# Ensure the script runs from the theme root
if [ ! -f "composer.json" ] || [ ! -f "package.json" ]; then
    error "This script must be run from the WordPress theme root directory"
fi

# 1. Install Composer dependencies (production only)
info "Installing Composer dependencies (production only)..."
if command -v composer &> /dev/null; then
    composer install --no-dev --optimize-autoloader --no-interaction >> "$LOG_FILE" 2>&1 || error "Composer install failed"
    success "Composer dependencies installed"
else
    error "Composer is not installed or not in PATH"
fi

# 2. Install front-end dependencies
info "Installing front-end dependencies..."
if command -v pnpm &> /dev/null && [ -f "pnpm-lock.yaml" ]; then
    pnpm install --frozen-lockfile >> "$LOG_FILE" 2>&1 || error "pnpm install failed"
    success "pnpm dependencies installed"
elif command -v npm &> /dev/null; then
    npm ci --production=false >> "$LOG_FILE" 2>&1 || error "npm install failed"
    success "npm dependencies installed"
else
    error "pnpm or npm must be installed"
fi

# 3. Build assets
info "Building assets..."
if command -v pnpm &> /dev/null && [ -f "pnpm-lock.yaml" ]; then
    pnpm run build >> "$LOG_FILE" 2>&1 || error "Build failed"
else
    npm run build >> "$LOG_FILE" 2>&1 || error "Build failed"
fi
success "Build completed successfully"

# 4. Remove files and directories not needed in production
info "Cleaning up development files..."

# Remove dependency directories
if [ -d "node_modules" ]; then
    rm -rf node_modules
    success "node_modules removed"
fi

if [ -d "vendor" ]; then
    # Keep vendor/ (required for the PHP autoloader)
    info "vendor/ kept (required for PHP autoloader)"
fi

# Remove development configuration files
FILES_TO_REMOVE=(
    ".git"
    ".github"
    ".gitignore"
    ".editorconfig"
    ".prettierrc.json"
    "tsconfig.json"
    "vite.config.js"
    "package.json"
    "package-lock.json"
    "pnpm-lock.yaml"
    "pnpm-workspace.yaml"
    "composer.json"
    "composer.lock"
    "phpcs.xml"
    "deploy.sh"
    ".DS_Store"
    ".env.sample"
)

for file in "${FILES_TO_REMOVE[@]}"; do
    if [ -e "$file" ]; then
        rm -rf "$file"
        success "$file removed"
    fi
done

# Remove src/ (source files not needed in production)
if [ -d "src" ]; then
    rm -rf src
    success "src/ removed"
fi

# Remove documentation files (optional, disabled by default)
# if [ -f "README.md" ]; then
#     rm -f README.md
#     success "README.md removed"
# fi

# Remove macOS system files
find . -name ".DS_Store" -type f -delete 2>/dev/null || true
find . -name "._*" -type f -delete 2>/dev/null || true

success "Cleanup completed"

log ""
log "✨ Production deployment completed successfully!"
log ""
info "Files kept for production:"
log "  - vendor/ (PHP autoloader)"
log "  - dist/ (compiled assets)"
log "  - public/ (public assets)"
log "  - includes/ (theme PHP code)"
log "  - views/ (Twig templates)"
log "  - All theme .php files"
