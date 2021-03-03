exitWithMessage () {
    local message=$1
    echo message
    return exit 1
}

echo "Running Jest tests . . ."

TEST_PASSED="$(yarn test &>/dev/null | grep -o 'failing')"

if [ TEST_PASSED == "failing" ]
then
    exitWithMessage "The Jest tests failed"
fi

echo "✅"

exit 0