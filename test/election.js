var Election = artifacts.require("./Election.sol");


contract("Election", function (accounts) {
	it("initializes with two candidates", function(){
		return Election.deployed().then(function (instance) {
			return instance.candidatesCount();
		}).then(function(count){
			assert.equal(count, 2);
		});
	});
	it("allows a voter to cast a vote ",function(){
		return Election.deployed().then(function (instance){
			electionInstance = instance;
			candidateId = 1;
			return electionInstance.vote(candidateId, {from : accounts[0]});
		}).then(function(receipt){
			return electionInstance.voters(accounts[0]);
		}).then(function (voted){
			assert(voted, "the voter was marked as voted");
			return electionInstance.candidates(candidateId);
		}).then(function(candidate){
			var voteCount = candidate[2];
			assert.equal(voteCount, 1, "increament successfully .");
		});

	});

});