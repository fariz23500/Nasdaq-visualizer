
the website is hosted on Heroku link: https://stock-app-fariz.herokuapp.com/ .

Instructions to use this website:

Enter symbol, start date and end date.
an OHCL graph would be rendered for the respective dates . You can scroll down on the graph to zoom out or scroll up to zoom in.
A description is provided at the bottom for the company(which is not working currently as i exhausted the free use time for this month of the api mentioned in pdf while testing the app).


Front end design:

the front end of this app is built using Reactjs. I pass the data(symbol,start date and end date) to my backend and recieve an array of objects of relevant data. This data is then used 
create the OHCL chart. The OHCL chart is created with the help of proptype,d3-scale,d3-time and react-stockcharts modules.

Backend:

the backend is also hosted on heroku : https://stocks-fariz.herokuapp.com/
it contains a post request where it recieves symbol,start and end dates. It then searches in the JSON file(which is stored locally) for the relevant data and then sends the data.
I use the backend as an api to obtain relevant data for my frontend design.

Important information:

As both my frontend and backend are hosted on free version of heroku, so there could be a delay while using this app for the first time(as free version of heroku sleeps after
30 mins of inactivity) . After the first time, it should run normally.
