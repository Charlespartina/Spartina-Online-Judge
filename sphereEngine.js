// This is a library for calling sphere engine API
var request = require('request');
var my_access_token = '14e498d49275c2d7a5bb04cd89de82fe7a76bab1';
function testCom(){
		request({
			url: 'https://api.compilers.sphere-engine.com/api/v3/test',
			method: 'GET',
			qs:{
				access_token:my_access_token
			}
		}, function(err,response, body){
			console.log(response.statusCode);
			console.log(body);
	});
}
function testPro(){
		request({
			rejectUnauthorized:false,
			url: 'https://72e460c4.problems.sphere-engine.com/api/v3/test',
			method: 'GET',
			header:{
				'Content-Type': 'application/json'
			},
			qs:{
				access_token:my_access_token
			}
		}, function(err,response, body){
			console.log(err);
			console.log(response.statusCode);
			console.log(body);
		});
}


// List languages: returns object
function listLang(callback){
	request.get({
			url: 'https://api.compilers.sphere-engine.com/api/v3/languages',
			qs:{
				access_token:'af547f9885290485d2e8a2dc579de3d0'
			}
		}, function(err,response, body){
			// console.log(response.statusCode);
			// console.log(body);
			if(response.statusCode >= 200 && response.statusCode < 400 && callback)
				callback(body);
	});
}
// Submit Code: callback an id
function submitCode(mylanguage, mysourceCode, myinput, callback){
	request.post({
			url: 'https://api.compilers.sphere-engine.com/api/v3/submissions',
			qs:{
				access_token:'af547f9885290485d2e8a2dc579de3d0'
			},
			form:{
				sourceCode: mysourceCode,
				language: mylanguage,
				input: myinput
			}
		}, function(err,response, body){
			if(err) console.log("ERR SUBMIT");
			console.log(response.statusCode);
			var id = JSON.parse(body).id;
			console.log(id);
	});
}
// Check Status: callback an object of status
function checkStatus(myid, callback){
	request.get({
			url: 'https://api.compilers.sphere-engine.com/api/v3/submissions/'+myid,
			qs:{
				access_token:'af547f9885290485d2e8a2dc579de3d0',
				id:myid,
				withSource:true,
				withInput:true,
				withOutput:true,
				witStderr: true,
				withCmpinfo: true
			}
		}, function(err,response, body){
			if(err) console.log("ERR STATUS");
			console.log(response.statusCode);
			var info = JSON.parse(body);
			console.log(info);
			if(callback)
				callback(info);
	});
}

// Create Problem
function createProblem(id, name, callback){
	request.post({
		rejectUnauthorized:false,
		url: 'https://72e460c4.problems.sphere-engine.com/api/v3/problems',
		qs:{
			access_token:my_access_token
		},
		form:{
			code: id,
			name: name,
			masterjudgeId: 1000
		}
	}, function(err, response, body){
		if(err) console.log('ERR CREATE PROBLEM');
		else{
			console.log(response.statusCode);
			// Return the problem id
			if(response.statusCode >= 200 && response.statusCode < 400 && callback){
				callback(body);
			}
			else if(response.statusCode == 400)
				callback(400);
		}
	});
}
function createTestCases(id, input, output, callback){
	request.post({
		rejectUnauthorized:false,
		url: 'https://72e460c4.problems.sphere-engine.com/api/v3/problems/'+id+'/testcases',
		qs:{
			access_token:my_access_token
		},
		form:{
			input: input,
			output: output
		}
	}, function(err, response, body){
		if(err) console.log('ERR CREATE TESTCASE');
		else{
			console.log(response.statusCode);
			// Return the test case number
			if(response.statusCode >= 200 && response.statusCode < 400 && callback){
				callback(body);
			}
		}
	});
}
function showTestCase(id, number, callback){
	request.get({
		rejectUnauthorized:false,
		url: 'https://72e460c4.problems.sphere-engine.com/api/v3/problems/'+id+'/testcases/'+number,
		qs:{
			access_token:my_access_token
		},
	}, function(err, response, body){
		if(err) console.log('ERR SHOW TESTCASE');
		else{
			//console.log(body);
			if(response.statusCode >= 200 && response.statusCode < 400 && callback){
				callback(body);
			}
		}
	});
}
function showAllCases(id, callback){
	request.get({
		rejectUnauthorized:false,
		url: 'https://72e460c4.problems.sphere-engine.com/api/v3/problems/'+id+'/testcases',
		qs:{
			access_token:my_access_token
		},
	}, function(err, response, body){
		if(err) console.log('ERR SHOW ALL TESTCASES');
		else{
			//console.log(body);
			if(response.statusCode >= 200 && response.statusCode < 400 && callback){
				callback(body);
			}
		}
	});
}
function submitSolution(problem_id, compiler_id, code, callback){
	request.post({
		rejectUnauthorized:false,
		url: 'https://72e460c4.problems.sphere-engine.com/api/v3/submissions',
		qs:{
			access_token:my_access_token
		},
		form:{
			problemCode: problem_id,
			compilerId: compiler_id,
			source: code,
		}
	}, function(err, response, body){
		if(err) console.log('ERR SUBMIT SOLUTION');
		else{
			// Return the submission id (int)
			if(response.statusCode >= 200 && response.statusCode < 400 && callback){
				callback(body);
			}
		}
	});
}
function submissionStatus(submission_id, callback){
	request.get({
		rejectUnauthorized:false,
		url: 'https://72e460c4.problems.sphere-engine.com/api/v3/submissions/'+submission_id,
		qs:{
			access_token:my_access_token,
			id: submission_id
		}
	}, function(err, response, body){
		if(err){
			console.log('ERR SUBMISSION TRACK');
			console.log(err);
		}
		else{
			// Return the status
			if(response.statusCode >= 200 && response.statusCode < 400 && callback){
				callback(body);
			}
		}
	});
}
// var testCode = "#include <stdio.h> \n int main(){ printf(\"Hello!\"); return 0; }";
// createProblem('AAAA','a+b');
// createTestCases('SUPR', 'testinput 1','testoutput 1', function(body){

// });
// showTestCases('SUPR', 0, function(body){

// });
module.exports.testPro = testPro;
module.exports.createProblem = createProblem;
module.exports.createTestCases = createTestCases;
module.exports.showAllCases = showAllCases;
module.exports.showTestCase = showTestCase;
module.exports.my_access_token = my_access_token;
module.exports.listLang = listLang;
module.exports.submitSolution = submitSolution;
module.exports.submissionStatus = submissionStatus;


