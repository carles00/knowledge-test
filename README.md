1. **Describe all the decisions that you took during development and the reasoning
behind them.**

First of all I used Vite to scaffold the project and create the development server. I choose it because I am familiar with it and it makes the project setup so much easier.

When it comes to using React Redux I kept it as simple as possible and I made sure to keep the project organized. I used an async Thunk to call the api to get the breeds and once I got all the breeds I thought the best way to get all the images for each bread was to make parallel calls to the api using Promise.All, this way it makes the fetching faster. As I need both the breed and the number of images at the same time I did the fetching for both things in the same thunk, this way it is easier to then combine them to make the state. A problem that I encountered while making the parallel calls was that, as they return at different times, the order of the breeds was scrambled so I had to order it. I decided to order by number of images as it makes the Pie chart look cleaner and more understandable

To show the results I used Rechart to render the Pie chart, as there is a lot of data to show I prefered to only show the top 10 breeds, but for the sake of completeness I decided to implement a simple toggle that filters the data between top 10 breeds and showing all the breeds.


2. **If you had more time, what other features would you add to your app and how
would you build them?**

Unfortunately i didn't have time to add Unit testing, to do it I would use Vitest, as it is a test runner made for Vite, and React testing library to make the tests.

Another think I would have liked to do was to make separete pages for each breed and show some information about it. To do this I would have used React-Router.

I also would have loved to make it a bit prettier with more CSS, but since te scope is small and I didn't implement the multiple pages I ended up not using much css.