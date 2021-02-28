#!/bin/bash

cd ..
clear

source .env.local

exitWithMessage () {
    local message=$1
    echo message
    return exit 1
}

showProgress() {
    local step=$1
    if [ step == 'pending' ]
    then
        return ' . . . '
    fi
    if [ step == 'done' ]
    then
        return 'X'
    fi
}

MODULES_REINSTALLED=pending
TESTS_PASSED=pending
BUILD_COMPLETE=pending

echo "[$(showProgress MODULES_REINSTALLED)] --> Delete and reinstall node_modules"
echo "[] --> Run jest tests"
echo "[] --> Create production build"

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
MODULES_REINSTALLED=done

TEST_PASSED="$(yarn test &>/dev/null | grep -o 'failing')"

if [ TEST_PASSED == "failing" ]
then
    exitWithMessage "The Jest tests failed"
fi

TEST_PASSE=done

BUILD_PASSED="$(yarn build | grep -o 'failing')"

if [ BUILD_PASSED == "failing" ]
then
    exitWithMessage "The production build failed"
fi


echo Finished Successfully.
exit 0