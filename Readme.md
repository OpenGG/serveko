# serveko

  Simple 5 minute command-line file / directory server built with connect, inspired by nodejitsu's [http-server](https://github.com/nodejitsu/http-server) to show off the simplicity and flexibility of connect as a modular server.

  Powered by [koa](https://github.com/koajs/koa).

## Installation

    $ npm install -g serveko

## Usage

```

  Usage: index [options] [dir]

  Options:

    -h, --help                output usage information
    -V, --version             output the version number
    -a, --auth <user>:<pass>  specify basic auth credentials
    -F, --format <fmt>        specify the log format string
    -p, --port <port>         specify the port [3000]
    -H, --hidden              enable hidden file serving
    -b, --no-babel            disable babel rendering
    -J, --no-pug              disable pug rendering
    -S, --no-stylus           disable stylus rendering
    -o, --open                open with your browser
    -I, --no-icons            disable icons
    -L, --no-logs             disable request logging
    -D, --no-dirs             disable directory serving
    -f, --favicon <path>      serve the given favicon
        --compress            gzip or deflate the response
    -R, --livereload          refresh your CSS (or page) with each save
        --exec <cmd>          execute command on each request

```

## License 

MIT

Copyright © 2016 OpenGG.

Inspired by [tj/serve](https://github.com/tj/serve)