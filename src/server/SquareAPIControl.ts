import {
  ApiError,
  Client,
  CreateCustomerRequest,
  Customer,
  Environment,
  SearchAvailabilityRequest,
} from "square";

class SquareAPIControl {
  client: Client;
  idempotencyKey = process.env.SQUARE_IDEMPOTENCY_KEY;

  constructor() {
    this.client = new Client({
      timeout: 100000,
      environment: Environment.Production,
      accessToken: process.env.SQUARE_ACCESS_TOKEN,
    });

    // Unique key to ensure this operation runs only once if you need to retry
  }

  // Call the API from within an async function
  async createCustomer(request: CreateCustomerRequest) {
    // Use a try/catch statement to check if the response succeeded or failed
    try {
      const { result } = await this.client.customersApi.createCustomer(request);
      return result;
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

  // catalog
  catalogCache?: any;
  async listCatalog() {
    if (this.catalogCache) {
      return this.catalogCache;
    }
    try {
      const { result } = await this.client.catalogApi.listCatalog();
      console.log("API called successfully. Returned data: ", result);
      console.log(result.objects);
      this.catalogCache = result.objects ?? [];
      return this.catalogCache;
    } catch (error) {
      if (error instanceof ApiError) {
        console.log(error.errors.forEach((e) => console.log(e)));

        throw Error(`Errors: ${error.errors}`);
      } else {
        throw Error(`Unexpected Error: ${error}`);
      }
    }
  }

  // booking
  async listBookingAvailability(req: SearchAvailabilityRequest) {
    try {
      const { result } = await this.client.bookingsApi.searchAvailability(req);
      if (result.errors) {
        throw result.errors;
      }
      console.log("API called successfully. Returned data: ", result);
      console.log(result.availabilities);
      return result.availabilities ?? [];
    } catch (error) {
      if (error instanceof ApiError) {
        console.log(error.errors.forEach((e) => console.log(e)));

        throw Error(`Errors: ${error.errors}`);
      } else {
        throw Error(`Unexpected Error: ${error}`);
      }
    }
  }
}

export default SquareAPIControl;
