FROM ubuntu:14.04

MAINTAINER <support@collectiveacuity.com>

# Standard OS Utils
RUN apt-get update
RUN apt-get install -y git
RUN apt-get install -y cron
RUN apt-get install -y build-essential
RUN apt-get install -y libssl-dev
RUN apt-get install -y libffi-dev
RUN apt-get install -y python-dev
RUN apt-get install -y python3-pip

# Python Dependencies
RUN pip3 install python-dateutil
RUN pip3 install pytz
RUN pip3 install tzlocal
RUN pip3 install mandrill
RUN pip3 install twilio
RUN pip3 install flask
RUN pip3 install boto3
RUN pip3 install pysha3
RUN pip3 install cryptography
RUN pip3 install paramiko
RUN pip3 install scp
RUN pip3 install pytest
RUN pip3 install gunicorn

# Initiate Flask on Gunicorn
# CMD ["gunicorn": "--chdir server -w 3 launch:app -b 0.0.0.0:5000"]