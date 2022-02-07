# Niwa

## Development

For local development please create a .env file using the dotenv file found in the root folder as a template

```
# this can be arbitrum-one, arbitrum-rinkeby, polygon-mainnet, or polygon-mumbai
VITE_L2_NETWORK=arbitrum-rinkeby
VITE_INFURA_PROJECT_ID=
VITE_INFURA_BASE_ENDPOINT=
VITE_IS_ROOT=
```

Setting `VITE_IS_ROOT` to `true` will prompt the network select page.
Otherwise, it will route to whatever `VITE_L2_NETWORK` you have setup with correct Infura details.
