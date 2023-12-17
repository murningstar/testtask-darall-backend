#!/bin/bash

# Контейнер с этим скриптом запускается, только когда
# и postgres и minio - healty

set -e

FLAG="/usr/initializer/migration_done.flag"

if [ ! -f "$FLAG" ]; then

    echo "Flag not found. Starting initialization."

    npx prisma migrate dev --name init

    echo "Prisma init migration successfully applied!"

    node /usr/initializer/initializer-minio.js

    echo "Category buckets successfully created!"

    touch "$FLAG"

    echo "Shutting down..."

else

    echo "Already initialized! Shutting down..."

fi
