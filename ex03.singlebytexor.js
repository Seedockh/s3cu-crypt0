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

function hex_to_ascii(str1) {
	var hex = str1.toString();
	var str = '';
	for (var n = 0; n < hex.length; n += 2) {
		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	}
	return str;
}

function dec2bin(dec) {
	return (parseInt(dec, 10).toString(2)).padStart(8, '0');
}

function xorBin(bin1 = "", bin2 = "") {
	if (bin1.length !== bin2.length) return null;

	let res = "";
	for (let i = 0; i < bin1.length; i++) {
		res += bin1[i] ^ bin2[i];
	}
	return res;
}

function getStringScore(value = "") {
	const character_frequencies = {
		'a': .08167, 'b': .01492, 'c': .02782, 'd': .04253,
		'e': .12702, 'f': .02228, 'g': .02015, 'h': .06094,
		'i': .06094, 'j': .00153, 'k': .00772, 'l': .04025,
		'm': .02406, 'n': .06749, 'o': .07507, 'p': .01929,
		'q': .00095, 'r': .05987, 's': .06327, 't': .09056,
		'u': .02758, 'v': .00978, 'w': .02360, 'x': .00150,
		'y': .01974, 'z': .00074, ' ': .13000
	}

	let score = 0;

	for (const char of value) {
		if (character_frequencies[char]) {
			score += character_frequencies[char];
		}
	}
	return score;
}

const hexString = "1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736";
const hexLenthInByte = hexString.length / 2;

const binText = hexStringToBin(hexString);

let prevScore = 0;
let prevKey = 0;
let prevMessage = 0;
for (let i = 0; i < 256; i++) {
	const binIndex = new Array(hexLenthInByte).fill(dec2bin(i)).join("");

	const binRes = xorBin(binText, binIndex);

	const hexRes = binStringToHex(binRes);

	const asciiRes = hex_to_ascii(hexRes);

	const currentScore = getStringScore(asciiRes);

	if (prevScore < currentScore) {
		prevScore = currentScore;
		prevKey = i;
		prevMessage = asciiRes;
	}
}
console.log("key: " + prevKey, "message: " + prevMessage);

// console.log(hex_to_ascii("1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736"));