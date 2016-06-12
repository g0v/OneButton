# OneButton

* `brew install phantomjs`
* `npm install -g casperjs`
* update config.js

You can fork and create event manually now:

*  `casperjs --ignore-ssl-errors=yes --ssl-protocol=tlsv1 --slug="EVENT_SLUG" --name="EVENT_NAME" --start_at="2016/06/24 09:00" --end_at="2016/06/24 18:00" js/kktix.js`

Or run `node js/input.js` to create event in CUI.
