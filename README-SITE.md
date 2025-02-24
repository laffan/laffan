# SITE README 

### Installation

```
yarn install
```

### Deployment

Remember to uncomment the following lines in next.config.mjs when deploying for real.

```
  // assetPrefix: "./",
  // output: 'export',
  // trailingSlash: true,
```


### Adding Components

To be recognized by the MDX parser, all new components need to be registered in the [slug].js file of their parent. (ie. pages/projects/[slug].js).