if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){
    describe("server initialization", function(){
      it("should have a Meteor version defined", function(){
        chai.assert(Meteor.release);
      });
    });
  });
}