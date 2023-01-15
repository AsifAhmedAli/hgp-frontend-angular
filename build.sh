#!/bin/bash

# pull latest code
 git pull

#npm install
 npm install

# create bulid
 npm run build:ssr
#ng build --prod --aot

#copy htaccess file to dist/ewc-web
#sudo cp .htaccess dist/ewc-web/.htaccess


# flush the log file
 pm2 flush

# restart pm2 main server
 pm2 restart hgp

