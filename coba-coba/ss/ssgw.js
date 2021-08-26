

const screenshot = require('screenshot-desktop')

screenshot().then((img) => {
	  // img: Buffer filled with jpg goodness
	  // ...

}).catch((err) => {
	  // ...

})
