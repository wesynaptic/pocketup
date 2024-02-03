import * as dotenv from 'dotenv';

import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';

dotenv.config();

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

const postAuth = async () => {
    const authEndpoint = 'http://localhost:8090/api/admins/auth-with-password';
    const authData = {
        identity: process.env.IDENTITY,
        password: process.env.PASSWORD
    };

    try {
        const response = await fetch(authEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(authData)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        const token = data.token;

        await getCollections(token);

    } catch (error) {
        console.error('Error during authentication:', error);
    }
};

const getCollections = async (token: string) => {
    const collectionsEndpoint = 'http://localhost:8090/api/collections?page=1&perPage=100&skipTotal=1&sort=updated';

    try {
        const response = await fetch(collectionsEndpoint, {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const collections = await response.json();
        generateFiles(collections);

    } catch (error) {
        console.error('Error fetching collections:', error);
    }
};

function generateFiles(data) {
    // Register a helper function for the 'startsWith' conditional
    Handlebars.registerHelper('startsWith', (value, prefix) => value.startsWith(prefix));

    // Read the template file
    const templateSource = fs.readFileSync(path.join(__dirname, 'templates', 'menubar.hbs'), 'utf8');
    const template = Handlebars.compile(templateSource);

    // Generate the navbar component
    const navbarComponent = template(data);
    const collections = data.items.filter(collection => !collection.id.startsWith('_pb_'));

    collections.forEach(collection => {
        const dirPath = path.join(__dirname, 'app', collection.name);

        // Check if the directory already exists to avoid overwriting it
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
            console.log(`Directory created: ${dirPath}`);
        }
        const pageTemplateSrc = fs.readFileSync(path.join(__dirname, 'templates', 'page.hbs'), 'utf8');
        const pageTemplate = Handlebars.compile(pageTemplateSrc);
        const pageComponent = pageTemplate(collection);
        fs.writeFileSync(path.join(dirPath, 'page.tsx'), pageComponent);

    })
    // Write to a file
    fs.writeFileSync(path.join(__dirname, 'app', 'menubar.tsx'), navbarComponent);
}

postAuth();
