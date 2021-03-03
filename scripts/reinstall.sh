#!/bin/bash

cd ..
clear

source .env.local

exitWithMessage () {
    local message=$1
    echo message
    return exit 1
}

echo "Deleting and reinstalling node_modules . . ."

if [ -z "$(pwd)" ] 
then
    exitWithMessage "Could not get the projects directory"
fi

if [ -z "$(ls node_modules)" ]
then
    exitWithMessage "Could not find the node_modules inside of $(pwd)"
fi

rm -r node_modules &>/dev/null
yarn install &>/dev/null

echo "✅"

exit 0