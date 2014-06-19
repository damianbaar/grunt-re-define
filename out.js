(function(parent, factory) {
    if (typeof define === 'function' && define.amd) {
        define('my-component', ['jquery', 'external2'], factory)
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'), require('external2'))
    } else {
        var jquery = parent.$
        var external2 = parent.myExtLib

        parent['deps_four'] = factory(jquery, external2)
    }
}(this, function(jquery, external2) {
    var dotpath_inner = 'inner';
    var deps_four = (function(r_0) {
        var inner = r_0;
        return 'Yeah that\'s me, I like better CommonJS style' + inner;
    })(dotpath_inner);
    var txt_deps_template = '<li></li><li></li><li></li><li></li>';
    var dotpath_fi_ve = function(inner) {
        return inner;
    }(dotpath_inner);
    var three = {
        hello: 'Yo!'
    };
    var two = (function(r_0) {
        var $ = r_0;
        return 'two';
    })(jquery);
    var one = function(five, three, two, template) {
        return function() {
            console.log(template);
        };
    }(dotpath_fi_ve, three, two, txt_deps_template);
    var external1 = function(jquery) {
        return 'i\'m external';
    }(jquery);
    var txt_template = '<div>test</div><div></div><div></div><div></div>';
    (function(one, jquery, four, ext1, ext2, t1) {
        return [
            one,
            four,
            t1
        ];
    }(one, jquery, deps_four, external1, external2, txt_template));;


    return deps_four
}))
