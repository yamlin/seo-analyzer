# SEO Analyzer
## A tool to scan a HTML file and show all of the SEO defects

### Install package
```javascript
npm install seo-analyzer 
```

### Define the rule
#### There 4 type rule:
- **requires**: Detect a tag attribute.
```json
{
      "type": "requires",
      "data": {
        "tag": "img",
        "attribute": "alt"
      }
}
```
- **has-tag**: Detect a tag.
```json
{
      "type": "has-tag",
      "data": {
        "tag": "title"
      }
    }
```
- **has-attribute**: Detect a attribute name-value pairs.
```json
{
      "type": "has-attribute",
      "data": {
        "tag": "meta",
        "attribute": {
          "name": "keywords"
        }
      }
    }
```
- **at-most**: Detect the number of tags.
```json
{
      "type": "at-most",
      "data": {
        "tag": "strong",
        "size": 2
      }
    }
```
**Example file**: ```rule/rule1.json```
```json
{
  "rules": [
    {
      "type": "requires",
      "data": {
        "tag": "img",
        "attribute": "alt"
      }
    },
    {
      "type": "requires",
      "data": {
        "tag": "a",
        "attribute": "rel"
      }
    },
    {
      "type": "has-tag",
      "data": {
        "tag": "title"
      }
    },
    {
      "type": "has-attribute",
      "data": {
        "tag": "meta",
        "attribute": {
          "name": "keywords"
        }
      }
    },
    {
      "type": "has-attribute",
      "data": {
        "tag": "meta",
        "attribute": {
          "name": "descriptions"
        }
      }
    },
    {
      "type": "at-most",
      "data": {
        "tag": "h1",
        "size": 1
      }
    },
    {
      "type": "at-most",
      "data": {
        "tag": "strong",
        "size": 2
      }
    }
  ]
}
```

### Useage
####Example

```js
const analyzer = require("seo-analyzer");
const htmlPath = "path-to-html";
const rulePath = "path-to-rule";
const outPath = "path-to-output";
analyzer.seoAnalyze(htmlPath, rulePath, outPath);
```
