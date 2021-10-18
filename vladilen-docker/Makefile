stop:
    docker stop llimg
run:
    docker run -d -p 80:3000 --env-file ./config/.env --rm --name llimg ll:volume
build:
    docker build -t ll:volume .
    создание образа
delete:
    docker rm ll:volume
createvolume:
    docker volume create namePerem
    создание переменных
run-dev:
    docker run -d -p 80:3000 -v "/Users/straengel/PhpstormProjects/vladilen-docker:/app" -v bdlog:/app/data -v /app/node_modules --env-file ./config/.env --rm --name llimg ll:volume
    запускаем образ с поддержкой переменных для режима разработки и хранения данных
rename:
    docker tag ll:volume straengel/ll:volume
    docker login
    docker push straengel/ll:volume
    нужно для заливки на докер хаб

