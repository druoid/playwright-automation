## Purpose

This project showcases playwright UI automation examples using test cases from https://automationexercise.com/test_cases

The project uses github actions and Page Object Model best practices. It also uses eslint as the linting tool and faker
for dynamic data creation. There is also a mechanism to specify which environment settings to use i.e dev or test (defaulting to dev) and it skips tests if an environment is unreachable.

## Getting the Latest Code

To get the latest code open your IDE terminal and navigate to where you would like the project to reside (usually a dev folder) and run `git clone https://github.com/druoid/playwright-automation.git`

## Setting Up the Environment

To run playwright tests locally, your system must have node installed

1. In a terminal install NVM (Node version manager) with `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash`
2. Restart terminal, then install Node.js by running the following command `nvm install node` # latest version
3. Verify npm is installed by running the following command `npm -v` # Should return the npm version

## Running the Tests

1. In your IDE's terminal navigate to the root of the project
2. Run `npm install` to install dependencies
3. Run `npx playwright test`
