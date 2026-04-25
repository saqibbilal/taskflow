#!/bin/sh
# ===============================
# TaskFlow Startup Script
# ===============================

# Ensure storage link exists
php artisan storage:link --force

# Clear caches for a fresh deploy
php artisan config:clear
php artisan view:clear

# Migrations: Since this is TaskFlow, run them automatically
# The --force flag is required for production environments
php artisan migrate --force

# Start Server
# Using the built-in server directly is often more robust in Docker than 'serve'
php -S 0.0.0.0:${PORT:-8080} -t public
