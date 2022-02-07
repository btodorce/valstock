#!/bin/bash
set -e
APP_NAME="valstock"
REPO="demo"
USER="btodorce"
REPO_ID="u5t5t6m8"
AWS_ACCOUNT_ID=$AWS_ACCOUNT_ID

docker build . -t "${APP_NAME}:latest"
echo "Docker tag as latest"
docker image tag "${APP_NAME}:latest" "btodorce/${APP_NAME}"
echo "Docker tag as aws repo id"
docker image tag "${APP_NAME}:latest" "public.ecr.aws/${REPO_ID}/${APP_NAME}"
echo "Logging in to aws"
aws ecr-public get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin public.ecr.aws/${REPO_ID}
echo "Docker push"
docker push "public.ecr.aws/${REPO_ID}/${APP_NAME}"
