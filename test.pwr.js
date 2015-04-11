(function () {
    'use strict';
    var assert, deepcopy;
    if (typeof exports === 'object') {
        assert = require('power-assert');
        deepcopy = require('../deepcopy');
    } else {
        assert = this.assert;
        deepcopy = this.deepcopy;
    }
    describe('deepcopy()', function () {
        describe('check for some types', function () {
            it('should return primitive types', function () {
                assert(assert._expr(assert._capt(assert._capt(deepcopy(1), 'arguments/0/left') === 1, 'arguments/0'), {
                    content: 'assert(deepcopy(1) === 1)',
                    filepath: 'test.js',
                    line: 20
                }));
                assert(assert._expr(assert._capt(assert._capt(deepcopy('A'), 'arguments/0/left') === 'A', 'arguments/0'), {
                    content: 'assert(deepcopy(\'A\') === \'A\')',
                    filepath: 'test.js',
                    line: 21
                }));
                assert(assert._expr(assert._capt(assert._capt(deepcopy(true), 'arguments/0/left') === true, 'arguments/0'), {
                    content: 'assert(deepcopy(true) === true)',
                    filepath: 'test.js',
                    line: 22
                }));
                assert(assert._expr(assert._capt(assert._capt(deepcopy(null), 'arguments/0/left') === null, 'arguments/0'), {
                    content: 'assert(deepcopy(null) === null)',
                    filepath: 'test.js',
                    line: 23
                }));
                assert(assert._expr(assert._capt(assert._capt(deepcopy(assert._capt(undefined, 'arguments/0/left/arguments/0')), 'arguments/0/left') === assert._capt(undefined, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert(deepcopy(undefined) === undefined)',
                    filepath: 'test.js',
                    line: 24
                }));
                assert(assert._expr(assert._capt(assert._capt(deepcopy(assert._capt(Infinity, 'arguments/0/left/arguments/0')), 'arguments/0/left') === assert._capt(Infinity, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert(deepcopy(Infinity) === Infinity)',
                    filepath: 'test.js',
                    line: 25
                }));
                assert(assert._expr(assert._capt(assert._capt(deepcopy(assert._capt(-assert._capt(Infinity, 'arguments/0/left/arguments/0/argument'), 'arguments/0/left/arguments/0')), 'arguments/0/left') === assert._capt(-assert._capt(Infinity, 'arguments/0/right/argument'), 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert(deepcopy(-Infinity) === -Infinity)',
                    filepath: 'test.js',
                    line: 26
                }));
                assert(assert._expr(assert._capt(isNaN(assert._capt(deepcopy(assert._capt(NaN, 'arguments/0/arguments/0/arguments/0')), 'arguments/0/arguments/0')), 'arguments/0'), {
                    content: 'assert(isNaN(deepcopy(NaN)))',
                    filepath: 'test.js',
                    line: 27
                }));
            });
            it('should return Function', function () {
                function fn() {
                }
                assert(assert._expr(assert._capt(assert._capt(deepcopy(assert._capt(fn, 'arguments/0/left/arguments/0')), 'arguments/0/left') === assert._capt(fn, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert(deepcopy(fn) === fn)',
                    filepath: 'test.js',
                    line: 33
                }));
            });
            it('should return Date', function () {
                var date = new Date();
                assert(assert._expr(assert._capt(assert._capt(+assert._capt(deepcopy(assert._capt(date, 'arguments/0/left/argument/arguments/0')), 'arguments/0/left/argument'), 'arguments/0/left') === assert._capt(+assert._capt(date, 'arguments/0/right/argument'), 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert(+deepcopy(date) === +date)',
                    filepath: 'test.js',
                    line: 39
                }));
            });
            it('should return RegExp', function () {
                var regexp = new RegExp();
                assert(assert._expr(assert._capt(assert._capt(String(assert._capt(deepcopy(assert._capt(regexp, 'arguments/0/left/arguments/0/arguments/0')), 'arguments/0/left/arguments/0')), 'arguments/0/left') === assert._capt(String(assert._capt(regexp, 'arguments/0/right/arguments/0')), 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert(String(deepcopy(regexp)) === String(regexp))',
                    filepath: 'test.js',
                    line: 45
                }));
            });
            it('should return Array', function () {
                var array = [];
                assert.deepEqual(assert._expr(assert._capt(deepcopy(assert._capt(array, 'arguments/0/arguments/0')), 'arguments/0'), {
                    content: 'assert.deepEqual(deepcopy(array), array)',
                    filepath: 'test.js',
                    line: 51
                }), assert._expr(assert._capt(array, 'arguments/1'), {
                    content: 'assert.deepEqual(deepcopy(array), array)',
                    filepath: 'test.js',
                    line: 51
                }));
            });
            it('should return Object', function () {
                var object = {};
                assert.deepEqual(assert._expr(assert._capt(deepcopy(assert._capt(object, 'arguments/0/arguments/0')), 'arguments/0'), {
                    content: 'assert.deepEqual(deepcopy(object), object)',
                    filepath: 'test.js',
                    line: 57
                }), assert._expr(assert._capt(object, 'arguments/1'), {
                    content: 'assert.deepEqual(deepcopy(object), object)',
                    filepath: 'test.js',
                    line: 57
                }));
            });
            it('should return Buffer', typeof Buffer === 'function' ? function () {
                var buffer = new Buffer(0);
                assert.deepEqual(assert._expr(assert._capt(deepcopy(assert._capt(buffer, 'arguments/0/arguments/0')), 'arguments/0'), {
                    content: 'assert.deepEqual(deepcopy(buffer), buffer)',
                    filepath: 'test.js',
                    line: 63
                }), assert._expr(assert._capt(buffer, 'arguments/1'), {
                    content: 'assert.deepEqual(deepcopy(buffer), buffer)',
                    filepath: 'test.js',
                    line: 63
                }));
            } : undefined);
            it('should return Symbol', typeof Symbol === 'function' ? function () {
                var symbol = Symbol();
                assert(assert._expr(assert._capt(assert._capt(deepcopy(assert._capt(symbol, 'arguments/0/left/arguments/0')), 'arguments/0/left') === assert._capt(symbol, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert(deepcopy(symbol) === symbol)',
                    filepath: 'test.js',
                    line: 69
                }));
            } : undefined);
        });
        describe('check for recursive copy', function () {
            it('should return recursive copy for array', function () {
                var array = [
                    [
                        [1],
                        [2],
                        [3]
                    ],
                    [
                        [4],
                        [5],
                        [6]
                    ],
                    [
                        [7],
                        [8],
                        [9]
                    ]
                ];
                assert.deepEqual(assert._expr(assert._capt(deepcopy(assert._capt(array, 'arguments/0/arguments/0')), 'arguments/0'), {
                    content: 'assert.deepEqual(deepcopy(array), array)',
                    filepath: 'test.js',
                    line: 83
                }), assert._expr(assert._capt(array, 'arguments/1'), {
                    content: 'assert.deepEqual(deepcopy(array), array)',
                    filepath: 'test.js',
                    line: 83
                }));
            });
            it('should return recursive copy for object', function () {
                var object = {
                    a: {
                        a: { a: true },
                        b: { b: false },
                        c: { c: null }
                    },
                    b: {
                        a: { a: true },
                        b: { b: false },
                        c: { c: null }
                    },
                    c: {
                        a: { a: true },
                        b: { b: false },
                        c: { c: null }
                    }
                };
                assert.deepEqual(assert._expr(assert._capt(deepcopy(assert._capt(object, 'arguments/0/arguments/0')), 'arguments/0'), {
                    content: 'assert.deepEqual(deepcopy(object), object)',
                    filepath: 'test.js',
                    line: 93
                }), assert._expr(assert._capt(object, 'arguments/1'), {
                    content: 'assert.deepEqual(deepcopy(object), object)',
                    filepath: 'test.js',
                    line: 93
                }));
            });
            it('should return object, it has circular reference', function () {
                var object, copy;
                assert.doesNotThrow(function () {
                    object = {};
                    object.to = object;
                    copy = deepcopy(object);
                });
                assert(assert._expr(assert._capt(assert._capt(copy, 'arguments/0/left') === assert._capt(assert._capt(copy, 'arguments/0/right/object').to, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert(copy === copy.to)',
                    filepath: 'test.js',
                    line: 105
                }));
            });
            it('should return object, it has symbol', typeof Symbol === 'function' ? function () {
                var object = {}, a = Symbol.for('a'), b = Symbol.for('b'), c = Symbol.for('c');
                object[a] = 1;
                object[b] = 2;
                object[c] = 3;
                assert.deepEqual(assert._expr(assert._capt(deepcopy(assert._capt(object, 'arguments/0/arguments/0')), 'arguments/0'), {
                    content: 'assert.deepEqual(deepcopy(object), object)',
                    filepath: 'test.js',
                    line: 119
                }), assert._expr(assert._capt(object, 'arguments/1'), {
                    content: 'assert.deepEqual(deepcopy(object), object)',
                    filepath: 'test.js',
                    line: 119
                }));
            } : undefined);
        });
        describe('check for duplicate function', function () {
            it('should return array, it has duplicate function', function () {
                var array = [
                        fn,
                        fn
                    ], copy = deepcopy(array);
                function fn() {
                }
                assert(assert._expr(assert._capt(assert._capt(assert._capt(copy, 'arguments/0/left/object')[0], 'arguments/0/left') === assert._capt(assert._capt(copy, 'arguments/0/right/object')[1], 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert(copy[0] === copy[1])',
                    filepath: 'test.js',
                    line: 133
                }));
            });
            it('should return object, it has duplicate function', function () {
                var object = {
                        a: fn,
                        b: fn
                    }, copy = deepcopy(object);
                function fn() {
                }
                assert(assert._expr(assert._capt(assert._capt(assert._capt(copy, 'arguments/0/left/object').a, 'arguments/0/left') === assert._capt(assert._capt(copy, 'arguments/0/right/object').b, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert(copy.a === copy.b)',
                    filepath: 'test.js',
                    line: 142
                }));
            });
            it('should return object, it has symbol', typeof Symbol === 'function' ? function () {
                var object = {}, a = Symbol.for('a'), b = Symbol.for('b'), copy;
                function fn() {
                }
                object[a] = fn;
                object[b] = fn;
                copy = deepcopy(object);
                assert(assert._expr(assert._capt(assert._capt(assert._capt(copy, 'arguments/0/left/object')[assert._capt(a, 'arguments/0/left/property')], 'arguments/0/left') === assert._capt(assert._capt(copy, 'arguments/0/right/object')[assert._capt(b, 'arguments/0/right/property')], 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert(copy[a] === copy[b])',
                    filepath: 'test.js',
                    line: 159
                }));
            } : undefined);
        });
    });
}.call(this));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QuanMiXSwibmFtZXMiOlsiYXNzZXJ0IiwiZGVlcGNvcHkiLCJleHBvcnRzIiwicmVxdWlyZSIsImRlc2NyaWJlIiwiaXQiLCJfZXhwciIsIl9jYXB0IiwiY29udGVudCIsImZpbGVwYXRoIiwibGluZSIsInVuZGVmaW5lZCIsIkluZmluaXR5IiwiaXNOYU4iLCJOYU4iLCJmbiIsImRhdGUiLCJEYXRlIiwicmVnZXhwIiwiUmVnRXhwIiwiU3RyaW5nIiwiYXJyYXkiLCJkZWVwRXF1YWwiLCJvYmplY3QiLCJCdWZmZXIiLCJidWZmZXIiLCJTeW1ib2wiLCJzeW1ib2wiLCJhIiwiYiIsImMiLCJjb3B5IiwiZG9lc05vdFRocm93IiwidG8iLCJmb3IiLCJjYWxsIl0sIm1hcHBpbmdzIjoiQUFBQSxDQUFDLFlBQVc7QUFBQSxJQUVWLGFBRlU7QUFBQSxJQUlWLElBQUlBLE1BQUosRUFBWUMsUUFBWixDQUpVO0FBQUEsSUFNVixJQUFJLE9BQU9DLE9BQVAsS0FBbUIsUUFBdkIsRUFBaUM7QUFBQSxRQUMvQkYsTUFBQSxHQUFTRyxPQUFBLENBQVEsY0FBUixDQUFULENBRCtCO0FBQUEsUUFFL0JGLFFBQUEsR0FBV0UsT0FBQSxDQUFRLGFBQVIsQ0FBWCxDQUYrQjtBQUFBLEtBQWpDLE1BR087QUFBQSxRQUNMSCxNQUFBLEdBQVMsS0FBS0EsTUFBZCxDQURLO0FBQUEsUUFFTEMsUUFBQSxHQUFXLEtBQUtBLFFBQWhCLENBRks7QUFBQSxLQVRHO0FBQUEsSUFjVkcsUUFBQSxDQUFTLFlBQVQsRUFBdUIsWUFBVztBQUFBLFFBRWhDQSxRQUFBLENBQVMsc0JBQVQsRUFBaUMsWUFBVztBQUFBLFlBRTFDQyxFQUFBLENBQUcsK0JBQUgsRUFBb0MsWUFBVztBQUFBLGdCQUM3Q0wsTUFBQSxDQUFPQSxNQUFBLENBQUFNLEtBQUEsQ0FBQU4sTUFBQSxDQUFBTyxLQUFBLENBQUFQLE1BQUEsQ0FBQU8sS0FBQSxDQUFBTixRQUFBLENBQVMsQ0FBVCwyQkFBZ0IsQ0FBaEI7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QUEsQ0FBT0EsTUFBQSxDQUFBTSxLQUFBLENBQUFOLE1BQUEsQ0FBQU8sS0FBQSxDQUFBUCxNQUFBLENBQUFPLEtBQUEsQ0FBQVAsTUFBQSxDQUFBTyxLQUFBLENBQUF3QixJQUFBLDZCQUFLL0IsTUFBQSxDQUFBTyxLQUFBLENBQUFxQixDQUFBLDhCQUFMLDJCQUFZNUIsTUFBQSxDQUFBTyxLQUFBLENBQUFQLE1BQUEsQ0FBQU8sS0FBQSxDQUFBd0IsSUFBQSw4QkFBSy9CLE1BQUEsQ0FBQU8sS0FBQSxDQUFBc0IsQ0FBQSwrQkFBTCx1QkFBWjtBQUFBLG9CQUFBckIsT0FBQTtBQUFBLG9CQUFBQyxRQUFBO0FBQUEsb0JBQUFDLElBQUE7QUFBQSxrQkFBUCxFQWJTO0FBQUEsYUFEMkIsR0FlbENDLFNBZlIsRUFwQmtEO0FBQUEsU0FBcEQsRUE5R2dDO0FBQUEsS0FBbEMsRUFkVTtBQUFBLENBQVosQ0FzS0d3QixJQXRLSCxDQXNLUSxJQXRLUiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpIHtcblxuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIGFzc2VydCwgZGVlcGNvcHk7XG5cbiAgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgIGFzc2VydCA9IHJlcXVpcmUoJ3Bvd2VyLWFzc2VydCcpO1xuICAgIGRlZXBjb3B5ID0gcmVxdWlyZSgnLi4vZGVlcGNvcHknKTtcbiAgfSBlbHNlIHtcbiAgICBhc3NlcnQgPSB0aGlzLmFzc2VydDtcbiAgICBkZWVwY29weSA9IHRoaXMuZGVlcGNvcHk7XG4gIH1cblxuICBkZXNjcmliZSgnZGVlcGNvcHkoKScsIGZ1bmN0aW9uKCkge1xuXG4gICAgZGVzY3JpYmUoJ2NoZWNrIGZvciBzb21lIHR5cGVzJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHByaW1pdGl2ZSB0eXBlcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBhc3NlcnQoZGVlcGNvcHkoMSkgPT09IDEpO1xuICAgICAgICBhc3NlcnQoZGVlcGNvcHkoJ0EnKSA9PT0gJ0EnKTtcbiAgICAgICAgYXNzZXJ0KGRlZXBjb3B5KHRydWUpID09PSB0cnVlKTtcbiAgICAgICAgYXNzZXJ0KGRlZXBjb3B5KG51bGwpID09PSBudWxsKTtcbiAgICAgICAgYXNzZXJ0KGRlZXBjb3B5KHVuZGVmaW5lZCkgPT09IHVuZGVmaW5lZCk7XG4gICAgICAgIGFzc2VydChkZWVwY29weShJbmZpbml0eSkgPT09IEluZmluaXR5KTtcbiAgICAgICAgYXNzZXJ0KGRlZXBjb3B5KC1JbmZpbml0eSkgPT09IC1JbmZpbml0eSk7XG4gICAgICAgIGFzc2VydChpc05hTihkZWVwY29weShOYU4pKSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gRnVuY3Rpb24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZnVuY3Rpb24gZm4oKSB7fVxuXG4gICAgICAgIGFzc2VydChkZWVwY29weShmbikgPT09IGZuKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIHJldHVybiBEYXRlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGU7XG5cbiAgICAgICAgYXNzZXJ0KCtkZWVwY29weShkYXRlKSA9PT0gK2RhdGUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIFJlZ0V4cCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmVnZXhwID0gbmV3IFJlZ0V4cDtcblxuICAgICAgICBhc3NlcnQoU3RyaW5nKGRlZXBjb3B5KHJlZ2V4cCkpID09PSBTdHJpbmcocmVnZXhwKSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gQXJyYXknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGFycmF5ID0gW107XG5cbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChkZWVwY29weShhcnJheSksIGFycmF5KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIHJldHVybiBPYmplY3QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG9iamVjdCA9IHt9O1xuXG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwoZGVlcGNvcHkob2JqZWN0KSwgb2JqZWN0KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIHJldHVybiBCdWZmZXInLCAodHlwZW9mIEJ1ZmZlciA9PT0gJ2Z1bmN0aW9uJykgPyBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGJ1ZmZlciA9IG5ldyBCdWZmZXIoMCk7XG5cbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChkZWVwY29weShidWZmZXIpLCBidWZmZXIpO1xuICAgICAgfSA6IHVuZGVmaW5lZCk7XG5cbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIFN5bWJvbCcsICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nKSA/IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc3ltYm9sID0gU3ltYm9sKCk7XG5cbiAgICAgICAgYXNzZXJ0KGRlZXBjb3B5KHN5bWJvbCkgPT09IHN5bWJvbCk7XG4gICAgICB9IDogdW5kZWZpbmVkKTtcblxuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2NoZWNrIGZvciByZWN1cnNpdmUgY29weScsIGZ1bmN0aW9uKCkge1xuXG4gICAgICBpdCgnc2hvdWxkIHJldHVybiByZWN1cnNpdmUgY29weSBmb3IgYXJyYXknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGFycmF5ID0gW1xuICAgICAgICAgIFtbMV0sIFsyXSwgWzNdXSxcbiAgICAgICAgICBbWzRdLCBbNV0sIFs2XV0sXG4gICAgICAgICAgW1s3XSwgWzhdLCBbOV1dXG4gICAgICAgIF07XG5cbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChkZWVwY29weShhcnJheSksIGFycmF5KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIHJldHVybiByZWN1cnNpdmUgY29weSBmb3Igb2JqZWN0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBvYmplY3QgPSB7XG4gICAgICAgICAgYTogeyBhOiB7IGE6IHRydWUgfSwgYjogeyBiOiBmYWxzZSB9LCBjOiB7IGM6IG51bGwgfSB9LFxuICAgICAgICAgIGI6IHsgYTogeyBhOiB0cnVlIH0sIGI6IHsgYjogZmFsc2UgfSwgYzogeyBjOiBudWxsIH0gfSxcbiAgICAgICAgICBjOiB7IGE6IHsgYTogdHJ1ZSB9LCBiOiB7IGI6IGZhbHNlIH0sIGM6IHsgYzogbnVsbCB9IH1cbiAgICAgICAgfTtcblxuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKGRlZXBjb3B5KG9iamVjdCksIG9iamVjdCk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gb2JqZWN0LCBpdCBoYXMgY2lyY3VsYXIgcmVmZXJlbmNlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBvYmplY3QsIGNvcHk7XG5cbiAgICAgICAgYXNzZXJ0LmRvZXNOb3RUaHJvdyhmdW5jdGlvbigpIHtcbiAgICAgICAgICBvYmplY3QgPSB7fTtcbiAgICAgICAgICBvYmplY3QudG8gPSBvYmplY3Q7XG4gICAgICAgICAgY29weSA9IGRlZXBjb3B5KG9iamVjdCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGFzc2VydChjb3B5ID09PSBjb3B5LnRvKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIHJldHVybiBvYmplY3QsIGl0IGhhcyBzeW1ib2wnLCAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJykgP1xuICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIG9iamVjdCA9IHt9LFxuICAgICAgICAgICAgICAgIGEgPSBTeW1ib2wuZm9yKCdhJyksXG4gICAgICAgICAgICAgICAgYiA9IFN5bWJvbC5mb3IoJ2InKSxcbiAgICAgICAgICAgICAgICBjID0gU3ltYm9sLmZvcignYycpO1xuXG4gICAgICAgICAgICBvYmplY3RbYV0gPSAxO1xuICAgICAgICAgICAgb2JqZWN0W2JdID0gMjtcbiAgICAgICAgICAgIG9iamVjdFtjXSA9IDM7XG5cbiAgICAgICAgICAgIGFzc2VydC5kZWVwRXF1YWwoZGVlcGNvcHkob2JqZWN0KSwgb2JqZWN0KTtcbiAgICAgICAgICB9IDogdW5kZWZpbmVkXG4gICAgICApO1xuXG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnY2hlY2sgZm9yIGR1cGxpY2F0ZSBmdW5jdGlvbicsIGZ1bmN0aW9uKCkge1xuXG4gICAgICBpdCgnc2hvdWxkIHJldHVybiBhcnJheSwgaXQgaGFzIGR1cGxpY2F0ZSBmdW5jdGlvbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYXJyYXkgPSBbZm4sIGZuXSxcbiAgICAgICAgICAgIGNvcHkgPSBkZWVwY29weShhcnJheSk7XG5cbiAgICAgICAgZnVuY3Rpb24gZm4oKSB7fVxuXG4gICAgICAgIGFzc2VydChjb3B5WzBdID09PSBjb3B5WzFdKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIHJldHVybiBvYmplY3QsIGl0IGhhcyBkdXBsaWNhdGUgZnVuY3Rpb24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG9iamVjdCA9IHsgYTogZm4sIGI6IGZuIH0sXG4gICAgICAgICAgICBjb3B5ID0gZGVlcGNvcHkob2JqZWN0KTtcblxuICAgICAgICBmdW5jdGlvbiBmbigpIHt9XG5cbiAgICAgICAgYXNzZXJ0KGNvcHkuYSA9PT0gY29weS5iKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIHJldHVybiBvYmplY3QsIGl0IGhhcyBzeW1ib2wnLCAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJykgP1xuICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIG9iamVjdCA9IHt9LFxuICAgICAgICAgICAgICAgIGEgPSBTeW1ib2wuZm9yKCdhJyksXG4gICAgICAgICAgICAgICAgYiA9IFN5bWJvbC5mb3IoJ2InKSxcbiAgICAgICAgICAgICAgICBjb3B5O1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBmbigpIHt9XG5cbiAgICAgICAgICAgIG9iamVjdFthXSA9IGZuO1xuICAgICAgICAgICAgb2JqZWN0W2JdID0gZm47XG5cbiAgICAgICAgICAgIGNvcHkgPSBkZWVwY29weShvYmplY3QpO1xuXG4gICAgICAgICAgICBhc3NlcnQoY29weVthXSA9PT0gY29weVtiXSk7XG4gICAgICAgICAgfSA6IHVuZGVmaW5lZFxuICAgICAgKTtcblxuICAgIH0pO1xuXG4gIH0pO1xuXG59KS5jYWxsKHRoaXMpO1xuIl19

