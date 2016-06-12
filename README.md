# OneButton

OneButton is a one-click solution for ipa to finish all hackathon duties at once. Some features are mentioned in [hackpad]( https://g0v.hackpad.com/%25E7%25AC%25AC%25E5%25A3%25B9%25E6%25AC%25A1%25E5%259F%25BA%25E7%25A4%258E%25E6%259D%25BE#-2016612).

* `brew install phantomjs`
* `npm install -g casperjs`
* update config.js

You can fork and create event manually now:

*  `casperjs --ignore-ssl-errors=yes --ssl-protocol=tlsv1 --slug="EVENT_SLUG" --name="EVENT_NAME" --start_at="2016/06/24 09:00" --end_at="2016/06/24 18:00" js/kktix.js`

Or run `node js/input.js` to create event in CUI.
