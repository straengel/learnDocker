# learnDocker
В этом репозитории, находятся материалы по DOCKER, которые я встретил в процессе изучения


#Команды:
- docker-compose up --build (сборка проекта для продакшена)
- docker-compose logs название_контейнера (посмотреть логи запущеного контейнера)
- docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build (запускаем режим разработки)
- docker run --rm -v $(pwd):/app composer install (установка vendora без композера, не забыть перейти в папочку laravel)
- docker-compose exec name_services (позволяет запускать конкретные команды в контейнерах) bash (запускается терминал bash)


        docker-compose exec app php artisan key:generate - запускаем php artisan key:generate в сервисе app
        docker-compose exec db bash - запускаем bash терминал в контейнере db. Выход из него - команда 'exit' 
        docker-compose exec app php artisan migrate
        docker run -it docker-laravel-nuxt_laravel /bin/sh - для пакетов alpine

- docker image prune --all (удалить все images) или docker rmi -f $(docker images -a -q)
- docker rm -vf $(docker ps -a -q) (удалить все контейнеры)
- docker volume rm $(docker volume ls -q) (удалить все переменные)
- docker system prune - удаляет все и вся (containers, volumes, images, networks, build cache) - более новая команда
- docker exec -u 0 -it id_container bash - заходим в bash
- docker images | grep udemy - команда отображает образы и показывает нам только
  те, что начинаются на udemy
- docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build - команда выполняет объединение двух фалов заменяю значения прод на дев
- docker-compose exec -T omt_php(название сервис) php artisan migrate:fresh --seed(команда для исполнения) - запуск команд внутри контейнера

Конфиги файлов с пояснением
--

- [docker-compose.yml](./readme/docker-compose.description.yml)
- [laravel](./readme/laravel/Dockerfile)
- [nuxt](./readme/nuxt/Dockerfile)
- [nginx](./readme/nginx/nginx.conf.test)
- [php7.4](./readme/php/Dockerfile)

#Инструкции в Dockerfile

- FROM — задаёт базовый (родительский) образ.
- LABEL — описывает метаданные. Например — сведения о том, кто создал и поддерживает образ.
- ENV — устанавливает постоянные переменные среды. (Например: ENV COMPOSER_ALLOW_SUPERUSER 1)
- RUN — выполняет команду и создаёт слой образа. Используется для установки в контейнер пакетов.
- COPY — копирует в контейнер файлы и папки. (если докер файл валяется не в том месте где копируются
файлы, то нужно прописывать путь до папки, в которой лежат нужные файл. Например: COPY ./../../../composer* /var/www/omt/)
- ADD — копирует файлы и папки в контейнер, может распаковывать локальные .tar-файлы.
- CMD — описывает команду с аргументами, которую нужно выполнить когда контейнер будет запущен. Аргументы могут быть переопределены при запуске контейнера. В файле может присутствовать лишь одна инструкция CMD.
- WORKDIR — задаёт рабочую директорию для следующей инструкции. (например для запуска npm install)
- ARG — задаёт переменные для передачи Docker во время сборки образа.
- ENTRYPOINT — предоставляет команду с аргументами для вызова во время выполнения контейнера. Аргументы не переопределяются.
- EXPOSE — указывает на необходимость открыть порт.
- VOLUME — создаёт точку монтирования для работы с постоянным хранилищем.

Заметки
--

- при перемещении Dockerfile в другую папку, мы должны в docker-compose.yml для
сервиса контекст, который показывает из какой папке будет выполняться копирование. Так например - 
context: . указывает на копию из текущей папки, в которой находиться сам файл docker-compose.yml, а
  context: ./readme будет говорить, что скачивать надо из папки readme
- С поддоменами полная беда, пока не знаю как решить, http://project.local/api/hi http://project.local работают
- https://github.com/nevadskiy/laravel-nuxt-docker - интересный репозиторий
- https://titanwolf.org/Network/Articles/Article?AID=a4ef5ad1-fdb4-47ca-8414-3766a6f4e224 - как еще можно организовать структуру
- для alpine необходимо использовать apk update (вместое apt-get update) && apk add (вместо apt-get install)
- разница между ports и expose


    Порты Этот раздел используется для определения сопоставления между хост - сервером и контейнером Docker.
      ports: - 10005:80
    Это означает, что приложение, запущенное внутри контейнера, открыто в порту 80. 
    Но внешняя система/объект не может получить к нему доступ, поэтому его необходимо сопоставить с портом хост-сервера.


    Примечание: 
    вы должны открыть порт хоста 10005 и изменить правила брандмауэра, 
    чтобы разрешить внешним сущностям доступ к приложению.
    Они могут использовать

    http://{хост IP}:10005
    что-то вроде этого

    EXPOSE Это используется исключительно для определения порта, на котором приложение работает внутри контейнера docker.
    Вы также можете определить его в dockerfile. Как правило, это хорошая и широко используемая практика для определения 
    EXPOSE внутри dockerfile, потому что очень редко кто-либо запускает их на другом порту, кроме порта по умолчанию 80

---

    Я полностью согласен с предыдущими ответами. Я просто хотел бы упомянуть, что разница между expose и 
    портами является частью концепции безопасности в docker. 
    Это идет рука об руку с сетью docker. Например:

<blockquote>
Я полностью согласен с предыдущими ответами. Я просто хотел бы упомянуть, 
что разница между expose и портами является частью концепции безопасности в docker. 
Это идет рука об руку с сетью docker. 

