const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose');


app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost/MyBlog');
const db = mongoose.connection;

db.on('open', () => {
    console.log('db connection established!');
})

db.on('error', () => {
    console.log('db connection failed!');
})

const User = mongoose.model('users', {
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    blogs: {
        type: [String]
    }
})

const Post = mongoose.model('posts', {
    title: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    likes: {
        type: [String]
    },
    comments: {
        type: [{
            commentedBy: String,
            content: String
        }]
    }
});

app.post('/register', (req, res) => {
    console.log("inside register");
    // console.log(req.body);
    let user1 = new User({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email
    })

    user1.save((err, docs) => {
        console.log(docs);
        if (err) {
            res.json({
                success: false
            })
        } else if (docs) {
            res.json({
                success: true
            })
        } else {
            res.json({
                success: false
            })
        }
    })
});

app.post('/login', (req, res) => {
    console.log("Inside Login");
    User.find({
        username: req.body.username
    }).then((docs) => {
        if (docs != [] && docs.length > 0) {
            if (docs[0].password == req.body.password) {
                let token = jwt.sign({ 'uname': req.body.username }, 'my-blog-secret-key', { expiresIn: '1h' });
                res.json({
                    success: true,
                    token: token
                })
            } else {
                res.json({
                    success: false
                })
            }
        } else {
            res.json({
                success: false
            })
        }
    })
});

app.use((req, res, next) => {
    let token = req.headers.authorization;
    console.log("Inside middleware");
    jwt.verify(token, 'my-blog-secret-key', (err, decoded) => {
        if (err) {
            console.log('Error');
        } else {
            req.decoded = decoded;
            // console.log(req.decoded);
            next();
        }
    })

});

app.post('/create', (req, res) => {
    // console.log(req.body);
    let post1 = new Post({
        title: req.body.title,
        content: req.body.content,
        created_at: new Date(),
        author: req.decoded.uname
    })
    post1.save((err, docs) => {
        if (err) {
            res.json({
                success: false
            })
        } else if (docs) {
            console.log(docs, "Docs");
            User.findOneAndUpdate({
                username: req.decoded.uname
            }, {
                    $push: {
                        blogs: docs._id
                    }
                }).then((data) => {
                    res.json({
                        success: true
                    })
                })

        }
    })
});

app.get('/list', (req, res) => {
    Post.find({}).then((data) => {
        if (data) {
            res.json({
                posts: data
            })
        }
    })
});

app.post('/likesupdate', (req, res) => {
    console.log("Inside likes update", req.body);
    if (req.body.like) {
        Post.findOneAndUpdate({
            _id: req.body.id
        }, {
                $push: {
                    likes: req.decoded.uname
                }
            }).then((docs) => {
                res.json({
                    success: true
                })
            })
    } else {
        Post.findOneAndUpdate({
            _id: req.body.id
        }, {
                $pull: {
                    likes: req.decoded.uname
                }
            }).then((docs) => {
                res.json({
                    success: true
                })
            })
    }
});

app.post('/createcomment', (req, res) => {
    console.log(req.body);
    Post.findByIdAndUpdate({
        _id: req.body.id
    }, {
            $push: {
                comments: {
                    commentedBy: req.decoded.uname,
                    content: req.body.content
                }
            }
        }).then((docs) => {
            console.log(docs);
            res.json({
                success: true
            })
        }).catch((err) => {
            res.json({
                success: false
            })
        })
})

app.get('/getuser', (req, res) => {
    User.find({
        username: req.decoded.uname
    }).then((docs) => {
        res.json({
            user: docs[0],
            success: true
        })
    })
})

app.post('/getusersposts', (req, res) => {
    console.log("blogs", req.body);
    Post.find({
        _id: {
            $in: req.body
        }
    }).then((docs) => {
        console.log(docs.length);

        res.json({
            success: true,
            blogs: docs
        })
    }).catch((err) => {
        console.log("Error", err);
    })
})

app.get('/getpost/:id', (req, res) => {
    Post.find({
        _id: req.params.id
    }).then((docs) => {
        res.json({
            post: docs[0]
        })
    })
})

app.listen("2000", () => {
    console.log("App running @2000");
})