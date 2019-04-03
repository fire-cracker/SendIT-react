# SendIT

 [![Build Status](https://travis-ci.org/oyedejipeace/SendIT-react.svg?branch=develop)](https://travis-ci.org/oyedejipeace/SendIT-react)[![Coverage Status](https://coveralls.io/repos/github/oyedejipeace/SendIT-react/badge.svg?branch=develop)](https://coveralls.io/github/oyedejipeace/SendIT-react?branch=develop)[![Maintainability](https://api.codeclimate.com/v1/badges/1084a7543578780c4e77/maintainability)](https://codeclimate.com/github/oyedejipeace/SendIT-react/maintainability)



## Table of Contents

* [Project Overview](#Project-Overview)
* [Features](#Features)
* [Demo](#demo)
* [Built with](#built-with)
* [API End Points](#API-End-Points)
* [Known Issues](#Known-issues)
* [Installation](#Installation)
* [Contributing](#contributing)
* [License](#License)

## Project Overview
**SendIT** is a courier service that helps users deliver parcels to different destinations. SendIT  provides courier quotes based on weight categories. it was built from scratch using `Html` , `Css` , `JavaScript` and `Node.js`

## Features

- Users can create an account and log in,
- A user can create parcel delivery order,
- A user can see history of Parcel delivery orders,
- A user can see the details of a parcel delivery order such as the pickup location, destination, and price.e.t.c  
- A user can cancel a parcel delivery order,
- A user can change the destination of a parcel delivery order is yet to be delivered
- The admin can see list of parcel delivery orders,
- The admin change present location of parcel delivery orders,
- The admin can mark orders as pending (in transit) or delivered.

## Demo

Visit [User Dashboard](https://oyedejipeace.github.io/SendIT/UI)

Visit [Admin Dashboard](https://oyedejipeace.github.io/SendIT/UI/admin.html)

## Built with
- `HTML 5`
- `CSS`
- `JavaScript`
- `Node.js`
- `Express framework`

##### Middle Wares
- `body-parser`
- `morgan`

## API End Points
- `GET /api/v1/users`                             -   Fetches all users in the Database
- `GET /api/v1/parcels`                           -   Fetches all Available Orders in the Database
- `GET /api/v1/parcels/<parcelId>`                -   Fetches a particular order in the database
- `GET /api/v1/users/<usersId>/parcels/`      -   Fetches the orders of a particualar user in the database
- `POST /api/v1/parcels/`                         -   Saves an Order in the database
- `POST /api/v1/auth/signup`                      -   Signs up a user
- `POST /api/v1/auth/login`                       -   User can login
- `PUT /api/v1/parcels/<parcelId>/presentLocation`-   Updates the location of an order in the database
- `PUT /api/v1/parcels/<parcelId>/status`         -   Updates the status of an order in the database
- `PUT /api/v1/parcels/<parcelId>/destination`    -   Updates the destination of an order in the database
- `PUT /api/v1/parcels/<parcelId>/cancel     `    -   Cancels an order in the database
- `DELETE /api/v1/parcels/<parcelId >`            -   Deletes an order in the database

 
 ## Known issues
Everything works as expected; However:
- the front-end is not complete, i.e. no authentication, few client-side
   validation and no link for API calls yet.
- Data structures were used to save data instead of a database, hence data gets
   erased once the server is restarted

## Installation

- $ git clone `https://github.com/oyedejipeace/SendIT.git`
- $ cd SendIT
- $ npm i , to install dependencies
- $ npm start, to start the server
Once the server starts-up, you can query the api at `http://localhost:5000/api/v1` using the end points stated above.

## Contributing
>  Feel free to 🍴 fork this repository

>  👯 Clone this repository to your local machine using `https://github.com/oyedejipeace/SendIT.git`

> Make Contributions

> 🔃 Create a new pull request using `https://github.com/oyedejipeace/SendIT./compare`

## License
![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)

- **[MIT license](https://oyedejipeace.github.io/SendIT/UI/LICENSE.md)**
- Copyright 2018 © <a href="https://oyedejipeace.github.io/SendIT/UI" target="_blank">SendIT</a>

