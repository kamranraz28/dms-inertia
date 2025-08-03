# Use PHP 8.2 with FPM
FROM php:8.2-fpm

# Ensure all packages are updated
RUN apt-get update && apt-get upgrade -y && apt-get clean && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /var/www

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git curl zip unzip \
    libpng-dev libonig-dev libxml2-dev libzip-dev \
    nodejs npm \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql mbstring zip exif pcntl

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy Laravel project files
COPY . .

# Create necessary storage directories and logs
RUN mkdir -p storage/framework/sessions \
    && mkdir -p storage/framework/cache \
    && mkdir -p storage/framework/views \
    && mkdir -p storage/logs \
    && touch storage/logs/laravel.log

# Set permissions for Laravel
RUN chown -R www-data:www-data /var/www \
    && chmod -R 775 storage bootstrap/cache

# Install PHP dependencies
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Install and build frontend assets
RUN npm install && npm run build

# Generate Laravel app key if .env exists
RUN if [ -f .env ]; then php artisan key:generate --force; fi

# Cache config, routes, and views to improve performance
RUN php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache

# Create storage symlink for public access (ignore failure)
RUN php artisan storage:link || true

# Expose PHP-FPM port
EXPOSE 9000

# Start PHP-FPM
CMD ["php-fpm"]
