import {
  ApiError,
  Client,
  CreateBookingRequest,
  CreateCustomerRequest,
  Customer,
  Environment,
  SearchAvailabilityRequest,
} from "square";
import { env } from "./env";

class SquareAPIControl {
  client: Client;
  jodiTeamMemberId = "TMS7VmtQCPHZ_lw7";

  constructor() {
    this.client = new Client({
      timeout: 100000,
      environment: Environment.Production,
      accessToken: env.SQUARE_ACCESS_TOKEN,
    });

    // Unique key to ensure this operation runs only once if you need to retry
  }

  // Call the API from within an async function
  async createCustomer(request: CreateCustomerRequest) {
    // Use a try/catch statement to check if the response succeeded or failed
    try {
      const { result } = await this.client.customersApi.createCustomer(request);
      return result.customer;
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
  async retrieveCustomer(customerId: string): Promise<Customer | undefined> {
    try {
      let { result } = await this.client.customersApi.retrieveCustomer(
        customerId
      );
      console.log("API called successfully. Returned data: ", result);
      return result.customer ?? undefined;
    } catch (error) {
      if (error instanceof ApiError) {
        throw Error(`Errors: ${error.errors}`);
      } else {
        throw Error(`Unexpected Error: ${error}`);
      }
    }
  }

  // catalog
  async listCatalog() {
    try {
      const { result } = await this.client.catalogApi.listCatalog();
      console.log("API called successfully. Returned data: ", result);
      console.log(result.objects);
      return result.objects ?? [];
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
      console.log("API called successfully. Returned data: ", result);
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
  async newBooking(req: CreateBookingRequest) {
    try {
      const { result } = await this.client.bookingsApi.createBooking(req);
      console.log("API called successfully. Returned data: ", result);
      return result.booking;
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
