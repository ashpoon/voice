Try it out: https://ashpoon.github.io/voice/

# Voice talent

Search for just the right voice talent for your project.

## How do you add more actors?

Just add more rows to [data/voice-actors.csv](https://github.com/ashpoon/voice/blob/master/data/voice-actors.csv). No code changes required. It may take a few minutes for the change to be live.

## How do you add more attributes? (eg "Nasal")

Just add more columns to [data/voice-actors.csv](https://github.com/ashpoon/voice/blob/master/data/voice-actors.csv).
Columns starting with `$` will be treated as a checkbox in the interface. (Those without will just be general data.) No code changes required. It may take a few minutes for the change to be live.

## Development ###

The project doesn't (currently) include a server, but you'll need one to load the csv file.

The simplest way on a mac is to run `python -m SimpleHTTPServer 3000` and then open your browser to [localhost:3000](http://localhost:3000).
