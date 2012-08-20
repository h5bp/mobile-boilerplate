== HEAD

* Separate normalize.css from the rest of the CSS
* Moved from including jQuery to Zepto.js as default (#11)
* Updated HiDPI example media query.
* Various bug fixes to `MBP.fastButton` (#126, #116)
* Added `MBP.startupImage` helper for apple web app startup images
* Added `MBP.preventScrolling` helper to prevent default scrolling on document window
* Update to Modernizr 2.6.1
* Add bundled docs (#125)
* Add CHANGELOG.md (#129)
* Add MIT License
* Code format and consistency changes.

== 3.0.0

* Removed `initial-scale=1.0` from meta
* Excluded `scalefix` by default
* Updated startup tablet landscape dimensions
* Added lang attr to be consistent with h5bp
* Removed meta author to be consistent with h5bp
* Added `MBP.enableActive`
* Fixes `MBP.hideUrlBar()` when addEventListener is undefined
* Added preventing iOS from zooming onfocus
* Worked around a tricky bug in Android 2.3 to `MBP.fastButton`
* Removed respond.js
* Split `hideUrlBar` into an intial function, and a general use function cached the scrollTop so that only needs to be detected once
* Moved helper.js one level up
* Upated jQuery to 1.7.1 and added missing fallback local file
* Updated modernizr to the latest version
* added iPod (Touch) to `MBP.scaleFix`
* Removed `input::-moz-focus-inner` as it is not required on Firefox on Mobile
* Removed the ellipsis helper class to be consistent with h5bp
* Removed the build script to its own repo
* Updated 404 page to be consistent with h5bp
* Removed `/demo` and `/test`
* Removed analytics and wspl