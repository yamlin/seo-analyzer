"user strict";

const assert = require("assert");
const fs = require("fs");
const utils = require("../libs/utils");
const seo = require("../libs/seo_analyzer");
const test = require('../index');

describe("Utils", () => {
  	describe("Parse HtmlTags", () => {
      	it("should correctly parse the html files", () => {
        	const tags = utils.parseHtmlTags("test/test_files/simple.html");
        	const expectedTags = ["html", "body"];
    		assert.equal(tags.length, 2);
    		for (let i = 0; i < tags.length; i++) {
        		assert(tags[i].name === expectedTags[i]);
        	}
        });
    });

    describe("Parse Rule", () => {
        it("should parse the rule files", () => {
            const rules = utils.loadRules("test/test_files/test_rules.json");
            const expectedRules = ["test1", "test2"];
            assert.equal(rules.rules.length, 2);
            for (let i = 0; i < rules.rules.length; i++) {
                assert(rules.rules[i].type === expectedRules[i]);
            }
        })
    })
});

describe("SEO Analysis", () => {
    describe("Format miss tags", () => {
        it("should correctly analyze the SEO rule", () => {
            const rules = utils.loadRules("rule/rule1.json");
            const tags = utils.parseHtmlTags("test/test_files/test1.html");
            const expect = fs.readFileSync("test/test_files/expect_result1", "utf8");
            const result = seo.seoAnalysis(rules.rules, tags);
            assert(result === expect);
        })
    })
});

describe("Index", () => {
    describe("Test rules from files", () => {
        it("should output files", () => {
            const rand = Math.random().toString(36).substring(2, 15);
            const outPath = "/tmp/test" + rand;
            test.seoAnalyze("./test/test_files/test1.html",
                 "./rule/rule1.json",
                 outPath);            
            assert(fs.existsSync(outPath));
            const expect = fs.readFileSync("test/test_files/expect_result1", "utf8");
            const output = fs.readFileSync(outPath, "utf8");
            
            assert(output === expect);

            // remove the test file
            fs.unlinkSync(outPath);
        })
    })
})