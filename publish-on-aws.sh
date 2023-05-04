#!/bin/bash

build_and_push_image() {
  FOLDER=$1
  VERSION=$(node -p "require('./package.json').version")
  APP_NAME=$(node -p "require('./package.json').name")
  AWS_REGION=us-east-1 #This is the region where the ECR Public is available, see: https://docs.aws.amazon.com/AmazonECR/latest/public/public-registries.html
  ECR_REGISTRY=public.ecr.aws/a4f3i6u7 #TODO: al final parece que sólo podemos usar lambda functions desde contenedores de registros privados, por lo que no podemos usar ECR Public
  ECR_REPOSITORY=$APP_NAME-$FOLDER
  IMAGE_NAME="$ECR_REGISTRY/$ECR_REPOSITORY:$VERSION"

  # Check if the repository exists in ECR, and create it if it doesn't
  if ! aws ecr-public describe-repositories --region $AWS_REGION --repository-names $ECR_REPOSITORY > /dev/null 2>&1; then
    aws ecr-public create-repository --region $AWS_REGION --repository-name $ECR_REPOSITORY
  fi

  # Log in to Amazon ECR Public (the AWS user is a known user to connect to ECR Public, the credentials come from the password)
  aws ecr-public get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REGISTRY

  # Build and push the image
  docker build -t $IMAGE_NAME -f ./$FOLDER/Dockerfile .
  docker push $IMAGE_NAME
}

build_and_push_image "$1"


#TODO: al final parece que sólo podemos usar lambda functions desde contenedores de registros privados, por lo que no podemos usar ECR Public
#Podemos usar otro modo de despliegue que no sea con docker para la lambda function
#o podemos probar con otro servicio como Azure Functions o Google Cloud Functions