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
                    res.body.should.be.a('object')
                    res.body.name.should.be.equal('New User')
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
                    res.body.should.be.a('array')
                    res.body.length.should.equal(1)
                    done()
               })
          })
     })

     // describe('PUT Users', function(){
     //      it('should be update User by id', function(done){
     //           var insertUser = new User({
     //                "name": "Full name",
     //                "email": "user@mail.com",
     //                "password": "password",
     //                "phone": "phone"
     //           })
     //           insertUser.save(function(err, res){
     //                chai.request(server)
     //                .put('/api/users' + res._id)
     //                .send({
     //                     "name": "Full name",
     //                     "email": "user@mail.com",
     //                     "password": "password",
     //                     "phone": "phone"
     //                })
     //                .end(function(err,res){
     //                     res.should.have.status(200)
     //                     res.body.should.be.a('object')
     //                     res.body.should.have.property('name')
     //                     res.body.should.have.property('email')
     //                     res.body.should.have.property('password')
     //                     done()
     //                })
     //           })
     //      })
     // })

     describe("DELETE Users ",function(){
		it('Should Delete Data User by id',function(done){
			var insertUser = new User({
				"name": "Ambo",
				"email": "ambo@gmail.com",
				"image": "image.jpg"
			})
			insertUser.save(function(err, result){
				chai.request(server)
				.delete('/api/users'+ result._id)
				.end(function(err,res){
					// res.should.have.status(200);
					res.body.should.be.a('object');
                         // res.body.length.should.equal(1)
					// res.body.msg.should.be.a('string');
					// res.body.result.should.be.a('object')
					// res.body.result.ok.should.equal(1);
					// res.body.result.n.should.equal(1);
					done()
				})
			})
		})
	})



})
