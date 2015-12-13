var express = require('express'),
    Post = require('../models/Post'),
    Quest = require('../models/Quest');
var router = express.Router();

function needAuth(req, res, next) {
    if (req.session.user) {
      next();
    } else {
      req.flash('danger', '로그인이 필요합니다.');
      res.redirect('/signin');
    }
}

// GET post
router.get('/', needAuth, function(req, res, next) {
  Post.find({}, function(err, posts) {
    if (err) {
      return next(err);
    }
    res.render('posts/index', {posts: posts});
  });
});

router.get('/new', needAuth, function(req, res, next) {
  res.render('posts/edit', {post: {}});
});

router.post('/', needAuth, function(req, res, next) {
  var post = new Post({
    title: req.body.title,
    explanation: req.body.explanation,
    //password: req.body.password,
    //content: req.body.content
  });
  post.save(function(err, doc) {
    if (err) {
      return next(err);
    }
    res.redirect('/posts/' + doc.id);
  });
});

//router.get('/make', function(req, res, next) {
  //res.render('posts/make', {task: {}});
//});

// GET post title and explanation
router.get('/:id', needAuth, function(req, res, next) {
  Post.findById(req.params.id, function(err, post) {
    if (err) {
      return next(err);
    }
    if (post) {
      post.read = post.read + 1;
      post.save(function(err) { });
      res.render('posts/show', {post: post});
    }
    return next(new Error('not found'));
  });
});

// MAKE quest
router.get('/:id/make', needAuth, function(req, res, next) {
  Post.findById(req.params.id, function(err, post) {
    if (err) {
      return next(err);
    }
    Quest.find({post: post.id}, function(err, quests) {
      if (err) {
        return next(err);
      }
      res.render('posts/make', {post: post, quests: quests});
    });
  });
});

router.post('/:id/make', needAuth, function(req, res, next) {
  var quest = new Quest({
    post: req.params.id,
    type: req.body.type,
    question: req.body.question,
    answer: req.body.answer,
    answer1: req.body.answer1,
    answer2: req.body.answer2,
    answer3: req.body.answer3,
    answer4: req.body.answer4,
    answer5: req.body.answer5
  });

  quest.save(function(err) {
    if (err) {
      return next(err);
    }
    Post.findByIdAndUpdate(req.params.id, {$inc: {numQuest: 1}}, function(err) {
      if (err) {
        return next(err);
      }
      res.redirect('/posts/' + req.params.id + '/make');
    });
  });
});

// EDIT post
router.get('/:id/edit', needAuth, function(req, res, next) {
  Post.findById(req.params.id, function(err, post) {
    if (err) {
      return next(err);
    }
    res.render('posts/edit', {post: post});
  });
});

router.put('/:id', needAuth, function(req, res, next) {
  Post.findById(req.params.id, function(err, post) {
    if (err) {
      return next(err);
    }
    post.title = req.body.title;
    post.explanation = req.body.explanation;
    //post.content = req.body.content;
    post.save(function(err) {
      res.redirect('/posts/');
    });
  });
});

// EDIT quest
router.get('/:id/make/questedit', needAuth, function(req, res, next) {
  Post.findById(req.params.id, function(err, post) {
    if (err) {
      return next(err);
    }
    Quest.find({post: post.id}, function(err, quests) {
      if (err) {
        return next(err);
      }
      res.render('posts/questedit', {post: post, quests: quests});
    });
  });
});

router.put('/:id/make/questedit', needAuth, function(req, res, next) {
  Quest.findById(req.params.id, function(err, quest) {
    if (err) {
      return next(err);
    }
    quest.question = req.body.question;
    quest.answer.answer1 = req.body.answer1;
    quest.answer.answer2 = req.body.answer2;
    quest.answer.answer3 = req.body.answer3;
    quest.answer.answer4 = req.body.answer4;
    quest.answer.answer5 = req.body.answer5;

    quest.save(function(err) {
      if (err) {
        return next(err);
      }
      res.redirect('/posts/' + quest.post + '/make');
    });
  });
});

// DELETE post
router.delete('/:id', needAuth, function(req, res, next) {
  Post.findOneAndRemove({_id: req.params.id}, function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/posts/');
  });
});

// DELETE quest
router.delete('/:id/quest', needAuth, function(req, res, next) {
  Quest.findOneAndRemove({_id: req.params.id}, function(err, quest) {
    if (err) {
      return next(err);
    }
    res.redirect('/posts/' + quest.post + '/make');
  });
});

function pagination(count, page, perPage, funcUrl) {
  var pageMargin = 3;
  var firstPage = 1;
  var lastPage = Math.ceil(count / perPage);
  var prevPage = Math.max(page - 1, 1);
  var nextPage = Math.min(page + 1, lastPage);
  var pages = [];
  var startPage = Math.max(page - pageMargin, 1);
  var endPage = Math.min(startPage + (pageMargin * 2), lastPage);
  for(var i = startPage; i <= endPage; i++) {
    pages.push({
      text: i,
      cls: (page === i) ? 'active': '',
      url: funcUrl(i)
    });
  }
  return {
    numPosts: count,
    firstPage: {cls: (page === 1) ? 'disabled' : '', url: funcUrl(1)},
    prevPage: {cls: (page === 1) ? 'disabled' : '', url: funcUrl(prevPage)},
    nextPage: {cls: (page === lastPage) ? 'disabled' : '', url: funcUrl(nextPage)},
    lastPage: {cls: (page === lastPage) ? 'disabled' : '', url: funcUrl(lastPage)},
    pages: pages
  };
}
router.get('/', function(req, res, next) {
  var page = req.query.page || 1;
  page = parseInt(page, 10);
  var perPage = 10;
  Post.count(function(err, count) {
    Post.find({}).sort({createdAt: -1})
    .skip((page-1)*perPage).limit(perPage)
    .exec(function(err, posts) {
      if (err) {
        return next(err);
      }
      res.render('posts/index', {
        posts: posts,
        pagination: pagination(count, page, perPage, function(p) {
          return '/posts?page=' + p;
        })
      });
    });
  });
});






module.exports = router;
