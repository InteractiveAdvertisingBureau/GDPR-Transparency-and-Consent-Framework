HASH=$( git rev-parse HEAD | cut -c 1-10 )
docker build -t docker.io/stops/gdpr-ui:$HASH .
