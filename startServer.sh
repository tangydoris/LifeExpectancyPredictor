# Set OS Path Hack Variable
if [[ ${OS} == Windows* ]]
then
  LAB_HACK_FIRST_SLASH="/"
  APP_LOCAL_HOST=`boot2docker ip`
else
  LAB_HACK_FIRST_SLASH=""
  APP_LOCAL_HOST=0.0.0.0
fi
APP_CONTAINER_PORT=5003
APP_CONTAINER_ALIAS=deathclock
APP_DOCKER_IMAGE=rc42/lab-deathclock

# Launch Processor Container with Volumes
docker run --name $APP_CONTAINER_ALIAS \
-v $LAB_HACK_FIRST_SLASH"$(pwd)"/server:/server \
-v $LAB_HACK_FIRST_SLASH"$(pwd)"/cred:/cred \
-it -d -p $APP_CONTAINER_PORT:5000 $APP_DOCKER_IMAGE gunicorn --chdir server -w 3 launch:app -b 0.0.0.0:5000

# Instructions for setting -w argument for gunicorn server
# workers should be (2 x number of cores) + 1

# Instructions for running uwsgi server
# uwsgi --http 0.0.0.0:5000 --chdir server --wsgi-file launch.py --callable app

# Instructions to open up a terminal inside processor
# docker exec -it flaskserver bash

# Location to View on Browser
echo To view on localhost: open up browser to $APP_LOCAL_HOST:$APP_CONTAINER_PORT

# Reminder to End Processor Container
echo To stop server: docker rm -f $APP_CONTAINER_ALIAS