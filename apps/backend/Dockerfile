# 1. BASE IMAGE
FROM php:8.4-fpm-alpine
LABEL authors="Muhammad Saqib Bilal"

# 2. SYSTEM PACKAGES & PHP EXTENSIONS (Updated for Postgres)
RUN apk add --no-cache \
    postgresql-dev \
    libzip-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    icu-dev \
    oniguruma-dev \
    bash \
    zip \
    unzip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install \
    pdo pdo_pgsql pdo_mysql bcmath zip gd intl mbstring

# 3. COMPOSER
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 4. APP CODE
WORKDIR /var/www
COPY apps/backend .

# 5. DEPENDENCIES (CRITICAL)
RUN composer install \
    --no-dev \
    --optimize-autoloader \
    --no-interaction \
    --no-scripts

# 6. PERMISSIONS
RUN chown -R www-data:www-data /var/www \
    && chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# 7. CLEANUP (Removed SQLite setup, added generic DB check)
# We no longer need to touch a database.sqlite file here.

# 8. COPY START SCRIPT
COPY apps/backend/start.sh /start.sh
RUN chmod +x /start.sh

# 9. RUN AS NON-ROOT
USER www-data

# 10. EXPOSE PORT
EXPOSE 8000

# 11. START SERVER VIA SCRIPT
CMD ["/start.sh"]
