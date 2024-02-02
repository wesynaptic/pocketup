import * as dotenv from 'dotenv';

import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';

// Helper to capitalize field names
Handlebars.registerHelper('capitalize', (str) => str && str.charAt(0).toUpperCase() + str.slice(1));

// Helper for conditional logic
Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
  switch (operator) {
    case '===':
      return (v1 === v2) ? options.fn(this) : options.inverse(this);
    // Add other operators as needed
    default:
      return options.inverse(this);
  }
});

const templateSource = fs.readFileSync(path.join(__dirname, 'templates', 'table.hbs'), 'utf8');
const template = Handlebars.compile(templateSource);

const data = {
  name: 'Opala',
  schema: [
        {
            "system": false,
            "id": "nzjerais",
            "name": "text_field",
            "type": "text",
            "required": false,
            "presentable": false,
            "unique": false,
            "options": {
                "min": null,
                "max": null,
                "pattern": ""
            }
        },
        {
            "system": false,
            "id": "oad2vbfm",
            "name": "number_field",
            "type": "number",
            "required": false,
            "presentable": false,
            "unique": false,
            "options": {
                "min": null,
                "max": null,
                "noDecimal": false
            }
        },
        {
            "system": false,
            "id": "rkdhsynh",
            "name": "boolean_field",
            "type": "bool",
            "required": false,
            "presentable": false,
            "unique": false,
            "options": {}
        },
        {
            "system": false,
            "id": "h51hvpjt",
            "name": "email_field",
            "type": "email",
            "required": false,
            "presentable": false,
            "unique": false,
            "options": {
                "exceptDomains": null,
                "onlyDomains": null
            }
        },
        {
            "system": false,
            "id": "9nfo473d",
            "name": "url_field",
            "type": "url",
            "required": false,
            "presentable": false,
            "unique": false,
            "options": {
                "exceptDomains": null,
                "onlyDomains": null
            }
        },
        {
            "system": false,
            "id": "nlzakewt",
            "name": "datetime_field",
            "type": "date",
            "required": false,
            "presentable": false,
            "unique": false,
            "options": {
                "min": "",
                "max": ""
            }
        },
        {
            "system": false,
            "id": "roeludrd",
            "name": "select_field",
            "type": "select",
            "required": false,
            "presentable": false,
            "unique": false,
            "options": {
                "maxSelect": 1,
                "values": [
                    "choice1",
                    "choice2",
                    "choice3"
                ]
            }
        },
        {
            "system": false,
            "id": "ol7ufgxj",
            "name": "relation_field",
            "type": "relation",
            "required": false,
            "presentable": false,
            "unique": false,
            "options": {
                "collectionId": "_pb_users_auth_",
                "cascadeDelete": false,
                "minSelect": null,
                "maxSelect": 1,
                "displayFields": null
            }
        }
    ]
}

const tableComponent = template(data);
console.log(tableComponent);
fs.writeFileSync(path.join(__dirname, 'app', 'table.tsx'), tableComponent);
