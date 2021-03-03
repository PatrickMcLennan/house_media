#!/bin/bash

bash reinstall.sh
bash test.sh
bash build.sh

pm2 restart house_media

exit 0