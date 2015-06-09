if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){
    describe("a group of tests", function(){
      it("should respect equality", function(){
        chai.assert.equal(5,5);
      });
    });

    describe("login as guest", function() {
    	it("login as guest and check default username", function() {
	    	$('#guest').click();
	    	setTimeout(function() {
					var defaultGuestName = $('#name.form-control').val();
	    		chai.assert(defaultGuestName == "Yoshi", "Default guest username is not Yoshi");
	    	}, 50);
    	});
    });
  });
}
