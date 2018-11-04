"use strict";

const _ = require("lodash");
const sprintf = require("sprintf-js").sprintf;

const format_miss_tags = (rule) => {
	if (rule.hasOwnProperty("attribute")) {
		const list = _.map(rule.attribute, (v, k) => {
			return sprintf("(%s => %s)", k, v);
		});
		return sprintf("Tag '%s' misses attributes %s.\n", rule.tag, list);
	} else {
		return sprintf("Tag '%s' is missed.\n", rule.tag);
	}
};

const format_miss_attribute = (rule) => {
	return sprintf("Tag '%s' misses attribute '%s'.\n", 
		rule.tag, rule.attribute);
};

const format_exceed_size = (rule) => {
	return sprintf("The number of '%s' is more than %d.\n", 
		rule.tag, rule.size); 
};

const isMissAttribute = (tags, rule) => {
	return _.filter(tags, (t) => {
		return t.name === rule.tag && !_.has(t.attrs, rule.attribute);
	}).length > 0;
};

const isExceedTagLimit = (tags, rule) => {
	return _.filter(tags, (t) => {
		return t.name === rule.tag;
	}).length > rule.size;
};

const hasTag = (tags, rule) => {
	return _.filter(tags, (t) => {
		return t.name === rule.tag;
	}).length > 0;
};

const checkTagAttribute = (tag, attribute) => {
	return _.filter(attribute, (value, key) => {
		return _.has(tag.attrs, key) && _.includes(tag.attrs, value);
	}).length > 0;
};

const hasProperty = (tags, rule) => {
	if (!rule.hasOwnProperty("attribute")) {
		throw new Error(rule.tag + " doesn't have The attribute definition");
	}
	
	return _.filter(tags, (t) => {
		return t.name === rule.tag && checkTagAttribute(t, rule.attribute);
	}).length > 0;
};

const seoAnalysis = (rules, tags) => {	
	let result = "";
	_.forEach(rules, rule => {
		const type = rule.type;
		const rule_data = rule.data;
		switch (type) {
		case "requires":
			if (isMissAttribute(tags, rule_data)) {
				result += format_miss_attribute(rule_data);
			}
			break;
		case "has-tag":
			if (!hasTag(tags, rule_data)) {
				result += format_miss_tags(rule_data);
			}
			break;
		case "has-attribute":
			if (!hasProperty(tags, rule_data)) {
				result += format_miss_tags(rule_data);
			}
			break;
		case "at-most":
			if (isExceedTagLimit(tags, rule_data)) {
				result += format_exceed_size(rule_data);
			}
			break;
		default:
		}
	});
	return result;
};

exports.seoAnalysis = seoAnalysis;
