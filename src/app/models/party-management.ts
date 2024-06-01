export class partyModel{
    partyObject = new Party ();
    addressObj = new Address()
}


export class Address {
    id: number = 0;
    address_line_1: string = '';
    address_line_2: string = '';
    country: string = '';
    state: string = '';
    city: string = '';
    pincode: string = '';
  }
  
  export class Bank {
    id: number = 0;
    bank_ifsc_code: string = '';
    bank_name: string = '';
    branch_name: string = '';
    account_no: string = '';
    account_holder_name: string = '';
  }
  
  export class Party {
    name: string = '';
    company_name: string = '';
    mobile_no: string = '';
    telephone_no: string = '';
    whatsapp_no: string = '';
    email: string = '';
    remark: string = '';
    login_access: boolean = false;
    date_of_birth: string = ''; // Consider changing to Date type if required
    anniversary_date: string = ''; // Consider changing to Date type if required
    gstin: string = '';
    pan_no: string = '';
    apply_tds: boolean = false;
    credit_limit: number = 0;
    address: Address[] = [];
    bank: Bank[] = [];
  }

  