define(
  [ "./dotpath/fi-ve"
  , "./three"
  , "./two"
  , "text!./deps/template.html"
  , "css!./styles.css"
  ]
  , function(five, three, two, template){

    return function () {
      console.log(template)
    }
})
