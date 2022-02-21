# Lil' Fluxy

I was board in quarantine, so I made a little javascript game

You basically just use the space bar to help Karate Colin jump over project obstacles…

## Local Installation
- clone the repo
    - `git clone git@github.com:fluxbucket/lil-fluxy.git`
- clone the gh-pages branch into a "dist" folder in the root
    - `mkdir dist && cd dist && git clone --branch gh-pages git@github.com:fluxbucket/lil-fluxy.git .`
- use `npm run dev` to serve on localhost:3000 (using vite)
- use `npm run deploy` to build the assets and push them to gh-pages
- prod site is currently at <a href="https://lil-fluxy.fluxbucket.com">a subdomain on fluxbucket.com</a>

## Notes
- This is using kaboom.js
- I don't know why the font wouldn't load from a local asset on gh-pages, so I'm calling it from the raw github repo URL in main.js#loadFont()
