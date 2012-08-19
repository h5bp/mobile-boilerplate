[Mobile Boilerplate homepage](http://mobileboilerplate.com/) | [Documentation
table of contents](README.md)

# Extend and customise Mobile Boilerplate

Here is some useful advice for how you can make your project with Mobile Boilerplate even better. We don't want to include it all by default, as not everything fits with everyone's needs.

## DNS prefetching

In short, DNS Prefetching is a method of informing the browser of domain names
referenced on a site so that the client can resolve the DNS for those hosts,
cache them, and when it comes time to use them, have a faster turn around on
the request.

### Implicit prefetches

There is a lot of prefetching done for you automatically by the browser. When
the browser encounters an anchor in your html that does not share the same
domain name as the current location the browser requests, from the client OS,
the IP address for this new domain. The client first checks its cache and
then, lacking a cached copy, makes a request from a DNS server. These requests
happen in the background and are not meant to block the rendering of the
page.

The goal of this is that when the foreign IP address is finally needed it will
already be in the client cache and will not block the loading of the foreign
content. Less requests result in faster page load times. The perception of this
is increased on a mobile platform where DNS latency can be greater.

#### Disable implicit prefetching

```html
<meta http-equiv="x-dns-prefetch-control" content="off">
```

Even with X-DNS-Prefetch-Control meta tag (or http header) browsers will still
prefetch any explicit dns-prefetch links.

**_WARNING:_** THIS MAY MAKE YOUR SITE SLOWER IF YOU RELY ON RESOURCES FROM
FOREIGN DOMAINS.

### Explicit prefetches

Typically the browser only scans the HTML for foreign domains. If you have
resources that are outside of your HTML (a javascript request to a remote
server or a CDN that hosts content that may not be present on every page of
your site, for example) then you can queue up a domain name to be prefetched.

```html
<link rel="dns-prefetch" href="//example.com">
<link rel="dns-prefetch" href="//ajax.googleapis.com">
```

