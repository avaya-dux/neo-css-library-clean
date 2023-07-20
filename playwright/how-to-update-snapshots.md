# how to update snapshots

## prerequisites

- install and start [Colima](https://github.com/abiosoft/colima), an open-source container runtime alternative (macOS only) by running the following commands from terminal:

```
# Homebrew
brew install colima

# Once installed, run colima
colima start
```

**NOTE**:
Playwright version: `v1.35.1`

Ubuntu version: `20.04`, codenamed "focal".

Thus, the docker image version chosen should be v1.35.1-focal.

## updating the snapshots and running tests

> To update the snapshots, build css and staging, start staging server, start a docker container, and finally run yarn commands inside the docker container

From root (`neo-css-library`): `yarn github`

From staging (`neo-css-library/staging`): `yarn start`

From Playwright (`neo-css-library/playwright`): `docker run --rm --network host -v $(pwd):/work/ -w /work/ -e BASEURL=http://host.docker.internal:3000 -it mcr.microsoft.com/playwright:v1.35.1-focal /bin/bash`

From inside docker container:

- `yarn`: install dependencies
- `yarn playwright test`: runs all tests; fails if any screenshots are not matching; will create screenshots if none exist
- `yarn playwright test --update-snapshots`: runs all tests, will update snapshots for those that are not matching
- `yarn playwright test navbar.spec.ts`: runs tests on only navbar page
- `yarn playwright test navbar.spec.ts --update-snapshots`: runs tests on navbar page; will update snapshots if not matching

_NOTE_: Make sure that you are not on VPN when udpating snapshots, as certain external resources (ex. images) may not load correctly

Outside of docker, under playwright:

- `yarn playwright show-report`: to see test report

### More information on [docker image](https://playwright.dev/docs/docker)

### Note: when renovate updates playwright version, the docker image version needs to be udpated here and in playwright-container.yml
