# Howden Project

### How to run with docker
```
./start-containers.sh
```




### Time Spent
I spent about a day with half the time creating backend for api and the other half to create the frontend to communicate with the backend.


### What I Used
The backend was using python using Flask for the simplicity to set up apis and using pandas to manipulate the data for the excel. Creating endpoints to get all data, get data for specific user logged in.


The frontend was using vite with react as it allows simple development for webpages and easy to use using axios to communicate with the backend.

React is best framework to use for it's simplicity to create pages and for useState and components.

The design is simple for now with simple styling and layout.

## What I would add

I would implement using tokens for login for now only using bcrypt to hash the passwords to allow better authentication. So the users session aren't stored on the server and to allow expiry dates.

Adding tests as well for the apis to check the correct data is returned.

Tests for jest to make sure the correct page is returned when logging or when clicking toggle.

I would implement a sort function as well to be sort by for example progress and filtering as well to see only failed or completed tasks.