Например:

    Представьте себе приложение с веб-интерфейсом и базой данных. 
    Внешний мир нуждается в доступе к веб-интерфейсу (возможно, через порт 80), 
    но только сам сервер должен иметь доступ к хосту и порту базы данных. И
    спользуя пользовательский мост, только веб-порт должен быть открыт, и приложению базы данных не нужны открытые порты, 
    так как веб-интерфейс может связаться с ним по определяемому пользователем мосту.

Это распространенный случай использования при настройке сетевой архитектуры в docker.
Так, например, в сети моста по умолчанию порты недоступны из внешнего мира.
Для этого вы можете открыть входную точку с помощью "ports".
С помощью "expose" вы определяете связь внутри сети. Е
сли вы хотите предоставить порты по умолчанию, вам не нужно определять "expose" в файле docker-compose.
</blockquote>

- https://github.com/elbic/docker-nginx-laravel-vue-mysql - интересно с make командами

#Советы:
- папки с node_modules лучше удалять, так как могут появиться конфликты после настройки
---
- Если вылетает ошибка: 
    - caused: mount through procfd: not a directory: unknown: Are you trying to mount a directory onto a file (or vice-versa)? Check if the specified host path exists and is the expected type
    - то исправить можно так
    

        If you are using Docker for Windows, this error can happen if you have recently changed your password.

        How to fix:
    
        First make sure to delete the broken container's volume
            docker rm -v <container_name>
            Update: The steps below may work without needing to delete volumes first.
            Open Docker Settings
            Go to the "Shared Drives" tab
            Click on the "Reset Credentials..." link on the bottom of the window
            Re-Share the drives you want to use with Docker
            You should be prompted to enter your username/password
            Click "Apply"
            Go to the "Reset" tab
            Click "Restart Docker"
            Re-create your containers/volumes
---
- Если вы используете Docker в Windows в связке с WSL 2 то 
скорее всего у вас не заработает nodemon
(он не будет перезапускать API сервис при изменениях в его исходном коде)
    - Решение:
  В package.json объявить команду "dev" не так
  "dev": "nodemon"
  а вот так:
  "dev": "nodemon --legacy-watch"
    - Другой вариант решения проблемы с неработающим nodemon в docker под Windows: добавить в nodemon.js пару ключей:
      "legacyWatch": true,
      "pollingInterval": 4000
---
- После создания volumes для сервиса frontend, при запуске команды: (docker-compose up --build) появидась такая ошибка (см. ниже).  Погуглив нашёл совет отключить windows firewall. После этого всё заработало. Может кому пригодится...
  ERROR: for frontend  Cannot create container for service frontend: status code not OK but 500: {"Message":"Unhandled exception: Filesharing has been cancelled","StackTrace":"   at Docker.ApiServices.Mounting.FileSharing.<DoShareAsync>d__6.MoveNext() in C:\\workspaces\\stable-2.3.x\\src\\github.com\\docker\\pinata\\win\\src\\Docker.ApiServices\\Mounting\\FileSharing.cs:line 0\r\n--- End of stack trace from previous location where exception was thrown ---\r\n   at System.Runtime.ExceptionServices.ExceptionDispatchInfo.Throw()\r\n   at System.Runtime.CompilerServices.TaskAwaiter.HandleNonSuccessAndDebuggerNotification(Task task)\r\n   at Docker.ApiServices.Mounting.FileSharing.<ShareAsync>d__4.MoveNext() in C:\\workspaces\\stable-2.3.x\\src\\github.com\\docker\\pinata\\win\\src\\Docker.ApiServices\\Mounting\\FileSharing.cs:line 47\r\n--- End of stack trace from previous location where exception was thrown ---\r\n   at System.Runtime.ExceptionServices.ExceptionDispatchInfo.Throw()\r\n   at System.Runtime.CompilerServices.TaskAwaiter.HandleNonSuccessAndDebuggerNotification(Task task)\r\n   at Docker.HttpApi.Controllers.FilesharingController.<ShareDirectory>d__2.MoveNext() in C:\\workspaces\\stable-2.3.x\\src\\github.com\\docker\\pinata\\win\\src\\Docker.HttpApi\\Controllers\\FilesharingController.cs:line 21\r\n--- End of stack trace from previous location where exception was thrown ---\r\n   at System.Runtime.ExceptionServices.ExceptionDispatchInfo.Throw()\r\n   at System.Runtime.CompilerServices.Ta
  skAwaiter.HandleNonSuccessAndDebuggerNotification(Task task)\r\n   at System.Threading.Tasks
---
- Алекснадр, подскажите, пожалуйста, в чём смысл сначала устанавливать npm пакеты (node_modules), а потом копировать саму кодовую базу? Почему бы просто не сделать COPY . . и следом npm install?
- Это отличный вопрос!
  Вот самая подробная статья на эту тему http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/ Грубо говоря это делается для лучшей работы с кешом. В случае полной копии никакой кеш использован не будет и npm install произойдет обязательно. В нашем же кейзе если package.json не изменился, то билда npm install не произойдет.
---
- если вылетает такая ошибка: 
Do not run Composer as root/super user! See https://getcomposer.org/root for details
- То:
  Чтобы composer не ругался на root/super user, нужно установить переменную окружения
  ENV COMPOSER_ALLOW_SUPERUSER 1