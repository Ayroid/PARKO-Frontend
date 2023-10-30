#!/bin/bash
set -e
# Build the docker image

IMAGE="minor-react-app"

docker build -t $IMAGE .