You can use as many of these as you need, but it's best if they are all
immediately after the [Meta
Charset](https://developer.mozilla.org/en/HTML/Element/meta#attr-charset)
element (which should go right at the top of the `head`), so the browser can
act on them ASAP.

#### Common Prefetch Links

Amazon S3:

```html
<link rel="dns-prefetch" href="//s3.amazonaws.com">
```

Google APIs:

```html
<link rel="dns-prefetch" href="//ajax.googleapis.com">
```

Microsoft Ajax Content Delivery Network:

```html
<link rel="dns-prefetch" href="//ajax.microsoft.com">
<link rel="dns-prefetch" href="//ajax.aspnetcdn.com">
```

### Browser support for DNS prefetching

Chrome, Firefox 3.5+, Safari 5+, Opera (Unknown), IE 9 (called "Pre-resolution"
on blogs.msdn.com)

### Further reading about DNS prefetching

* https://developer.mozilla.org/En/Controlling_DNS_prefetching
* http://dev.chromium.org/developers/design-documents/dns-prefetching
* http://www.apple.com/safari/whats-new.html
* http://blogs.msdn.com/b/ie/archive/2011/03/17/internet-explorer-9-network-performance-improvements.aspx
* http://dayofjs.com/videos/22158462/web-browsers_alex-russel


## Search

### Direct search spiders to your sitemap

[Learn how to make a sitemap](http://www.sitemaps.org/protocol.php)

```html
<link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml">
```

### Hide pages from search engines

According to Heather Champ, former community manager at Flickr, you should not
allow search engines to index your "Contact Us" or "Complaints" page if you
value your sanity. This is an HTML-centric way of achieving that.

```html
<meta name="robots" content="noindex">
```

**_WARNING:_** DO NOT INCLUDE ON PAGES THAT SHOULD APPEAR IN SEARCH ENGINES.

## Social Networks

### Facebook Open Graph data

You can control the information that Facebook and others display when users
share your site. Below are just the most basic data points you might need. For
specific content types (including "website"), see [Facebook's built-in Open
Graph content
templates](https://developers.facebook.com/docs/opengraph/objects/builtin/).
Take full advantage of Facebook's support for complex data and activity by
following the [Open Graph
tutorial](https://developers.facebook.com/docs/opengraph/tutorial/).

```html
<meta property="og:title" content="">
<meta property="og:description" content="">
<meta property="og:image" content="">
```

### Twitter Cards

Twitter provides a snippet specification that serves a similar purpose to Open
Graph. In fact, Twitter will use Open Graph when Cards is not available. Note
that, as of this writing, Twitter requires that app developers activate Cards
on a per-domain basis. You can read more about the various snippet formats
and application process in the [official Twitter Cards
documentation](https://dev.twitter.com/docs/cards).

```html
<meta name="twitter:card" content="summary">
<meta name="twitter:site" content="@site_account">
<meta name="twitter:creator" content="@individual_account">
<meta name="twitter:url" content="http://www.example.com/path/to/page.html">
<meta name="twitter:title" content="">
<meta name="twitter:description" content="">
<meta name="twitter:image" content="http://www.example.com/path/to/image.jpg">

```

## URLs

### Canonical URL

Signal to search engines and others "Use this URL for this page!" Useful when
parameters after a `#` or `?` is used to control the display state of a page.
`http://www.example.com/cart.html?shopping-cart-open=true` can be indexed as
the cleaner, more accurate `http://www.example.com/cart.html`.

```html
<link rel="canonical" href="">
```

### Official shortlink

Signal to the world "This is the shortened URL to use this page!" Poorly
supported at this time. Learn more by reading the [article about shortlinks on
the Microformats wiki](http://microformats.org/wiki/rel-shortlink).

```html
<link rel="shortlink" href="h5bp.com">
```

## App Stores

### Install a Chrome Web Store app

Users can install a Chrome app directly from your website, as long as the app
and site have been associated via Google's Webmaster Tools. Read more on
[Chrome Web Store's Inline Installation
docs](https://developers.google.com/chrome/web-store/docs/inline_installation).

```html
<link rel="chrome-webstore-item" href="https://chrome.google.com/webstore/detail/APP_ID">
```

### Smart App Banners in iOS 6 Safari

Stop bothering everyone with gross modals advertising your entry in the App Store.
This bit of code will unintrusively allow the user the option to download your iOS
app, or open it with some data about the user's current state on the website.

```html
<meta name="apple-itunes-app" content="app-id=APP_ID,app-argument=SOME_TEXT">
```

## Google Analytics augments

### More tracking settings

The [optimized Google Analytics
snippet](http://mathiasbynens.be/notes/async-analytics-snippet) included with
HTML5 Boilerplate includes something like this:

```js
var _gaq = [['_setAccount', 'UA-XXXXX-X'], ['_trackPageview']];
```

In case you need more settings, just extend the array literal instead of
[`.push()`ing to the
array](http://mathiasbynens.be/notes/async-analytics-snippet#dont-push-it)
afterwards:

```js
var _gaq = [['_setAccount', 'UA-XXXXX-X'], ['_trackPageview'], ['_setAllowAnchor', true]];
```

### Anonymize IP addresses

In some countries, no personal data may be transferred outside jurisdictions
that do not have similarly strict laws (i.e. from Germany to outside the EU).
Thus a webmaster using the Google Analytics script may have to ensure that no
personal (trackable) data is transferred to the US. You can do that with [the
`_gat.anonymizeIp`
option](http://code.google.com/apis/analytics/docs/gaJS/gaJSApi_gat.html#_gat._anonymizeIp).
In use it looks like this:

```js
var _gaq = [['_setAccount', 'UA-XXXXX-X'], ['_gat._anonymizeIp'], ['_trackPageview']];
```

### Track jQuery AJAX requests in Google Analytics

An article by @JangoSteve explains how to [track jQuery AJAX requests in Google
Analytics](http://www.alfajango.com/blog/track-jquery-ajax-requests-in-google-analytics/).

Add this to `plugins.js`:

```js
/*
 * Log all jQuery AJAX requests to Google Analytics
 * See: http://www.alfajango.com/blog/track-jquery-ajax-requests-in-google-analytics/
 */
if (typeof _gaq !== "undefined" && _gaq !== null) {
    $(document).ajaxSend(function(event, xhr, settings){
        _gaq.push(['_trackPageview', settings.url]);
    });
}
```

### Track JavaScript errors in Google Analytics

Add this function after `_gaq` is defined:

```js
(function(window){
    var undefined,
        link = function (href) {
            var a = window.document.createElement('a');
            a.href = href;
            return a;
        };
    window.onerror = function (message, file, row) {
        var host = link(file).hostname;
        _gaq.push([
            '_trackEvent',
            (host == window.location.hostname || host == undefined || host == '' ? '' : 'external ') + 'error',
            message, file + ' LINE: ' + row, undefined, undefined, true
        ]);
    };
}(window));
```

### Track page scroll

Add this function after `_gaq` is defined:

```js
$(function(){
    var isDuplicateScrollEvent,
        scrollTimeStart = new Date,
        $window = $(window),
        $document = $(document),
        scrollPercent;

    $window.scroll(function() {
        scrollPercent = Math.round(100 * ($window.height() + $window.scrollTop())/$document.height());
        if (scrollPercent > 90 && !isDuplicateScrollEvent) { //page scrolled to 90%
            isDuplicateScrollEvent = 1;
            _gaq.push(['_trackEvent', 'scroll',
                'Window: ' + $window.height() + 'px; Document: ' + $document.height() + 'px; Time: ' + Math.round((new Date - scrollTimeStart )/1000,1) + 's',
                undefined, undefined, true
            ]);
        }
    });
});
```


## Miscellaneous

* Use [HTML5
  polyfills](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-browser-Polyfills).

* If you're building a web app you may want [native style momentum scrolling in
  iOS5](http://johanbrook.com/browsers/native-momentum-scrolling-ios-5/) using
  `-webkit-overflow-scrolling: touch`.

* Avoid development/stage websites "leaking" into SERPs (search engine results
  page) by [implementing X-Robots-tag
  headers](https://github.com/h5bp/html5-boilerplate/issues/804).

* Screen readers currently have less-than-stellar support for HTML5 but the JS
  script [accessifyhtml5.js](https://github.com/yatil/accessifyhtml5.js) can
  help increase accessibility by adding ARIA roles to HTML5 elements.


*Many thanks to [Brian Blakely](https://github.com/brianblakely) for
contributing much of this information.*
