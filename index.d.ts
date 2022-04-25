type StudentInfoType = {
  id: string;
  first_name: string;
  last_name: string;
  guardian: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    tax_id: string;
  };
  cohort: string;
  school: {
    id: string;
    name: string;
    logo: string;
    country: string;
    city: string;
    address: string;
    zip_code: string;
  };
  monthly_grant_type?: string | null;
  monthly_grant_value?: string | null;
  inscription_grant_value?: string | null;
  inscription_grant_type?: string | null;
};

type PaymentOrderType = {
  id: string;
  concept: string;
  name: string;
  price: string;
  price_currency: string;
  due: string;
  status: string;
  interest: string;
  checkedForPay?:boolean
  payin?: {
    id: string;
    created: string;
  } | null;
};

type StudentResponse = StudentInfoType | null;
type PaymentOrders = PaymentOrderType[];

type PaymentCheck = {
  id: string;
  name: string;
  due: date;
  price: string;
  interest: string;
  status? : string
  payin?: {
    id: string,
    created: string
  }
} | PaymentOrderType;

type PaymentOperations = {
  [key]: PaymentOrderType[]
}

type GenericAction<TType extends string, TPayload = undefined> = {
  type: TType
} & (TPayload extends undefined
    ? { payload?: never }
    : { payload: TPayload }
  )