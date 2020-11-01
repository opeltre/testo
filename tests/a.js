let test = require('../index');

exports.a = () => {
    let expect = {x: 0, y: 1},
        obtain = {x: 0, y: 1};
    return test(expect, obtain);
};

exports.b = () => {
    let expect = "hi",
        obtain = 2;
    return test(expect, obtain);
}
