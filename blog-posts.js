const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

BlogPosts.create('foo','bar','bizz','1985');

BlogPosts.create('blah','blah','blah','2005')


router.get(('/'),(req,res)=>{
	res.json(BlogPosts.get());
});


router.delete(('/:id'),(req,res)=>{
	BlogPosts.delete(req.params.id);
	console.log(`Deleted BlogPosts item \`${req.params.id}\``);
  	res.status(204).end();
});


router.post('/',jsonParser,(req,res)=>{
	requiredContent=['title','content','author'];
	
	requiredContent.forEach((field)=>{
		if (!(field in req.body)){
			const message = `Missing \`${field}\` in request body`
      		console.error(message);
      		return res.status(400).send(message);
		}
	});

	if (!(req.body.publishDate)){
		req.body.publishDate='unknown';
	}

	const item = BlogPosts.create(req.body.title, req.body.content,req.body.author,req.body.publishDate);
  	res.status(201).json(item);
});


router.put('/:id',jsonParser,(req,res)=>{
	requiredContent=['title','content','author'];
	
	requiredContent.forEach((field)=>{
		if (!(field in req.body)){
			const message = `Missing \`${field}\` in request body`
      		console.error(message);
      		return res.status(400).send(message);
		}
	});

	if (!(req.body.publishDate)){
		req.body.publishDate='unknown';
	}

	if (req.params.id !== req.body.id) {
    	const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;
    	console.error(message);
    	return res.status(400).send(message);
 	}
  
  	console.log(`Updating BlogPosts item \`${req.params.id}\``);
	BlogPosts.update({
		id: req.params.id,
	    title: req.params.title,
	    content: req.body.content,
	    author: req.body.author,
	    publishDate: req.body.publishDate
	});
	  
	res.status(204).end();
});















module.exports = router;