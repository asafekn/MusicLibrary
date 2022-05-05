#!/bin/sh

# Compile client code every time a client file change
find client/src | entr -cd './scripts/compile.sh'
