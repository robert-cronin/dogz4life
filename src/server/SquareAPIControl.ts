import {
  ApiError,
  Client,
  CreateBookingRequest,
  CreateCustomerRequest,
  Customer,
  Environment,
  SearchAvailabilityRequest,
  SearchCustomersRequest,
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
      console.log("Error: createCustomer");
      if (error instanceof ApiError) {
        error.errors.forEach((e) => {
          console.log(e);
        });
      } else {
        console.log("Unexpected Error: ", error);
      }
    }
  }
  async searchCustomers(request: SearchCustomersRequest) {
    // Use a try/catch statement to check if the response succeeded or failed
    try {
      const { result } = await this.client.customersApi.searchCustomers(
        request
      );
      return result.customers ?? [];
    } catch (error) {
      console.log("Error: searchCustomers");
      if (error instanceof ApiError) {
        error.errors.forEach((e) => {
          console.log(e);
        });
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
      console.log("Error: listCustomers");
      if (error instanceof ApiError) {
        error.errors.forEach((e) => {
          console.log(e);
        });
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
      console.log("Error: retrieveCustomer");
      if (error instanceof ApiError) {
        error.errors.forEach((e) => {
          console.log(e);
        });
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
      console.log("Error: listCatalog");
      if (error instanceof ApiError) {
        error.errors.forEach((e) => {
          console.log(e);
        });
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
      console.log("Error: listBookingAvailability");
      if (error instanceof ApiError) {
        error.errors.forEach((e) => {
          console.log(e);
        });
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
      console.log("Error: newBooking");

      if (error instanceof ApiError) {
        error.errors.forEach((e) => {
          console.log(e);
        });
      } else {
        throw Error(`Unexpected Error: ${error}`);
      }
    }
  }
}

export default SquareAPIControl;
