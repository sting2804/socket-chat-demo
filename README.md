# README #

Для запуска сервера достаточно выполнить 

- npm install

- npm start


## FOR Production

npm install && npm run build


## ON SERVER 

>**$ cat /etc/systemd/system/felogger.service**

>[Unit]

>Description=FE logger

>

>[Service]

>ExecStart=/usr/sbin/node /var/www/fe_logger/dist/server.js

>Restart=always

>User=www-data

>Group=www-data

>Environment=PATH=/usr/bin:/usr/local/bin

>Environment=NODE_ENV=production

>Environment=PORT=8900

>WorkingDirectory=/var/www/fe_logger
>
>[Install]

>WantedBy=multi-user.target








$ systemctl start felogger

$ journalctl -u felogger

$ systemctl stop felogger

