var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('../app')
var Blog = require('../models/blog_models')

chai.use(chaiHttp)

var should = chai.should()


describe('Testing for CRUD Blog', function() {

  beforeEach(function(done) {
    // runs before each test in this block
    var insertBlog = new Blog({
    	title : 'Title',
    	description : 'description',
    	image : 'image'
    })
    insertBlog.save((err, response)=>{
			done()
		})
  });

  afterEach(function(done) {
    // runs after each test in this block
		Blog.remove({},(err, response)=>{
			done()
		})
  });


  describe('Insert Blog ', function() {
    it('Should  data Blog', function(done) {
    	chai.request(server)
		  .post('/api/blog')
		  .send({
               title : 'Title',
          	description : 'description',
          	image : 'image',
		  })
		  .end((err, res)=>{
		  	res.should.have.status(200);
		  	res.body.should.be.a('object');
		  	res.body.title.should.be.equal('Title')
		  	done()
		  })
    });
  });

	describe("GET Blog ",()=>{
		it('Should get all data Blog',(done)=>{
			chai.request(server)
			.get('/api/blog')
			.end((err, res)=>{
				res.should.have.status(200)
				res.body.should.be.a('array')
				res.body.length.should.equal(1)
				res.body[0].description.should.equal('description')
				done()
			})
		})
	})

	describe("DELETE Blog ",()=>{
		it('Should Delete Data Blog by id',(done)=>{
			var insertBlog = new Blog({
          	    	title : 'Title',
          	    	description : 'Description',
          	    	image : 'image'
          		})
			insertBlog.save((err, result)=>{
				chai.request(server)
				.delete('/api/blog/'+ result._id)
				.end((err,res)=>{
                         res.should.have.status(200)
                         should.exist(res.body);
					res.body.should.be.a('object');
					res.body.msg.should.be.a('string');
					res.body.docs.should.be.a('object')
					res.body.docs.ok.should.equal(1)
					res.body.docs.n.should.equal(1)
					done()
				})
			})
		})
	})

	describe("Update Blog ",()=>{
		it('Should Update Data Blog by id',(done)=>{
			var insertBlog = new Blog({
	    	title : 'Title',
	    	description : 'Description',
	    	image : 'image'
			})
			insertBlog.save((err, result)=>{
				chai.request(server)
				.put('/api/blog/'+ result._id)
				.send({
		    	title : 'Title New',
		    	description : 'Description New',
		    	image : 'image New'
				})
				.end((err,res)=>{
					res.body.should.be.a('object');

					done()
				})
			})
		})
	})


});
