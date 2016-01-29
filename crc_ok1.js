function CRC16func(AllDATA) {
	var cnCRC_CCITT = 0x1021;
	var i = -1,
		j = -1;
	var nData = -1,
		nAccum = -1,
		nYAccum = -1;
	var Table_CRC = [];
	var aSize = AllDATA.length;
	for (i = 0; i  <  256; i++) {
		nData = C16func.call(this, i, 8); 
		nAccum = 0;
		for (j = 0; j  <  8; j++) { 
			if ((nData ^ nAccum) & 0x8000) { 
				nAccum = C16func.call(this, nAccum, 1); 
				nAccum = nAccum ^ cnCRC_CCITT; 
			} else { 
				nAccum = C16func.call(this, nAccum, 1); 
				nAccum = nAccum;
			}
			nData = C16func.call(this, nData, 1); 
		}
		Table_CRC[i] = nAccum;
	} 
	nAccum = 0;
	for (i = 0; i  <  aSize; i++) { 
		nYAccum = nAccum; 
		nAccum = C16func.call(this, nAccum, 8); 
		nAccum = nAccum ^ Table_CRC[(nYAccum  >>> 8) ^ (AllDATA[i])];//数组
		// nAccum = nAccum ^ Table_CRC[(nYAccum  >>> 8) ^ (AllDATA.charCodeAt(i))];//字符串
	} 
	return  nAccum.toString(16).toUpperCase();
}

function  C16func(cData, cLen) { 
	if (((cData  <<  cLen).toString(2).length  >  16) && (cData.toString(2).length  <=  16)) { 
		cData = (cData  <<  cLen).toString(2).substr((cData  <<  cLen).toString(2).length - 16, 16); 
		cData = parseInt(cData, 2);
	} else { 
		cData = cData  <<  cLen;
	}
	return  cData; 
}

var data = [0x7E, 0x00, 0x05, 0x60, 0x31, 0x32, 0x33];
console.log(CRC16func(data));

// console.log(CRC16func('test'));