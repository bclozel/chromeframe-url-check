# Google Chrome Frame URL check

### Google Chrome Frame support?

This little script checks if a website "supports" Google Chrome Frame.
In other words, "has this website done anything to trigger Google Chrome Frame?".

Currently, this script is looking for:

* HTML meta tags that look like `<meta http-equiv="X-UA-Compatible" content="chrome=1"/>` or `<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1"/>`
* Those HTML meta tags are within the first 1024 chars (otherwise it prints a warning message)
* HTTP response headers like `X-UA-Compatible: chrome=1`


### Usage

    node bin/chromeframe-url-check Parse websites for Chrome Frame support.
    Usage: node ./bin/chromeframe-url-check [url1 url2 ...]

    Options:
        -s, --silent  Sets the log output to the minimum  [default: false]
        -c, --config  Location of the configuration file

    Argument check failed: function (argv) {return argv._.length > 0;}

You have to give target urls to the script (i.e. websites to check for CF support).

### Example

    node bin/chromeframe-url-check http://quirksmode.org/frametest.html http://google.com http://www.chromium.org/

    Started spider - analyzing 3 websites
    http://quirksmode.org/frametest.html - Yes -  - HTML meta Support
    http://google.com - No -  - 
    http://www.chromium.org/ - Yes -  - HTML meta Support

### License

(The MIT License)

Copyright (c) 2012 Brian Clozel

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.