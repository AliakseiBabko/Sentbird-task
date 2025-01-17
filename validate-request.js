import { buildSchema, validate } from 'graphql';
import * as fs from 'fs';

// Load your local GraphQL schema
const schemaJSON = fs.readFileSync('./graphql-schema.json', 'utf-8');
const schema = buildSchema(schemaJSON);

// Example query to validate (use the query from your test)
const query = `
query Cart($input: CartOptionsInput!) {
  currentUser {
    data {
      cart(input: $input) {
        products {
          id
          uid
          quantity
          price
          product {
            id
            name
            price
            image
          }
        }
        discounts {
          label
          amount
        }
        subTotal
        total
      }
    }
  }
}
`;

// Validate the query against the schema
const errors = validate(schema, query);
if (errors.length > 0) {
  console.log('Query is invalid:', errors);
} else {
  console.log('Query is valid!');
}