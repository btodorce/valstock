#!/bin/bash
set -e
APP_NAME="valstock"
REPO="demo"
USER="btodorce"
AWS_REGION="eu-west-3"
AWS_ACCOUNT_ID=$AWS_ACCOUNT_ID

docker build . -t "${APP_NAME}:latest"
echo "Docker tag as latest"
docker image tag "${APP_NAME}:latest" "btodorce/${APP_NAME}"
echo "Docker tag as aws repo id"
docker image tag "${APP_NAME}:latest" "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${APP_NAME}"
echo "Logging in to aws"
aws ecr get-login-password --region "$AWS_REGION" | docker login --username AWS --password-stdin "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
echo "Docker push"
docker push "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${APP_NAME}:latest"
# docker image push --all-tags "${USER}/${APP_NAME}"
