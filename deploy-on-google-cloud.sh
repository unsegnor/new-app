#!/bin/bash

deploy_on_google_cloud() {
  FOLDER=$1
  VERSION=$(node -p "require('./package.json').version")
  APP_NAME=$(node -p "require('./package.json').name")
  DOMAIN=$(node -p "require('./package.json').domain")
  ZONE=$(echo "$DOMAIN" | sed 's/\./-/g')
  DOCKERHUB_USERNAME=$(node -p "require('./package.json').dockerHubUsername")
  IMAGE_NAME="$DOCKERHUB_USERNAME/$APP_NAME-$FOLDER:$VERSION"
  # gcloud run deploy $APP_NAME --image $IMAGE_NAME --platform managed --region us-central1 --allow-unauthenticated
  # gcloud dns --project=vcalatayud record-sets create $APP_NAME.$DOMAIN. --zone="$ZONE" --type="CNAME" --ttl="300" --rrdatas="ghs.googlehosted.com."
  # gcloud beta run domain-mappings create --service $APP_NAME --domain $APP_NAME.$DOMAIN --force-override --region us-central1

    # Desplegar el servicio en Google Cloud Run
  gcloud run deploy $APP_NAME --image $IMAGE_NAME --platform managed --region us-central1 --allow-unauthenticated

  #   # Verificar si el servicio ya existe y obtener la imagen desplegada actualmente
  # CURRENT_IMAGE=$(gcloud run services describe --platform managed --region us-central1 $APP_NAME --format="value(status.latestCreatedRevisionName)" 2> /dev/null)
  # CURRENT_IMAGE_VERSION=${CURRENT_IMAGE#$APP_NAME-}

  # if [ -n "$CURRENT_IMAGE" ] && [ "$CURRENT_IMAGE_VERSION" = "$VERSION" ]; then
  #   echo "El servicio $APP_NAME ya existe y la versión de la imagen desplegada es la misma ($VERSION). Omitiendo el despliegue."
  # else
  #   # Desplegar el servicio en Google Cloud Run
  #   gcloud run deploy $APP_NAME --image $IMAGE_NAME --platform managed --region us-central1 --allow-unauthenticated
  # fi



  # Verificar si la asignación de dominio ya existe
  if gcloud beta run domain-mappings describe --platform managed --region us-central1 $APP_NAME.$DOMAIN &> /dev/null; then
    echo "La asignación de dominio para $APP_NAME.$DOMAIN ya existe"
  else
    echo "Creando la asignación de dominio para $APP_NAME.$DOMAIN"
    gcloud beta run domain-mappings create --service $APP_NAME --domain $APP_NAME.$DOMAIN --force-override --region us-central1
  fi

  # Crear o actualizar el registro DNS en Google Cloud DNS
  DNS_RECORD=$(gcloud dns record-sets list --zone="$ZONE" --name="$APP_NAME.$DOMAIN." --type="CNAME" --format="value(name)")
  if [ -n "$DNS_RECORD" ]; then
    echo "El registro DNS para $APP_NAME.$DOMAIN ya existe"
  else
    echo "Creando el registro DNS para $APP_NAME.$DOMAIN"
    gcloud dns --project=vcalatayud record-sets create $APP_NAME.$DOMAIN. --zone="$ZONE" --type="CNAME" --ttl="300" --rrdatas="ghs.googlehosted.com."
  fi
}

deploy_on_google_cloud "$1"
