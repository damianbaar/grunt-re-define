require(
  [ "one"
  , "jquery"
  , "deps/four"
  , "external1"
  , "external2"
  , "text!./template.html"
  , "domReady!"
  , "d3"
  // , "d3/d3"
  ]
  , function(one, jquery, four, ext1, ext2, t1)
  {
    require(['a'], function() {

    })

    return [one, four, t1]
})
