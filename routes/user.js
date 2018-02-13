exports.login = function(req, res) {
    message = '';
    // if (req.session != null) {
    //     req.session.destroy();
    // }

    if (req.method == "POST") {

        var post = req.body;
        var name = post.email;
        var password = post.password;
        console.log(name);
        var sql = "select * from registration where Email = '" + name + "' and Password='" + password + "' ";
        var query = db.query(sql, function(err, results) {
            if (results.length > 0) {
                req.session.useremail = results[0].Email;
                req.session.user = results[0];
                console.log(results[0].Email);
                res.redirect('/profile');
            } else {
                message = 'Wrong Credentials.';
                res.render('login.ejs', { message: message });
            }
        });
    } else {
        if (req.session != null) {
            req.session.destroy();
        }
        res.render('login');
    }
};



//User checker................
exports.checker = function(req, res) {
    var sql = "select Email from registration";
    var query = db.query(sql, function(err, result) {
        res.send(JSON.stringify(result));
    });
};

exports.signup = function(req, res) {
    message = '';
    if (req.session != null) {
        req.session.destroy();
    }
    if (req.method == "POST") {
        var post = req.body;
        var firstname = post.firstname;
        var lastname = post.lastname;
        var gender = post.gender;
        var dob = post.dob;
        var email = post.email;
        var mobile = post.mobile;
        var password = post.password;
        var sql = "insert into registration (FirstName,LastName,Email,Mobile,DOB,Gender,Password) values ('" + firstname + "','" + lastname + "','" + email + "','" + mobile + "','" + dob + "','" + gender + "','" + password + "')";

        var query = db.query(sql, function(err, result) {
            console.log("done");
            message = "Profile Successfully Created Go to Login";
            res.render('signup.ejs', { message: message });

        });

        console.log(firstname);
    } else {
        res.render('signup');
    }
    // res.render('signup');
};

exports.profile = function(req, res) {
    message = '';

    var user = req.session.user;
    var useremail = req.session.useremail;
    console.log(useremail + "dfg");
    if (useremail == null) {
        res.redirect("/");
        return;
    }
    var sql = "select * from registration where Email ='" + useremail + "'";

    db.query(sql, function(err, results) {
        console.log(results);
        res.render('profile.ejs', { user: results });
    });

};

exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        res.redirect("/");
    });
};