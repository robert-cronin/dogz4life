import {
  ApiError,
  Client,
  CreateCustomerRequest,
  Customer,
  Environment,
  ObtainTokenRequest,
  ObtainTokenResponse,
} from "square";

class SquareAPIControl {
  client: Client;
  idempotencyKey = "unique_key";

  constructor() {
    this.client = new Client({
      timeout: 3000,
      environment: Environment.Production,
      accessToken: process.env.SQUARE_ACCESS_TOKEN,
    });

    // Unique key to ensure this operation runs only once if you need to retry
  }

  // async getAccessToken(code: string): Promise<ObtainTokenResponse> {
  //   const body: ObtainTokenRequest = {
  //     clientId: process.env.SQUARE_APPLICATION_ID,
  //     clientSecret: process.env.SQUARE_APPLICATION_SECRET,
  //     grantType: "authorization_code",
  //     code
  //   };

  //   try {
  //     const {
  //       result,
  //       ...httpResponse
  //     } = await this.client.oAuthApi.obtainToken(body);
  //     this.client.customersApi.(body);
  //     // Get more response info...
  //     const { statusCode, headers } = httpResponse;
  //     return result
  //   } catch (error) {
  //     if (error instanceof ApiError) {
  //       const errors = error.result;
  //       const { statusCode, headers } = error;
  //     }
  //   }
  // }

  // Call the API from within an async function
  async createCustomer(
    request: CreateCustomerRequest
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
