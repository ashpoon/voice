Try it out: https://voice.now.sh

For privacy reasons, please contact Ash or David for the login credentials.

# Voice talent

Search for just the right voice talent for your project.

## How do you add more actors?

Just add more rows to your csv, eg [data/voice-actors.csv](https://github.com/ashpoon/voice/blob/master/data/voice-actors.csv). No code changes required, but a re-deploy may be required.

## How do you add more attributes? (eg "Nasal")

Just add more columns to [data/voice-actors.csv](https://github.com/ashpoon/voice/blob/master/data/voice-actors.csv).
Columns starting with `$` will be treated as a checkbox in the interface. (Those without will just be general data.)

## Development

```
npm install
npm run build
npm start
```

## Deployment

The app is mostly static but a minimal server was added for password protection. To re-deploy the app via `now`, best talk to David.

To use custom voice actors and samples, set the following environment variables: `VOICE_CSV` and `VOICE_SAMPLES`. Otherwise, the defaults in [data/voice-actors.csv](https://github.com/ashpoon/voice/blob/master/data/voice-actors.csv) will be used.
