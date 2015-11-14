# Triggers a new automated build of a Docker image
curl -H "Content-Type: application/json" --data '{"docker_tag": "latest"}' -X POST https://registry.hub.docker.com/u/rc42/lab-deathclock/trigger/4662dfcb-4318-4d56-97eb-01f8182e4950/
