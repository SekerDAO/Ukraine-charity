var fs = require('fs');

for(var i=0; i<=10000; i++) {
	var dict = {
	    "name": "Seeds",
	    "description": "Test Desc",
	    "attributes": [
	        {
	            "trait_type": "Artist",
	            "value": "Sasha Ivanov"
	        },
	        {
	            "trait_type": "Edition Number",
	            "value": i.toString()
	        }
	    ],
	    "image": "https://gateway.pinata.cloud/ipfs/QmPXED9pDo8dh7Y2CyKdRNtw3oRYebZLCNurK7wEwRez6c"
	}

	var dictstring = JSON.stringify(dict);
	fs.writeFileSync(process.cwd()+"/metadata/"+i, dictstring);
}
