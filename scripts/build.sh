exitWithMessage () {
    local message=$1
    echo message
    return exit 1
}

echo "Creating pre-rendered production build . . ."

BUILD_PASSED="$(yarn build | grep -o 'failing')"

if [ BUILD_PASSED == "failing" ]
then
    exitWithMessage "The production build failed"
fi

echo "Production build successfully built -- ready for deployment ✅."

exit 0