#!/bin/bash

set -e

# Build the docker image
IMAGE="minor-react-app"

docker run --rm -d -p 5173:5173 -v $(pwd):/app --name minor-react-app $IMAGE