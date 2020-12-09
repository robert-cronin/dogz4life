import React from 'react'
import {
    SquarePaymentForm,
    CreditCardNumberInput,
    CreditCardExpirationDateInput,
    CreditCardPostalCodeInput,
    CreditCardCVVInput,
    CreditCardSubmitButton,
    ApplePayButton,
    GooglePayButton,
    MasterpassButton
} from 'react-square-payment-form'
import 'react-square-payment-form/lib/default.css'

const loadingView = <div className="sq-wallet-loading"></div>
const unavailableView = <div className="sq-wallet-unavailable">Unavailable</div>

interface PaymentFormProps {}
interface PaymentFormState {
    errorMessages: React.ReactNode[]
}

class PaymentForm extends React.Component<PaymentFormProps, PaymentFormState> {

    constructor(props: PaymentFormProps | Readonly<PaymentFormProps>) {
        super(props)
        this.state = {
            errorMessages: [],
        }
    }

    cardNonceResponseReceived = (errors: any[], nonce: string, cardData: any, buyerVerificationToken: string) => {
        if (errors) {
            this.setState({ errorMessages: errors.map((error: { message: any }) => error.message) })
            return
        }

        this.setState({ errorMessages: [] })
        alert("nonce created: " + nonce + ", buyerVerificationToken: " + buyerVerificationToken)
    }

    createVerificationDetails() {
        return {
            amount: '100.00',
            currencyCode: "USD",
            intent: "CHARGE",
            billingContact: {
                familyName: "Smith",
                givenName: "John",
                email: "jsmith@example.com",
                country: "GB",
                city: "London",
                addressLines: ["1235 Emperor's Gate"],
                postalCode: "SW7 4JA",
                phone: "020 7946 0532"
            }
        }
    }

    createPaymentRequest() {
        return {
            requestShippingAddress: true,
            requestBillingInfo: true,
            shippingContact: {
              familyName: "Buyer",
              givenName: "The",
              email: "thebuyer@example.com",
              country: "USA",
              region: "CA",
              city: "San Francisco",
              addressLines: [
                "123 Main St"
              ],
              postalCode: "94114"
            },
            currencyCode: "USD",
            countryCode: "US",
            total: {
              label: "devs-Acceptance",
              amount: "5",
              pending: false
            }
        };
      }

    render() {
        return (
            <div>
                <h1>Payment Page</h1>

                <SquarePaymentForm
                    formId={null}
                    apiWrapper={null}
                    sandbox={true}
                    // robert.cronin@uqconnect.edu.au developer ids
                    // applicationId={"sandbox-sq0idb-biDfHvQKMHE2wvX7Dsg0OA"}
                    // locationId={"L0H11MX840SX6"}
                    applicationId={"SANDBOX_APPLICATION_ID"}
                    locationId={"SANDBOX_LOCATION_ID"}
                    cardNonceResponseReceived={this.cardNonceResponseReceived}
                    createVerificationDetails={this.createVerificationDetails}
                    createPaymentRequest={this.createPaymentRequest}
                >
                    <ApplePayButton loadingView={loadingView} unavailableView={unavailableView} />
                    <GooglePayButton loadingView={loadingView} unavailableView={unavailableView} />
                    <MasterpassButton loadingView={loadingView} unavailableView={unavailableView} />
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}>
                        <hr />
                        <span>Or</span>
                        <hr />
                    </div>
                    <fieldset className="sq-fieldset">
                        <CreditCardNumberInput />
                        <div className="sq-form-third">
                            <CreditCardExpirationDateInput />
                        </div>

                        <div className="sq-form-third">
                            <CreditCardPostalCodeInput />
                        </div>

                        <div className="sq-form-third">
                            <CreditCardCVVInput />
                        </div>
                    </fieldset>

                    <CreditCardSubmitButton>
                        Pay $45.00
                    </CreditCardSubmitButton>
                </SquarePaymentForm>

                <div className="sq-error-message">
                    {this.state.errorMessages.map((errorMessage: React.ReactNode) =>
                        <li key={`sq-error-${errorMessage}`}>{errorMessage}</li>
                    )}
                </div>

            </div>
        )
    }
}

export default PaymentForm