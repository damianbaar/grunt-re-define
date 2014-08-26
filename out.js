(function(parent, factory) {
    if (typeof define === 'function' && define.amd) {
        define('ns/my-component', ['jquery', 'external2'], factory)
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'), require('external2'))
    } else {
        var jquery = parent.jquery
        var external2 = parent.external2

        parent.ns = parent.ns || {};
        parent.ns.my_component = factory(jquery, external2);

    }
}(this, function(jquery, external2) {
    var context = this;

    this['jquery'] = jquery;
    this['external2'] = external2;

    (function(context) {
        context['external1'] = (function(scope) {

            scope['external1'] = (function(exports) {

                var jquery = require('jquery');
                exports = 'i\'m external';

                return exports;
            })({});


            return require('external1')

            function require(name) {
                return scope[name] || context[name]
            }

        }.bind(context))({});
    })(this);

    (function(context) {
        context['main'] = (function(scope) {

            scope['dotpath/inner'] = (function(exports) {

                exports = 'inner';

                return exports;
            })({});


            scope['dotpath/fi-ve'] = (function(exports) {

                var inner = require('dotpath/inner');
                exports = inner;

                return exports;
            })({});


            scope['three'] = (function(exports) {

                exports = {
                    hello: 'Yo!'
                };

                return exports;
            })({});


            scope['two'] = (function(exports) {

                var $ = require('jquery');
                exports = 'two';

                return exports;
            })({});


            scope['deps/template.html'] = '<li></li><li></li><li></li><li></li>';

            scope['one'] = (function(exports) {

                var five = require('dotpath/fi-ve');
                var three = require('three');
                var two = require('two');
                var template = require('deps/template.html');
                exports = function() {
                    console.log(template);
                };

                return exports;
            })({});


            scope['deps/four'] = (function(exports) {

                var inner = require('dotpath/inner');
                exports = 'Yeah that\'s me, I like better CommonJS style' + inner;

                return exports;
            })({});


            scope['template.html'] = '<div>test</div><div></div><div></div><div></div>';

            scope['main'] = (function(exports) {

                var one = require('one');
                var jquery = require('jquery');
                var four = require('deps/four');
                var ext1 = require('external1');
                var ext2 = require('external2');
                var t1 = require('template.html');
                exports = [
                    one,
                    four,
                    t1
                ];

                return exports;
            })({});


            return require('main')

            function require(name) {
                return scope[name] || context[name]
            }

        }.bind(context))({});
    })(this);


    return this

    function require(name) {
        return context[name]
    }
}.bind({})))
