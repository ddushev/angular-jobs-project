# DISCLAIMER

The app uses a practice server that does not keep track of the changes made after a couple of minutes of inactivity.

## AngularJobs app

- Client hosted on Firebase - [https://angularjobs-2bda0.web.app/](https://angularjobs-2bda0.web.app/) (it needs around 30-60seconds to awaken the server once the job list is open or login/register is attempted)
- Server hosted on Glitch - [https://abstracted-atom-fifth.glitch.me/data](https://abstracted-atom-fifth.glitch.me) (needs to be awakened if not used in the past 5 minutes)

## To install locally

1. Clone the repo locally.
2. Open the server folder in the terminal and type `node server`. Don't close the terminal just minimize it and leave the server working.
3. Open the client folder in another terminal and type `npm install` to install all dependencies.
4. In the terminal with the client folder type `npm start`.
5. Open the app at the address pointed out - most likely that would be ["Local:   http://127.0.0.1:4200/"](http://localhost:4200/)

## Overview

AngularJobs is a single-page application that allows users to register login and logout into a system. Logged-in users can create/read/update/delete job ads. Another functionality of the logged-in user is to also apply/cancel applications for job ads other users have published. Users can also save ads they like and refer back to them later or remove them from the saved list. Job lists can be filtered by the category of the ad which is done through the homepage. Guests(not logged-in users) can only browse job ads without the other functionalities.

## Pre-seed data(other data can be added after the server and the app are started but it will be lost once the server is closed/asleep)

1. Users - there are two users which can be used to login into the app
   - `danieldyshew@gmail.com - 123456`
   - `maria@gmail.com - 123456`
2. Job ads - there are several job ads added for both users some of which are already in the saved and applied list.

## Technical stack

1. TypeScript
2. HTML
3. SCSS
4. Angular
5. RxJS
6. NgRx

## Architecture

1. Project structure
   - Everything is located in the src folder which contains:
   - The assets folder holds the bootstrap CSS, images, JS, and SASS files required for this template.
   - The app folder holds the components, constants, directives, environments, guards, interceptors, services, state, and types folders along with routes config and the main app component.
   - The index.html file is the entry point of the app and it loads the necessary fonts, stylesheets, and javascript libraries while main.ts bootstraps the application using the AppComponent and appConfig.
2. Routing
   - All routes can be found in the app.routes.ts file.
   - Some of the routes are protected depending on whether the user is logged in/logged out or the relation between the user and the particular resource(owner or not).
   - If the user tries to access an invalid route he is shown the NotFound page.
3. State management
   - The app uses NgRx for holding and sharing authentication state across the app.
4. API integration
   - The app uses REST API and RxJS to asynchronously make requests.
   - The job.service and auth.service file in the services folder contains methods for working with the API for all possible functionalities.
5. Deployment
    - The server is hosted via [Glitch](https://glitch.com/) and can be accessed at: [https://angularjobs-2bda0.web.app/](https://angularjobs-2bda0.web.app/). After several minutes of inactivity, it falls asleep.
    - The client is deployed via [Firebase](https://firebase.google.com/) and can be access at [https://abstracted-atom-fifth.glitch.me/data](https://abstracted-atom-fifth.glitch.me)
