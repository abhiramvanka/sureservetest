exports.index = function(req, res) {
    var message = '';
    res.render('homepage', { message: "hello" });

};