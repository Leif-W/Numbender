'use strict';

const fs = require('fs');
const https = require('https');

const fileName = '.gitignore';

const headerText = `\
# AUTO GENERATED FILE - DO NOT EDIT

# Edit the \`# Custom Rules\` section near the end of the file \`util/gitignore.js\`.
# Then rebuild this \`.gitignore\` file with \`node util/gitignore.js\`.

# Auto generated from Toptal's https://gitignore.io/
`;

const bodyUrl = 'https://www.toptal.com/developers/gitignore/api/' + [
	'android',
	'AndroidStudio',
	'CocoaPods',
	'dotenv',
	'firebase',
	'linux',
	'macos',
	'node',
	'notepadpp',
	'react',
	'ReactNative',
	'vim',
	'visualstudio',
	'visualstudiocode',
	'windows',
	'xcode',
	'yarn',
	'zsh',
].join(',');

const footerText = `
# Custom Rules

# .env
.env*
!.env*.example

# Prettier
**prettier*

# Expo
web-build/

# Bundle artifacts
*.jsbundle

# MacOS Icon - Workarounds
Icon\r?
Icon\xEF\x80\x8D\xEF\x80\x8D

# Xcode
*.hmap
*.ipa
*.xcuserstate
project.xcworkspace

# CocoaPods
/ios/Pods/
`;

https.get(bodyUrl, (res) => {
	let bodyText = '';

	res.on('error', (err) => {
		console.error('util/gitignore.js - https.get - res - error: ', err.message);
	});

	res.on('data', (data) => {
		bodyText += data;
	});

	res.on('end', () => {
		fs.writeFileSync(fileName, headerText + bodyText + footerText, 'latin1');
		console.log('util/gitignore.js - https.get ok - written: ' + fileName);
	});
}).on('error', (err) => {
	console.error('util/gitignore.js - https.get - error: ', err.message);
});
