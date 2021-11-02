#Как и что ставить на пхп 7.3
FROM php:7.4-fpm

# Install dependencies
RUN apt-get update && apt-get install -y \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    zlib1g-dev \
    zip \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    curl \
    bash \
    zlib1g-dev \
    libzip-dev

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -

RUN apt -y install nodejs
# Clear cache
#RUN apt-get clean && rm -rf /var/lib/apt/lists/*
# Install extensions
RUN docker-php-ext-install pdo pdo_mysql
RUN docker-php-ext-install mbstring

RUN docker-php-ext-install exif
RUN docker-php-ext-install pcntl
RUN docker-php-ext-install bcmath

RUN docker-php-ext-install gd
RUN docker-php-ext-install xml
#For PHP < 7.3, you then need to
#RUN docker-php-ext-configure zip --with-libzip
#ARG DEBIAN_FRONTEND=noninteractive
#RUN apt-get update && apt-get install -y --fix-missing \
#    apt-utils \
#    gnupg

#RUN echo "deb http://packages.dotdeb.org jessie all" >> /etc/apt/sources.list
#RUN echo "deb-src http://packages.dotdeb.org jessie all" >> /etc/apt/sources.list
#RUN curl -sS --insecure https://www.dotdeb.org/dotdeb.gpg | apt-key add -

#RUN apt-get update && apt-get install -y \
#    zlib1g-dev \
#    libzip-dev
RUN docker-php-ext-install zip


RUN curl -sS https://getcomposer.org/installer | php -- \
        --install-dir=/usr/local/bin --filename=composer




