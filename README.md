## Introduction
This project is an automated testing setup for a test assignment. It uses **Playwright** to test a web application (Gift Page) using multiple test scenarios.

## Prerequisites
Before running the tests locally, you need to have the following installed:

- **Node.js** (version 16 or above)  
  Download and install Node.js from [here](https://nodejs.org/).

- **Playwright**  
  This project uses Playwright for browser automation. It will be installed when you set up the project.

## Steps for Local Deployment

### 1. Download the Project
If you received this project as a `.zip` file, extract the contents to a folder on your local machine.

### 2. Install Dependencies
```bash
npm install
```
### 3. Running Tests
After the installation is complete, you can run the tests using the following commands.

#### Run Playwright Tests (Headless Mode)
To run the tests in headless mode (default), use:

```bash
npm test
```
This will execute the tests without a UI.

#### Run Playwright Tests with UI
If you want to run the tests with the Playwright Test Runner UI, use:

```bash
npm run test:ui
```