export interface PersonalInfo {
    [key: string]: any;
    email: string;
    lastName: string;
    firstName: string;
    password: string;
    phone: string;
    fiscalProfile: string;
    address: string;
    consent: string;
    status: string;
  }
  
  export interface Questions {
    [key: string]: any;
    employmentIncome: string;
    t4Count: number;
    selfEmployedIncome: string;
    howMany: number;
    rentalIncome: string;
    properties: number;
    telework: string;
    incomeMethod: string;
    dependents: string;
    dependents0to17: number;
    dependents18plus: number;
    dependentTaxReturnCount: number;
    taxCreditsDeductions: string,
  }

  export interface GeneralField {
    id: string;
    label: string;
    type: string;
    placeholder?: string;
    options?: string[];
    number?: string;
  }
  