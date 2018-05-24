HASH=$( git rev-parse HEAD | cut -c 1-10 )
docker run docker.io/stops/gdpr-ui:$HASH npm test
exit $result
