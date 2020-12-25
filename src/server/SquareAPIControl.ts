import {
  ApiError,
  Client,
  CreateCustomerRequest,
  Customer,
  Environment,
  ListCustomersRequest,
} from "square";

class SquareAPIControl {
  client: Client;
  idempotencyKey = "unique_key";

  constructor() {
    this.client = new Client({
      timeout: 3000,
      environment: Environment.Sandbox,
      accessToken: process.env.SQUARE_ACCESS_TOKEN,
    });

    // Unique key to ensure this operation runs only once if you need to retry
  }

  // Call the API from within an async function
  async createCustomer(
    request: CreateCustomerRequest = {
      idempotencyKey: this.idempotencyKey, // Parameters use camel case
      givenName: "Amelia",
      familyName: "Earhart",
      emailAddress: "Amelia.Earhart@aviators.com",
    }
  ) {
    // Use a try/catch statement to check if the response succeeded or failed
    try {
      let { result } = await this.client.customersApi.createCustomer(request);
      console.log("API called successfully. Returned data: ", result);
    } catch (error) {
      if (error instanceof ApiError) {
        console.log("Errors: ", error.errors);
      } else {
        console.log("Unexpected Error: ", error);
      }
    }
  }

  async listCustomers(): Promise<Customer[]> {
    try {
      let { result } = await this.client.customersApi.listCustomers();
      console.log("API called successfully. Returned data: ", result);
      return result.customers ?? [];
    } catch (error) {
      if (error instanceof ApiError) {
        throw Error(`Errors: ${error.errors}`);
      } else {
        throw Error(`Unexpected Error: ${error}`);
      }
    }
  }
}

export default SquareAPIControl;
