## Inspiration

This project is inspired by Facebook's http://poncho.is/ chat application that fetches weather details for the specified location. I wanted to understand how Natural Language Processing (NLP) interprets user input and AI performs some action with it. Initally I started with https://github.com/NaturalNode/natural Natural to process user's input but handling different set of responses became harder. Then i tried a few AI services( wit.ai , api.ai , recast.ai ). Wit needed some server side configuration as they didn't support none-cors request. Api.ai required a premium plan, ended up using Recast.ai - Also it was the easiest to set up and get started with. They have some great blog resources too.   

## What it does
This app is divided into 4 environments :

* The Maverick environment is responsible to handle different weather requests.

* Star Wars is a role playing game similar to https://github.com/RecastAI/starwarsbot. I tweaked it to support more set of inputs.

* Cats and Dogs - meow and bark back respectively and they fetch random gifs from giphy.


## Learning
* Understanding of React states and top-down dataflow.
* Separation of logical and presentational components. 
* One state object passed to relevant child components. 
* Brief understanding NLP and AI concepts.

## What's next 
* Support more operations.
* Optimize responses - Dont fetch weather for the second time if we already have it.
* Support complex AI logic - something with A* algorithm.
* Better bot responses.


## <a href="http://maverick.amitkolambikar.com/" target="_blank">Demo</a>

