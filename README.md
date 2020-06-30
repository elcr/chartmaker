# Chartmaker

A recreation of [Topsters 2](https://www.neverendingchartrendering.org/). Currently live [here](https://elcr.bitbucket.io/chartmaker/).

I use the original a lot and I've always been concerned by its fragile closed source nature. Chartmaker is my answer to that: an open source recreation that is entirely client-side, served from a single HTML file.

The site is being developed in according to my own usage, so it's lacking elements of the original which I don't use. Some of these will be reimplemented, some won't:

* No films option, only music
* Users must supply their own Last.fm API key (because it's entirely client-side)
* No optional album titles, they're always on
* No styling options (background, font, padding, etc)
* No compatibility with mobile devices (original doesn't really have this either)
* No compatibility with old browsers (this is an easy fix however)

It does however have some new features over the original:

* Screenshot scaling option
* Can rename albums (no need put up with what Last.fm returns)
* Chart title in the screenshot

## Building
```sh
git clone https://github.com/elcr/chartmaker.git
cd chartmaker
yarn install --dev  # dev flag is required because there are no runtime dependencies
yarn build
```

The `index.html` file will then be produced in the `dist/` folder. Some `.map` files will also be present, but they're only required for debugging. [A pre-built version is distributed with this repository](https://github.com/elcr/chartmaker/tree/master/dist).
