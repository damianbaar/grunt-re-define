(function(parent, factory) {
    if (typeof define === 'function' && define.amd) {
        define('my-component', ['jquery', 'external2'], factory)
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'), require('external2'))
    } else {
        var jquery = parent.$
        var external2 = parent.myExtLib

        parent['my-component'] = factory(jquery, external2)
    }
}(this, function(jquery, external2) {
    //includes external1
    var _scope_ = {}
    var dotpath_inner = _scope_['dotpath/inner'] = 'inner';
    var deps_four = _scope_['deps/four'] = (function(r_0) {
        var inner = r_0;
        return 'Yeah that\'s me, I like better CommonJS style' + inner;
    })(dotpath_inner);
    var text_deps_template_html = _scope_['text!deps/template.html'] = '<li></li><li></li><li></li><li></li>';
    var dotpath_fi_ve = _scope_['dotpath/fi-ve'] = function(inner) {
        return inner;
    }(dotpath_inner);
    var three = _scope_['three'] = {
        hello: 'Yo!'
    };
    var two = _scope_['two'] = (function(r_0) {
        var $ = r_0;
        return 'two';
    })(jquery);
    var one = _scope_['one'] = function(five, three, two, template) {
        return function() {
            console.log(template);
        };
    }(dotpath_fi_ve, three, two, text_deps_template_html);
    var external1 = _scope_['external1'] = function(jquery) {
        return 'i\'m external';
    }(jquery);
    var text_template_html = _scope_['text!template.html'] = '<div>test</div><div></div><div></div><div></div>';
    var main = _scope_['main'] = (function(one, jquery, four, ext1, ext2, t1) {
        return [
            one,
            four,
            t1
        ];
    }(one, jquery, deps_four, external1, external2, text_template_html));;


    function local_require(name) {
        name = name.replace(/\.+\//g, '')
        return _scope_[name] || [jquery, external2][
            ['jquery', 'external2'].indexOf(name)
        ]
    }

    return deps_four
}))
