"use strict";

const fs = require("fs");
const htmlparser = require("htmlparser2");

const loadRules = (path) => {
	const contents = fs.readFileSync(path);
	return JSON.parse(contents);
};

const parseHtmlTags = (path) => {
	const data = fs.readFileSync(path);
	const tags = [];
	const parser = new htmlparser.Parser({
		onopentag: (name, attrs) => {
			tags.push({
				name: name,
				attrs: attrs
			});
		}
	}, {decodeEntities: true});
	parser.write(data);
	parser.end();
	return tags;
};

exports.loadRules = loadRules;
exports.parseHtmlTags = parseHtmlTags;