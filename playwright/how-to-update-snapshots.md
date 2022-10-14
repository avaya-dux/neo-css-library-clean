# how to update snapshots:

> must have Doker desktop installed on your local

> choose a docker image of a version that matches playwright version in this project and ubuntu version using in CI

e.g. Playwright version used in this project currently is v1.27.0. Ubuntu version used in 20.04, which has a codename "focal".
So the docker image version chosen should be v1.27.0-focal.

> To update the snapshots, build css and staging, start staging server, start a docker container, and finally run yarn commands inside docker container like below:

`yarn github`: do this under root

`yarn start`: do this under staging

`docker run --rm --network host -v $(pwd):/work/ -w /work/ -e BASEURL=http://host.docker.internal:3000 -it mcr.microsoft.com/playwright:v1.27.0-focal /bin/bash`: do this under playwright

Now inside docker container:

`yarn`: install dependencies

`yarn playwright test`: run all tests; fail if any screenshots are not matching; will create screenshots if not exist

`yarn playwright test --update-snapshots`: run all tests, will update snapshots for those that are not matching

`yarn playwright test navbar.spec.test`: run tests on only navbar page

`yarn playwright test navaar.spec.test --update-snapshots`: run tests on navbar page; will update snapshots if not matching

NOTE: Make sure that you are not on VPN when udpating snapshots, as certain external resources (ex. images) may not load correctly

Outside of docker, under playwright:

`yarn playwright show-report`: to see test report

## More information on [docker image](https://playwright.dev/docs/docker)
