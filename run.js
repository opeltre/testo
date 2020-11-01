let __ = require('lolo'),
    _r = __.r,
    Show = require('./show'),
    Tracer = require('./tracer');

/*------ Test ------
 
    Test a collection of files. 
    Each file exports a collection of unit tests, 
    which are functions valued in the `Tracer` monad. 

        File = { Unit }
        Unit = () -> Tracer a 

*///---

//  test : {File} -> Tracer a
let test = (files) => {
    let testError = '\tOh no!',
        show = Show.files(),
        rall = Tracer.rall.writes(show.rall),
        rmap = Tracer.rmap.writes(show.rmap);
    let ta = [true, [Show.head(files)]],
        ts = rmap(test.file)(files),
        tb = Tracer.bind(ta, () => rall(ts));
    Tracer.log(tb); 
    //--- throw ---
    if (tb[0] === null) 
        throw(testError);
}

//  .file : ({Unit}, String) -> Tracer a
test.file = (units, file) => {
    let show = Show.units(file),
        rall = Tracer.rall.writes(show.rall),
        rmap = Tracer.rmap.writes(show.rmap);
    return rall(rmap(
        unit => Tracer.try(unit)() 
    )(units));
}

module.exports = test;
