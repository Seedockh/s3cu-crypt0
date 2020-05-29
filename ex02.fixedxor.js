function hex2bin(hex) {
	return (parseInt(hex, 16).toString(2)).padStart(8, '0');
}

function bin2hex(hex) {
	return (parseInt(hex, 2).toString(16)).padStart(2, '0');
}

function hexStringToBin(hexString = "") {
	if (hexString.length % 2 !== 0) return null;

	let res = "";
	for (let i = 0; i < hexString.length; i += 2) {
		res += hex2bin(hexString.substr(i, 2));
	}
	return res;
}

function binStringToHex(binString = "") {
	if (binString.length % 8 !== 0) return null;

	let res = "";
	for (let i = 0; i < binString.length; i += 8) {
		res += bin2hex(binString.substr(i, 8));
	}
	return res;
}

function xorBin(bin1 = "", bin2 = "") {
	if (bin1.length !== bin2.length) return null;

	let res = "";
	for (let i = 0; i < bin1.length; i++) {
		res += bin1[i] ^ bin2[i];
	}
	return res;
}

let bin1 = hexStringToBin("1c0111001f010100061a024b53535009181c");
let bin2 = hexStringToBin("686974207468652062756c6c277320657965");

// console.log("bin1", bin1);
// console.log("bin2", bin2);

let resBin = xorBin(bin1, bin2);

// console.log("resBin", resBin);

let res = binStringToHex(resBin);

console.log(res);
