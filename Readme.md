# serveur

  Simple 5 minute command-line file / directory server built with connect, inspired by nodejitsu's [http-server](https://github.com/nodejitsu/http-server) to show off the simplicity and flexibility of connect as a modular server.

## Installation

    $ npm install -g serveur

## Usage

```

Usage: serveur [options] [dir]

Options:

  -v, --version        output the version number
  -F, --format <fmt>   specify the log format string
  -p, --port <port>    specify the port [3000]
  -f, --favicon <path> serveur the given favicon
  -H, --hidden         enable hidden file serving
  -c, --no-coffee      disable coffee rendering
  -J, --no-jade        disable jade rendering
  -S, --no-stylus      disable stylus rendering
      --no-less        disable less css rendering
  -o, --open           open with your browser
  -I, --no-icons       disable icons
  -L, --no-logs        disable request logging
  -D, --no-dirs        disable directory serving
  -C, --cors           allows cross origin access serving
      --compress       gzip or deflate the response
  -R, --livereload     refresh your CSS (or page) with each save
      --exec <cmd>     execute command on each request
  -h, --help           output usage information


```

## Examples

 HTTP Accept support built into `connect.directory()`:
 
     $ curl http://local:3000/ -H "Accept: text/plain"
     bin
     History.md
     node_modules
     package.json
     Readme.md

  Requesting a file:

    $ curl http://local:3000/Readme.md

     # serveur
     ...

  Requesting JSON for the directory listing:

    $ curl http://local:3000/ -H "Accept: application/json"
    ["bin","History.md","node_modules","package.json","Readme.md"]

 Directory listing served by connect's `connect.directory()` middleware.

  ![directory listings](http://f.cl.ly/items/100M2C3o0p2u3A0q1o3H/Screenshot.png)

## License 

MIT

Copyright (c) 2011 TJ Holowaychuk &lt;tj@vision-media.ca&gt;

## History

### 1.0.0 / 2013-23-09

 * Fork from [serve](https://github.com/visionmedia/serve)
 * Add Open, Coffee-script and livereload support
