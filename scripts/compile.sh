#!/bin/bash

# Compile client code in Elm.
# The output of the compilation will be the file client/index.html.
(cd client && elm make src/Main.elm --output=index.html)
