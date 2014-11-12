var expect   = require("chai").expect
  , util = require("util")
  , Configuration = require("../");


describe('Testing Configuration', function() {
  
  describe('Exposure', function() {

    it("Should export a Configuration constructor", function ( done ) {
      expect( Configuration ).to.be.a("function");
      done();
    });

    it ("Should expose fromFiles function", function (done) {
      expect(Configuration.fromFiles).to.be.a("function");
      done();
    });

    it ("Should expose acceptedFiles object", function (done) {
      expect(Configuration.acceptedFiles).to.be.an("object");
      done();
    });

    it("Expect instance to have \"constructor, get, set, load\" properties", function ( done ) {
      
      [ 'constructor', 'get', 'set', 'load' ].forEach( function( expectedProp ) {
        expect( this ).to.have.property(expectedProp);
      }, new Configuration());
      
      done();
    });

  });


  describe('Behaviour', function() {

    it("Should load objects passed as arguments", function (done) {
      
      var inlineConfig = { "inlineConfig": "true" }
        , inlineConfig_2 = { "inlineConfig_2": "true" }
        , config = new Configuration( inlineConfig, inlineConfig_2 );


      expect( config.get("inlineConfig") ).to.equal("true");
      expect( config.get("inlineConfig_2") ).to.equal("true");
      
      done();
    });
    
    it ("Expected to load object from files", function ( done ) {
      
      var filename
        , filenames = Configuration.acceptedFiles
        , config = Configuration.prototype.load.apply( new Configuration(), Configuration.fromFiles( __dirname + "/configs/" ));
  
      for ( filename in filenames ) {
        if ( filenames.hasOwnProperty( filename ) ) {
  
          expect( config.get( filename ) ).to.equal("true");
        }
      }
      
      done();
    });
    
    it ("Expected to set/get values in namespace::test::name", function ( done ) {
      
      var config = new Configuration()
        , value = 1
        , path = "namespace::test::name";
        
      
        expect(config.get(path)).to.be.undefined;
        expect(config.set(path, value)).to.equal(value);
        expect(config.get(path)).to.equal(value);
        
      done();
    });
    
  });
  
});