configurationjs
===============

Configuration manager for your node apps


<h2>Install</h2>
```ShellSession
npm install --save configurationjs
```



<h2>Setup</h2>

<h3>Basic</h3>
Instantiate an empty configuration object.
<h4>Usage</h4>
```JavaScript
var Configuration = require("configurationjs")
	, config;
	
config = new Configuration();
```

<h3>Preloaded values</h3>
Creating a new configuration that absorbs multiple objects by passing them has argument of the constructor

<h4>Usage</h4>
```JavaScript
var Configuration = require("configurationjs")
	, config;
	
config = new Configuration( { "hostname": 127.0.0.1, "port": 80 }, { "databaseLogin": "something" } );
```

<h3>Load from files</h3>
Load configurations from the filesystem.
By default it searches for package.json, config.json and config.js

<h4>Usage</h4>
```JavaScript
var Configuration = require("configurationjs")
	, config;
	
config = new Configuration();
config.load( Configuration.fromFiles( __dirname ) );
```

<h4>Defining other files</h4>
You may load other files and even with different extentions by adding the filename and respective parser to
the Configuration's acceptedFiles property.

<h5>Usage</h5>
```JavaScript
var Configuration = require("configurationjs")
	, config;
	
config = new Configuration();

/* Parser function should respect such arguments, the file's content is accessible by the data variable,
	the parsed content should be passed to the callback( err, object ) function.
**/
Configuration.acceptedFiles = {

	"config.xml": function ( data, callback ) {
	
	/* some parsing madness… */
	
		if (err) {
			callback(err);
		} else {
			callback( void 0, object );
		}
	}
	
}
config.load( Configuration.fromFiles( __dirname ) );
```

<h2>Setting and accessing values</h2>
Instead of using the usual dot notation (which is still possible to be used) we access values by their namespace like _root::config::key_.

<h3>Setting a value</h3>
Use the *set* property function to set the value on the specified object.

<h4>Usage</h4>
```JavaScript
var Configuration = require("configurationjs")
	config;
	
config = new Configuration( settings );

value = config.set( "books::helloworld", "Hello world" );
```

<h3>Accessing a value</h3>
Use the *get* property function to access the value on specified path.

<h4>Usage</h4>
```JavaScript
var Configuration = require("configurationjs")
	, settings = { 
		"root": {
			"config": {
				"key": "nugget";
			}
		}
	}
	, config, value, itsTrue;
	
config = new Configuration( settings );

value = config.get("root::config::key");

itsTrue = ( value === config.root.config.key );
```
