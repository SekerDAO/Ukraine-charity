var fs = require('fs');

for(var i=0; i<=11; i++) {
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
	    "image": "https://gateway.pinata.cloud/ipfs/QmVzFagN1c27pHiqce3XPpvpex3fKsEheQpcLQ5pruXBqM"
	}

	var dictstring = JSON.stringify(dict);
	fs.writeFileSync(process.cwd()+"/metadata/"+i, dictstring);
}
