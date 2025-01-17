import { test } from '@playwright/test';
import fs from 'fs'; // Import the fs module to write to a file

test('GraphQL introspection', async ({ request }) => {
  const introspectionQuery = `{
    __schema {
      types {
        name
        kind
        fields {
          name
          type {
            name
            kind
          }
        }
      }
    }
  }`;

  const response = await request.post('https://api.scentbird.com/graphql', {
    data: { query: introspectionQuery },
  });

  const schema = await response.json();

  // Save the schema result to a file
  fs.writeFileSync('graphql-schema.json', JSON.stringify(schema, null, 2));
  console.log(JSON.stringify(schema));

  console.log('Schema saved to graphql-schema.json');
});
