var passport = require('passport');
var User = require('../app/models/User');
var LocalStrategy = require('passport-local').Strategy;
passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user);
    });
});

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    emailField: 'email',
    phoneNumberField: 'phoneNumber',
    passReqToCallback: true
}, function(req, username, password, done){
    var name = req.body.name;
    var phoneNumber = req.body.phoneNumber
    req.checkBody('username', 'Tên tài khoản không được để trống').notEmpty();
    req.checkBody('name', 'Email không được để trống').notEmpty();
    req.checkBody('password', 'Mật khẩu không được trống').notEmpty();
    req.checkBody('password', 'Mật khẩu dài ít nhất 8 ký tự').isLength({min: 8});
    req.checkBody('phoneNumber', 'Số điện thoại dài 10 ký tự').isLength(10);
    var errors = req.validationErrors();
    
    if(errors){
        var messages =[];
        errors.forEach(function(error){
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    User.findOne({ 'username': username }, function(err, user){
        if(err) return done(err);
        if(user){
            return done(null, false, {message: 'Tài khoản đã được sử dụng.'});
        }
        else{
            var newUser = new User();
            newUser.username = username;
            newUser.password = newUser.encryptPassword(password);
            newUser.name = name;
            newUser.phoneNumber = phoneNumber;
            newUser.save(function(err, result){
                if(err) return done(err);
                return done(null, newUser);
            });
        }
    });
}));

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, username, password, done){
    req.checkBody('username', 'Tên tài khoản không được để trống').notEmpty();
    req.checkBody('password', 'Mật khẩu không được trống').notEmpty();
    req.checkBody('password', 'Mật khẩu dài hơn 8 ký tự').isLength({min: 8});
    var errors = req.validationErrors();
    if(errors){
        var messages =[];
        errors.forEach(function(error){
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    User.findOne({ 'username': username }, function(err, user){
        if(err) return done(err);
        if(!user){
            return done(null, false, {message: 'Không tìm thấy tài khoản'});
        }
        if(!user.validPassword(password)){
            return done(null, false, {message: 'Sai mật khẩu'});
        }

        return done(null, user)
    });
}));