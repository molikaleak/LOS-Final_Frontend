export type Loan = {
  id: string;
  name: string;
  initials: string;
  type: string;
  amount: string;
  term: string;
  rate: string;
  status: string;
  date: string;
  score: number;
};

export type LoanDetail = {
  id: string;
  applicant: {
    name: string;
    initials: string;
    email: string;
    phone: string;
    address: string;
    employment: string;
    annualIncome: string;
    dob: string;
    ssnLast4: string;
    customerSince: string;
    activeLoans: number;
    totalBorrowed: string;
  };
  loan: {
    type: string;
    amount: string;
    term: string;
    rate: string;
    monthlyPayment: string;
    totalRepayment: string;
    collateral: string;
    insurance: string;
    riskLevel: string;
  };
  workflow: {
    step: string;
    status: "completed" | "in-progress" | "pending";
    date: string;
  }[];
  riskAssessment: {
    label: string;
    value: string;
    score: number;
  }[];
  documents: {
    name: string;
    status: string;
    date: string;
  }[];
};

export type LoanFormData = {
  // Step 1: Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  ssn: string;
  address: string;
  city: string;
  state: string;
  employer: string;
  jobTitle: string;
  annualIncome: number;
  yearsEmployed: number;

  // Step 2: Loan Details
  loanType: string;
  loanProduct: string;
  loanAmount: number;
  loanTerm: string;
  purpose: string;
  repaymentFrequency: string;

  // Step 3: Assets
  assetType: string;
  assetValue: number;
  assetDescription: string;
  assetSerial: string;
  savings: number;
  investments: number;
  realEstate: number;
  otherAssets: number;

  // Step 4: Documents
  documents: string[];

  // Step 5: Confirmed
  termsAccepted: boolean;
};
