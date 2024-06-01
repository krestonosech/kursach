# Outlook

## Запуск Frontend 

### Установка зависимостей
```
npm install
```

### Компиляция и запуск проекта
```
npm run serve
```

### Запуск линтера для исправления ошибок
```
npm run lint
```

## Запуск Backend

### Установка Docker 

https://www.docker.com/

### Установка Chocolatey (Choco)

Открываем cmd.exe и запускаем следующую команду: 
```
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "[System.Net.ServicePointManager]::SecurityProtocol = 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
```

### Установка make 
Открываем powershell от имени администратора и вводим команду:

```
choco install make
```

### Запуск сервера

Открываем Docker и вводим в терминале VS Code команду:
```
make up
```
