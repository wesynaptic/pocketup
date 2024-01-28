import * as dotenv from 'dotenv';

import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';

dotenv.config();

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
        console.log(collections);
        generateFiles(collections);

    } catch (error) {
        console.error('Error fetching collections:', error);
    }
};

function generateFiles(data: object) {
    // Register a helper function for the 'startsWith' conditional
    Handlebars.registerHelper('startsWith', (value, prefix) => value.startsWith(prefix));

    // Read the template file
    const templateSource = fs.readFileSync(path.join(__dirname, 'templates', 'menubar.hbs'), 'utf8');
    const template = Handlebars.compile(templateSource);

    // Generate the navbar component
    const navbarComponent = template(data);

    // Write to a file
    fs.writeFileSync(path.join(__dirname, 'app', 'menubar.tsx'), navbarComponent);
}

postAuth();
