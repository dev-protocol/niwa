# Niwa

## Development

For local development please create a .env file using the dotenv file found in the root folder as a template

```
# this can be arbitrum-one, arbitrum-rinkeby, polygon-mainnet, or polygon-mumbai
VITE_L2_NETWORK=arbitrum-rinkeby
VITE_INFURA_PROJECT_ID=
VITE_INFURA_BASE_ENDPOINT=
VITE_IS_ROOT= # boolean
```

Setting `VITE_IS_ROOT` to `true` will prompt the network select page.
Otherwise, it will route to whatever `VITE_L2_NETWORK` you have setup with correct Infura details.

### use OAuth YouTube Account

The following environment variables need to be set:

```
VITE_YOUTUBE_CLIENT_ID=XXX.apps.googleusercontent.com
VITE_YOUTUBE_AUTH_REDIRECT_URI=https://HOST:PORT/auth/youtube/callback
```

See also:
https://developers.google.com/youtube/v3/getting-started

### use OAuth Discord Account

The following environment variables need to be set:

```
VITE_DISCORD_CLIENT_ID=YOUR_CLIENT_ID
VITE_DISCORD_CLIENT_SECRET=YOUR_CLIENT_SECRET
VITE_DISCORD_AUTH_REDIRECT_URI=http://HOST:PORT/auth/discord/callback
```

See also:
https://discord.com/developers/docs/topics/oauth2
