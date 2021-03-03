#!/bin/bash

bash reinstall.sh
bash test.sh
bash build.sh

pm2 restart 0

exit 0