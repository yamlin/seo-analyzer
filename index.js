"use strict";

const utils = require("./libs/utils");
const seo_analyzer = require("./libs/seo_analyzer");
const fs = require("fs");

const seoAnalyze = (htmlPath, rulePath, outPath) => {
	const rules = utils.loadRules(rulePath);
	const tags = utils.parseHtmlTags(htmlPath);

	const result = seo_analyzer.seoAnalysis(rules.rules, tags);
	fs.writeFileSync(outPath, result);
}; 

exports.seoAnalyze = seoAnalyze;