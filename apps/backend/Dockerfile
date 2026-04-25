# 1. BASE IMAGE (Using CLI because you are using artisan serve)
FROM php:8.4-cli-alpine
LABEL authors="Muhammad Saqib Bilal"

# 2. SYSTEM PACKAGES & PHP EXTENSIONS
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
    unzip

# Use the helper to install extensions reliably
COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/local/bin/
RUN install-php-extensions pdo pdo_pgsql bcmath zip gd intl mbstring opcache

# 3. COMPOSER
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 4. APP CODE
WORKDIR /var/www
COPY . .

# 5. DEPENDENCIES
RUN composer install \
    --no-dev \
    --optimize-autoloader \
    --no-interaction \
    --no-scripts

# 6. PERMISSIONS
# On Railway, we ensure the web user owns the files,
# but we stay root to allow binding to the dynamic port.
RUN chown -R www-data:www-data /var/www \
    && chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# 7. START SCRIPT
COPY start.sh /start.sh
RUN chmod +x /start.sh

# 8. EXPOSE (Railway ignores this but good for documentation)
EXPOSE 8080

# 9. START SERVER
CMD ["/start.sh"]
