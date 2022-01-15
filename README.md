# Painting Ranker
A fun way to create a labelled dataset for Acrylic!


# Infrastructure
| Title | Link |
| --- | --- |
| Frontend Deployment | [Deta](www.deta.sh) |
| Photo storage | [Google Cloud Bucket](https://console.cloud.google.com/storage/browser/painting-dataset/500px/resized?pageState=(%22StorageObjectListTable%22:(%22f%22:%22%255B%255D%22))&authuser=1&project=key-period-335101&prefix=&forceOnObjectsSortingFiltering=false) | 
| NoSQL Database | [Deta](www.deta.sh) |

# Commands
## Running locally
- Install requirements from `app/requirements.txt` with `pip install -r requirements.txt` and `frontend/` with `npm install`
- Run the server that serves the api and the HTML in `app/` with `bash ./run-local.sh`
- In another terminal, start up the app under `frontend/` with `npm run dev`

Voila! Any change in frontend will copy over files to app, and any change in app will reload the server

## Deploying
- Install `deta` cli from [deta.sh](www.deta.sh)
- In `app/` run `bash ./deploy.sh`

Voila!