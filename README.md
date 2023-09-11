# About The Project
WellyBelly Health is a web application built with Next and Express used to track health and wellness metrics.
- Direct integration via REST to the USDA Food Database (FoodData Central)
- Installation of a third-party database is not required. Data is stored in a local object on the Express server.
- Simple interface design: column sorting, intuitive buttons, and paging.

For more information on how to build the Express backend, check out my blog post: [Everywhen Software Blog](https://www.everywhensoftware.com/blog/2023-09-01-Simple-Express/)

Live demo can be found here: [WellyBelly Health Demo](https://welly-belly-ui.onrender.com).

> [!IMPORTANT]
> If the `food` page does not load right away, then the Express server may have gone idle. Click on this link and wait until you get a return message (something like `{"message":"Simple Express Server"}`): [Express Server](https://welly-belly-server.onrender.com/). Then try the demo again.

# Getting Started

## Prerequisites
This project requires Node.js version >= 16.


## Installation
Install dependencies under each subfolder (`server` and `ui`) using the npm command: ```npm install```.


## Running The App
First, start the server by navigating to the `server` subfolder and running: ```npm run dev```.
Then, run the ui by navigating to the `ui` folder and running: ```npm run dev```.


# Usage
On startup, the landing page will be displayed. Click the `Sign In` button to enter the website.

<p align="center">
<img width="700" alt="landing page" src="https://github.com/nalithephavong/manage_orders_sample_app/assets/54182038/899dd8e8-a109-4ef4-abf5-cd954119c4ce">
</p>

From the Food Page, users will have an overview of today's food entries. Food items can be added, deleted, and updated using the toolbar buttons.

<p align="center">
<img width="800" alt="orders" src="https://github.com/nalithephavong/manage_orders_sample_app/assets/54182038/05b800ed-e1fd-4e4a-8677-4e1a075c40a9">
</p>

When adding an item, use the search functionality to directly connect to the USDA Food Database to retrieve items:



The End: 
<p align="center">
<img width="800" alt="meme" src="https://user-images.githubusercontent.com/54182038/161456308-6cecb063-9626-411f-b733-2b99bb17c6d1.gif">
</p>


# Roadmap
- [ ] Add DB
- [ ] Secure endpoints
- [ ] Add user management capabilities (sign-in, sign-out, profile)
- [ ] Add additional pages (Fitness, Measurements)
