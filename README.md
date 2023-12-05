# AirlineCheckinApp

The Airline Check-in App is a web application designed to facilitate the check-in process for airline passengers. This document provides an overview of the project structure, helping developers and contributors understand the organization of the codebase.

```
weather-app/
|-- src/
|   |-- components/
|   |   |-- Search/
|   |   |   |-- Seach.vue
|   |   |-- Spinner/
|   |   |   |-- Spinner.vue
|   |   |-- Weather/
|   |   |   |-- Weather.vue
|   |   |   |-- WeatherDetail.vue
|   |   |   |-- WeatherInfo.vue
|   |   |   |-- TemperatureInfo.vue
|   |
|   |-- css/
|   |   |-- base.css
|   |   |-- app.css
|   |
|   |-- types/
|   |   |-- weather.response.ts
|   |
|   |-- utils/
|   |   |-- executeRequest.ts
|   |
|   |-- App.vue
|   |-- main.ts
|
|-- public/
|   |-- index.html

```

### Here's a brief explanation of each directory:

1. `src:` This directory contains the source code of the application.

2. `app:` The main application codebase.
3. `graphal:` Files related to GraphQL configuration and setup.
4. `main module:` The core functionality of the application.
5. `models:` Definitions for data models and structures.
6. `modules:` Sub-modules or features of the application.
7. `service:` Files related to various services, like API services and data fetching.
8. `shared-module:` Reusable components, services, or utilities shared across different modules.
9. `assets:` Static files such as images, fonts, or other resources.
10. `environments:` Configuration files for different environments (e.g., development, production).
11. `gql-mocks:` GraphQL mock data used during development or testing.
12. `public:` Static assets that will be served as-is. This could include the HTML file, images, or other files not processed by Webpack.
