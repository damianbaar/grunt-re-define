require(
  [ "one"
  , "jquery"
  , "deps/four"
  , "external1"
  , "external2"
  , "text!./template.html"
  , "domReady!"
  ]
  , function(one, jquery, four, ext1, ext2, t1)
  {
    return [one, four, t1]
})
