import * as dotenv from 'dotenv';
import fs from 'fs/promises'; // Use the promise-based version of the fs module
import path from 'path';
import Handlebars from 'handlebars';
import fetch from 'node-fetch'; // Ensure fetch is available in a Node.js environment

// Initialize Handlebars helpers
const initHandlebars = () => {
  Handlebars.registerHelper('capitalize', str => str && str.charAt(0).toUpperCase() + str.slice(1));
  Handlebars.registerHelper('ifCond', function(v1, operator, v2, options) {
    if (operator === '===' && v1 === v2) {
      return options.fn(this);
    }
    return options.inverse(this);
  });
};

// Load and compile Handlebars template
const loadTemplate = async (templateName: string) => {
  const templateSource = await fs.readFile(path.join(__dirname, 'templates', `${templateName}.hbs`), 'utf8');
  return Handlebars.compile(templateSource);
};

// Authentication and fetching collections
const postAuth = async () => {
  const authEndpoint = `${process.env.API_BASE_URL}/api/admins/auth-with-password`;
  const authData = {
    identity: process.env.IDENTITY,
    password: process.env.PASSWORD,
  };

  try {
    const response = await fetch(authEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(authData),
    });

    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const { token } = await response.json();
    return token;
  } catch (error) {
    console.error('Error during authentication:', error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

const getCollections = async (token: string) => {
  const collectionsEndpoint = `${process.env.API_BASE_URL}/api/collections?page=1&perPage=100&skipTotal=1&sort=updated`;
  try {
    const response = await fetch(collectionsEndpoint, {
      method: 'GET',
      headers: { 'Authorization': token },
    });

    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching collections:', error);
    throw error; // Allows for further handling outside
  }
};

// Generate files for each collection
const generateFiles = async (collections: any) => {

  const pageTemplate = await loadTemplate('page');
  const tableTemplate = await loadTemplate('table');
  const menubarTemplate = await loadTemplate('menubar');

  const nonSystemCollections = collections.items.filter(collection => !collection.id.startsWith('_pb_'));

  for (const collection of nonSystemCollections) {
    const dirPath = path.join(__dirname, 'app', collection.name);
    await fs.mkdir(dirPath, { recursive: true });

    const pageComponent = pageTemplate(collection);
    await fs.writeFile(path.join(dirPath, 'page.tsx'), pageComponent);

    const tableComponent = tableTemplate(collection);
    await fs.writeFile(path.join(dirPath, 'table.tsx'), tableComponent);
  }

  const menubarComponent = menubarTemplate({items: nonSystemCollections});
  await fs.writeFile(path.join(__dirname, 'app', 'menubar.tsx'), menubarComponent);

};

// Main function to control the flow
const main = async () => {
  try {
    dotenv.config();
    initHandlebars();
    const token = await postAuth();
    const collections = await getCollections(token);
    await generateFiles(collections);
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

main();
