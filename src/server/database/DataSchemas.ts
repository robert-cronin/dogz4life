interface User {
    id: number
    USERNAME: string
    PASSWORD_HASH: string
}

interface Client {
    id: number
    USER_ID: number
    PREFIX: "Miss" | "Mrs" | "Ms" | "Mr" | "Dr" | "Sir"
    FIRST_NAME: string
    LAST_NAME: string
    ADDRESS_LINE_1: string
    ADDRESS_LINE_2?: string
    CITY: string
    STATE: string
    POST_CODE: string
    NOTES: string
}

interface ClientContact {
    CLIENT_ID: number
    METHOD: "Home" | "Mobile" | "Email" | "Work" | "Vetenarian"
    NAME: string
    CONTACT: string
    PREFERRED: boolean
}

interface Pet {
    id: number
    CLIENT_ID: number
    NAME: string
    TYPE: string
    GENDER: "Male" | "Female"
    NEUTERED: boolean
    WEIGHT_KG: number
    COAT_COLOR: string
    BIRTHDAY: Date
    ALLERGY_NOTE: string
    NOTE: string
    VACCINATION: string
    VACCINATION_DATE: Date
    VACCINATION_NEXT: Date
}

interface PetHealthFlag {
    PET_ID: number
    FLAG: string
}

export type {
    User,
    Client,
    ClientContact,
    Pet,
    PetHealthFlag
}