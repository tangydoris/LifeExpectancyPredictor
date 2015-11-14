# deathClock
_A Web Server Template in Flask on Ubuntu & Gunicorn using Docker_  
**by Collective Acuity**

## Components
- Ubuntu (OS)
- Gunicorn (Server)
- Flask (App)
- Bootstrap (CSS Template)
- awsDB (ORM/DOA)

## Dev Env
- Docker (Provisioning)
- GitHub (Version Control)
- AWS (Web Services)
- - EC2 (Webhosting)
- - DynamoDB (Account Database)
- - S3 (Records Database)
- - Lambda (Scheduled Task Trigger)
- PyCharm (IDE)
- Google Drive(Collaboration, Backup)

## Languages
- Python
- Regex
- Shell Script
- Javascript


## Setup DevEnv
- Install Boot2Docker on Localhost
- Install Git on Localhost
- Install Python dependencies on Localhost
- Create accounts on services used (such as Docker & Bitbucket)
- Create user for account in AWS IAM and give it S3 and DDB permissions
- Configure credentials in cred/ folder to match account credentials
- Add/edit application files in the server/ folder


## Launch Commands
**startServer.sh**  
_Creates container with required volumes and starts flask on a gunicorn server_  
Requires:  

- Container Alias
- Container Port
- Mapped Volumes
- Initial Command

**triggerDocker.sh**  
_Initiates an automated build command on Docker to update base image_  
Requires:  

- URL provided by Docker for triggering automated build


## Collaboration Notes

_The Git and Docker repos contain all the configuration for deployment to AWS.  
Google Drive can be used to share credentials and keys between collaborators.  
Collaborators are required to install dependencies on their local device.  
New dependencies should be added to the Dockerfile, **NOT** to the repo files.  
Collaborators should test changes to Dockerfile locally before merging to remote:_

```
docker build -t test-image .
```

_.gitignore and .dockerignore have already been installed in key locations.  
To prevent unintended file proliferation through version control &
provisioning,  
add/edit .gitignore and .dockerignore to include all new:_

1. local environments folders
2. localhost dependencies
3. configuration files with credentials and local variables