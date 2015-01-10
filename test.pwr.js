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
                    line: 77
                }), assert._expr(assert._capt(array, 'arguments/1'), {
                    content: 'assert.deepEqual(deepcopy(array), array)',
                    filepath: 'test.js',
                    line: 77
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
                    line: 87
                }), assert._expr(assert._capt(object, 'arguments/1'), {
                    content: 'assert.deepEqual(deepcopy(object), object)',
                    filepath: 'test.js',
                    line: 87
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
                    line: 99
                }));
                assert(assert._expr(assert._capt(assert._capt(assert._capt(copy, 'arguments/0/left/object').to, 'arguments/0/left') === assert._capt(copy, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert(copy.to === copy)',
                    filepath: 'test.js',
                    line: 100
                }));
            });
        });
        describe('check for duplicate item', function () {
            it('should return array, it has duplicate item', function () {
                var array = [
                        fn,
                        fn
                    ], copy = deepcopy(array);
                function fn() {
                }
                assert(assert._expr(assert._capt(assert._capt(assert._capt(copy, 'arguments/0/left/object')[0], 'arguments/0/left') === assert._capt(assert._capt(copy, 'arguments/0/right/object')[1], 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert(copy[0] === copy[1])',
                    filepath: 'test.js',
                    line: 113
                }));
            });
            it('should return object, it has duplicate item', function () {
                var object = {
                        a: fn,
                        b: fn
                    }, copy = deepcopy(object);
                function fn() {
                }
                assert(assert._expr(assert._capt(assert._capt(assert._capt(copy, 'arguments/0/left/object').a, 'arguments/0/left') === assert._capt(assert._capt(copy, 'arguments/0/right/object').b, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert(copy.a === copy.b)',
                    filepath: 'test.js',
                    line: 122
                }));
            });
        });
    });
}.call(this));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QuanMiXSwibmFtZXMiOlsiYXNzZXJ0IiwiZGVlcGNvcHkiLCJleHBvcnRzIiwicmVxdWlyZSIsImRlc2NyaWJlIiwiaXQiLCJfZXhwciIsIl9jYXB0IiwiY29udGVudCIsImZpbGVwYXRoIiwibGluZSIsInVuZGVmaW5lZCIsIkluZmluaXR5IiwiaXNOYU4iLCJOYU4iLCJmbiIsImRhdGUiLCJEYXRlIiwicmVnZXhwIiwiUmVnRXhwIiwiU3RyaW5nIiwiYXJyYXkiLCJkZWVwRXF1YWwiLCJvYmplY3QiLCJCdWZmZXIiLCJidWZmZXIiLCJhIiwiYiIsImMiLCJjb3B5IiwiZG9lc05vdFRocm93IiwidG8iLCJjYWxsIl0sIm1hcHBpbmdzIjoiQUFBQSxDQUFDLFlBQVc7QUFBQSxJQUVWLGFBRlU7QUFBQSxJQUlWLElBQUlBLE1BQUosRUFBWUMsUUFBWixDQUpVO0FBQUEsSUFNVixJQUFJLE9BQU9DLE9BQVAsS0FBbUIsUUFBdkIsRUFBaUM7QUFBQSxRQUMvQkYsTUFBQSxHQUFTRyxPQUFBLENBQVEsY0FBUixDQUFULENBRCtCO0FBQUEsUUFFL0JGLFFBQUEsR0FBV0UsT0FBQSxDQUFRLGFBQVIsQ0FBWCxDQUYrQjtBQUFBLEtBQWpDLE1BR087QUFBQSxRQUNMSCxNQUFBLEdBQVMsS0FBS0EsTUFBZCxDQURLO0FBQUEsUUFFTEMsUUFBQSxHQUFXLEtBQUtBLFFBQWhCLENBRks7QUFBQSxLQVRHO0FBQUEsSUFjVkcsUUFBQSxDQUFTLFlBQVQsRUFBdUIsWUFBVztBQUFBLFFBRWhDQSxRQUFBLENBQVMsc0JBQVQsRUFBaUMsWUFBVztBQUFBLFlBRTFDQyxFQUFBLENBQUcsK0JBQUgsRUFBb0MsWUFBVztBQUFBLGdCQUM3Q0wsTUFBQSxDQUFPQSxNQUFBLENBQUFNLEtBQUEsQ0FBQU4sTUFBQSxDQUFBTyxLQUFBLENBQUFQLE1BQUEsQ0FBQU8sS0FBQSxDQUFBTixRQUFBLENBQVMsQ0FBVCwyQkFBZ0IsQ0FBaEI7QUFBQSxvQkFBQU8sT0FBQTtBQUFBLG9C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QUgsRUFBa0QsWUFBVztBQUFBLGdCQUMzRCxJQUFJa0IsTUFBQSxHQUFTO0FBQUEsd0JBQUVHLENBQUEsRUFBR1gsRUFBTDtBQUFBLHdCQUFTWSxDQUFBLEVBQUdaLEVBQVo7QUFBQSxxQkFBYixFQUNJYyxJQUFBLEdBQU81QixRQUFBLENBQVNzQixNQUFULENBRFgsQ0FEMkQ7QUFBQSxnQkFJM0QsU0FBU1IsRUFBVCxHQUFjO0FBQUEsaUJBSjZDO0FBQUEsZ0JBTTNEZixNQUFBLENBQU9BLE1BQUEsQ0FBQU0sS0FBQSxDQUFBTixNQUFBLENBQUFPLEtBQUEsQ0FBQVAsTUFBQSxDQUFBTyxLQUFBLENBQUFQLE1BQUEsQ0FBQU8sS0FBQSxDQUFBc0IsSUFBQSw2QkFBS0gsQ0FBTCwwQkFBVzFCLE1BQUEsQ0FBQU8sS0FBQSxDQUFBUCxNQUFBLENBQUFPLEtBQUEsQ0FBQXNCLElBQUEsOEJBQUtGLENBQUwsc0JBQVg7QUFBQSxvQkFBQW5CLE9BQUE7QUFBQSxvQkFBQUMsUUFBQTtBQUFBLG9CQUFBQyxJQUFBO0FBQUEsa0JBQVAsRUFOMkQ7QUFBQSxhQUE3RCxFQVg4QztBQUFBLFNBQWhELEVBMUZnQztBQUFBLEtBQWxDLEVBZFU7QUFBQSxDQUFaLENBZ0lHc0IsSUFoSUgsQ0FnSVEsSUFoSVIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKSB7XG5cbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBhc3NlcnQsIGRlZXBjb3B5O1xuXG4gIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICBhc3NlcnQgPSByZXF1aXJlKCdwb3dlci1hc3NlcnQnKTtcbiAgICBkZWVwY29weSA9IHJlcXVpcmUoJy4uL2RlZXBjb3B5Jyk7XG4gIH0gZWxzZSB7XG4gICAgYXNzZXJ0ID0gdGhpcy5hc3NlcnQ7XG4gICAgZGVlcGNvcHkgPSB0aGlzLmRlZXBjb3B5O1xuICB9XG5cbiAgZGVzY3JpYmUoJ2RlZXBjb3B5KCknLCBmdW5jdGlvbigpIHtcblxuICAgIGRlc2NyaWJlKCdjaGVjayBmb3Igc29tZSB0eXBlcycsIGZ1bmN0aW9uKCkge1xuXG4gICAgICBpdCgnc2hvdWxkIHJldHVybiBwcmltaXRpdmUgdHlwZXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgYXNzZXJ0KGRlZXBjb3B5KDEpID09PSAxKTtcbiAgICAgICAgYXNzZXJ0KGRlZXBjb3B5KCdBJykgPT09ICdBJyk7XG4gICAgICAgIGFzc2VydChkZWVwY29weSh0cnVlKSA9PT0gdHJ1ZSk7XG4gICAgICAgIGFzc2VydChkZWVwY29weShudWxsKSA9PT0gbnVsbCk7XG4gICAgICAgIGFzc2VydChkZWVwY29weSh1bmRlZmluZWQpID09PSB1bmRlZmluZWQpO1xuICAgICAgICBhc3NlcnQoZGVlcGNvcHkoSW5maW5pdHkpID09PSBJbmZpbml0eSk7XG4gICAgICAgIGFzc2VydChkZWVwY29weSgtSW5maW5pdHkpID09PSAtSW5maW5pdHkpO1xuICAgICAgICBhc3NlcnQoaXNOYU4oZGVlcGNvcHkoTmFOKSkpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIEZ1bmN0aW9uJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGZ1bmN0aW9uIGZuKCkge31cblxuICAgICAgICBhc3NlcnQoZGVlcGNvcHkoZm4pID09PSBmbik7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gRGF0ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlO1xuXG4gICAgICAgIGFzc2VydCgrZGVlcGNvcHkoZGF0ZSkgPT09ICtkYXRlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIHJldHVybiBSZWdFeHAnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJlZ2V4cCA9IG5ldyBSZWdFeHA7XG5cbiAgICAgICAgYXNzZXJ0KFN0cmluZyhkZWVwY29weShyZWdleHApKSA9PT0gU3RyaW5nKHJlZ2V4cCkpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIEFycmF5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhcnJheSA9IFtdO1xuXG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwoZGVlcGNvcHkoYXJyYXkpLCBhcnJheSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gT2JqZWN0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBvYmplY3QgPSB7fTtcblxuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKGRlZXBjb3B5KG9iamVjdCksIG9iamVjdCk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gQnVmZmVyJywgKHR5cGVvZiBCdWZmZXIgPT09ICdmdW5jdGlvbicpID8gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBidWZmZXIgPSBuZXcgQnVmZmVyKDApO1xuXG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwoZGVlcGNvcHkoYnVmZmVyKSwgYnVmZmVyKTtcbiAgICAgIH0gOiB1bmRlZmluZWQpO1xuXG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnY2hlY2sgZm9yIHJlY3Vyc2l2ZSBjb3B5JywgZnVuY3Rpb24oKSB7XG5cbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHJlY3Vyc2l2ZSBjb3B5IGZvciBhcnJheScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYXJyYXkgPSBbXG4gICAgICAgICAgW1sxXSwgWzJdLCBbM11dLFxuICAgICAgICAgIFtbNF0sIFs1XSwgWzZdXSxcbiAgICAgICAgICBbWzddLCBbOF0sIFs5XV1cbiAgICAgICAgXTtcblxuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKGRlZXBjb3B5KGFycmF5KSwgYXJyYXkpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHJlY3Vyc2l2ZSBjb3B5IGZvciBvYmplY3QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG9iamVjdCA9IHtcbiAgICAgICAgICBhOiB7IGE6IHsgYTogdHJ1ZSB9LCBiOiB7IGI6IGZhbHNlIH0sIGM6IHsgYzogbnVsbCB9IH0sXG4gICAgICAgICAgYjogeyBhOiB7IGE6IHRydWUgfSwgYjogeyBiOiBmYWxzZSB9LCBjOiB7IGM6IG51bGwgfSB9LFxuICAgICAgICAgIGM6IHsgYTogeyBhOiB0cnVlIH0sIGI6IHsgYjogZmFsc2UgfSwgYzogeyBjOiBudWxsIH0gfVxuICAgICAgICB9O1xuXG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwoZGVlcGNvcHkob2JqZWN0KSwgb2JqZWN0KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIHJldHVybiBvYmplY3QsIGl0IGhhcyBjaXJjdWxhciByZWZlcmVuY2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG9iamVjdCwgY29weTtcblxuICAgICAgICBhc3NlcnQuZG9lc05vdFRocm93KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIG9iamVjdCA9IHt9O1xuICAgICAgICAgIG9iamVjdC50byA9IG9iamVjdDtcbiAgICAgICAgICBjb3B5ID0gZGVlcGNvcHkob2JqZWN0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYXNzZXJ0KGNvcHkgPT09IGNvcHkudG8pO1xuICAgICAgICBhc3NlcnQoY29weS50byA9PT0gY29weSk7XG4gICAgICB9KTtcblxuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2NoZWNrIGZvciBkdXBsaWNhdGUgaXRlbScsIGZ1bmN0aW9uKCkge1xuXG4gICAgICBpdCgnc2hvdWxkIHJldHVybiBhcnJheSwgaXQgaGFzIGR1cGxpY2F0ZSBpdGVtJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhcnJheSA9IFtmbiwgZm5dLFxuICAgICAgICAgICAgY29weSA9IGRlZXBjb3B5KGFycmF5KTtcblxuICAgICAgICBmdW5jdGlvbiBmbigpIHt9XG5cbiAgICAgICAgYXNzZXJ0KGNvcHlbMF0gPT09IGNvcHlbMV0pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIG9iamVjdCwgaXQgaGFzIGR1cGxpY2F0ZSBpdGVtJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBvYmplY3QgPSB7IGE6IGZuLCBiOiBmbiB9LFxuICAgICAgICAgICAgY29weSA9IGRlZXBjb3B5KG9iamVjdCk7XG5cbiAgICAgICAgZnVuY3Rpb24gZm4oKSB7fVxuXG4gICAgICAgIGFzc2VydChjb3B5LmEgPT09IGNvcHkuYik7XG4gICAgICB9KTtcblxuICAgIH0pO1xuXG4gIH0pO1xuXG59KS5jYWxsKHRoaXMpO1xuIl19

