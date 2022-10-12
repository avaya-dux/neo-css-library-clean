# how to update snapshots:

> must have Doker desktop installed on your local

> choose a docker image of a version that matches playwright version in this project and ubuntu version using in CI

e.g. Playwright version used in this project currently is v1.27.0. Ubuntu version used in 20.04, which has a codename "focal".
So the docker image version chosen should be v1.27.0-focal.

> To update the snapshots, start staging server, create a docker container, and finally run yarn commands like below:

`yarn start`

`docker run --rm --network host -v $(pwd):/work/ -w /work/ -e BASEURL=http://host.docker.internal:3000 -it mcr.microsoft.com/playwright:v1.27.0-focal /bin/bash`: login to docker container

`yarn`

`yarn playwright test --update-snapshots`


## More information on [docker image](https://playwright.dev/docs/docker)
