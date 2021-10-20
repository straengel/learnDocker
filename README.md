# learnDocker
В этом репозитории, находятся материалы по DOCKER, которые я встретил в процессе изучения


#Команды:
- docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build - команда выполняет объединение двух фалов заменяю значения прод на дев
---  
- docker images | grep udemy - команда отображает образы и показывает нам только 
те, что начинаются на udemy


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
- 