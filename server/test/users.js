const chai = require('chai')
const chaiHttp = require('chai-http')
var server = require('../app')
chai.use(chaiHttp)
var User = require('../models/user_models')

var should = chai.should()

describe('User', function(){

     beforeEach(function(done){
          var insertUser = new User({
               name: "name",
               email: "user@mail.com",
               password: "password",
               phone: 'phone'
          })
          insertUser.save((err, res)=>{
               done()
          })
     })

     afterEach(function(done){
          User.remove({}, (err, response)=>{
               done()
          })
     })

     describe('CREATE USER', function(){
          it('should Data users', function(done){
               chai.request(server)
               .post('/api/users')
               .send({
                    name: "New User",
                    phone: "phone1",
                    password: "password1",
                    email: 'user1@email.com'
               })
               .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.msg.should.be.a('string')
                    done()
               })
          })
     })

     describe('SIGNIN USER', function(){
          it('should Data users', function(done){
               chai.request(server)
               .post('/api/users/signin/')
               .send({
                    name: "User",
                    phone: "phone",
                    password: "password",
                    email: 'user@email.com'
               })
               .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.msg.should.be.a('string')
                    done()
               })
          })
     })

     describe('GET Users', function(){
          it('get all data user', function(done){
               chai.request(server)
               .get('/api/users')
               .end((err,res)=>{
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    done()
               })
          })
     })

     describe('PUT Users', function(){
          it('should be update User by id', function(done){
               var insertUser = new User({
                    "name": "Update name",
                    "email": "user@mail.com",
                    "password": "password",
                    "phone": "phone"
               })
               insertUser.save(function(err, res){
                    chai.request(server)
                    .put('/api/users/' + res._id)
                    .send({
                         "name": "Update name",
                         "email": "user@mail.com",
                         "password": "password",
                         "phone": "phone"
                    })
                    .end(function(err,res){
                         res.should.have.status(200);
                         res.body.should.be.a('object')
                         done()
                    })
               })
          })
     })

     describe("DELETE Users ",function(){
		it('Should Delete Data User by id',function(done){
			var insertUser = new User({
				"name": "Ambo",
				"email": "ambo@gmail.com",
				"image": "image.jpg"
			})
			insertUser.save(function(err, result){
				chai.request(server)
				.delete('/api/users/'+ result._id)
				.end(function(err,res){
                         res.should.have.status(200);
					res.body.should.be.a('object');
					done()
				})
			})
		})
	})



})
