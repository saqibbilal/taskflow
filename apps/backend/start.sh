#!/bin/sh
# ===============================
# Laravel startup script
# ===============================

# Clear caches (optional but recommended)
php artisan config:clear
php artisan route:clear
php artisan cache:clear

# Run migrations automatically (optional)
# php artisan migrate --force

# Start Laravel server
php artisan serve --host=0.0.0.0 --port=${PORT:-8000}
