var cheerio = require('cheerio');
var request = require('request');
var async = require('async');

//
// Expose version information through `pkginfo`.
//
require('pkginfo')(module, 'version');

  /* ## createSpider()
   * Create a spider (crawling websites for CF support) with given configuration.
   *
   * - _config_: configuration object with keys:
   *   - useragent: the user-agent string to be sent along HTTP requests 
   * 
   * returns a spider instance. 
   */ 
exports.createSpider = function (config) {    

  // default configuration
  var defaultConfig = {
    useragent : { writable:true, configurable:true, value: "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; chromeframe/11.0.660.0)" },

  }

  // merge given config with default config
  config = Object.create(Object.prototype, defaultConfig);

  /* ## processUrl()
   * Process the given url for CF support.
   *
   * - _url_: url of the website to check for CF support 
   * - _callback_: A callback function that will receive as first argument an error 
   * and as second argument an object that contains the CF support result. 
   */ 
  var processUrl = function(url, callback) {

    // prepare request with configured user-agent HTTP header
    req = {
      url: url,
      headers: {"User-Agent":config.useragent}
    }

    var result = {url: url, cf:false};

    // send a request
    request(req, function(error, response, body) {
     
      if(error) {
        callback(error, []);
      }

      // load body with jquery-like API
      var $ = cheerio.load(body);

      // check for HTML meta tag that looks like
      // <meta http-equiv="X-UA-Compatible" content="chrome=1"/>
      // or
      // <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1"/>
      $('meta[http-equiv="X-UA-Compatible"]').each(function() {
          
          result.xuacompatible = $(this).attr("content");

        if($(this).attr("content") && $(this).attr("content").indexOf("chrome") > -1) {
          result.cf = true;
          result.htmlsupport = true;

          if(body.indexOf($(this).attr("content")) > 1024) {
            result.warn = "<meta> tag should be within the first 1024 chars."
          }

        }
      });

      // check for an HTTP header in the response:
      // X-UA-Compatible: chrome=1
      if(response.headers["X-UA-Compatible"]
        && response.headers["X-UA-Compatible"].indexOf("chrome") > -1) {
        result.cf = true;
        result.httpsupport = true;
      }

      // check for a JavaScript named "CFInstall"
      // this script usuall usually prompts for CF install
      $('script').each(function() {
        if($(this).attr("src") && $(this).attr("src").indexOf("CFInstall") > -1) {
          result.cfinstall = true;
        }
      });

      callback(error, result);
    });
    
  };

  
  return {
    /* ## process()
     * Process the given urls for CF support.
     *
     * - _urls_: array of urls to be checked for CF support 
     * - _callback_: A callback function that will receive 
     * the compiled results of CF support for all urls. 
     */ 
    process: function (urls, callback) {

      // use async "map" function to map given urls to CF support results
      async.map(urls, processUrl, function(err, results){

          if(err) { throw err;}
          callback(results);
      });
    }
  };

};
