/* eslint-disable react-hooks/exhaustive-deps */
import { PAYMENT_STATUS } from "enums";
import React, {
  Reducer,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";

const PaymentStore = React.createContext<PaymentStoreType>(
  undefined as unknown as PaymentStoreType
);

interface PaymentState {
  totalAmount: number;
  paymentsList: PaymentOrderType[];
  studentInfo: StudentInfoType | null
}

export enum PaymentActionsTypes {
  SET_TOTAL_AMOUNT = "PYM_setTotalAmount",
  SET_PAYMENT_LIST = "PYM_setPaymentList",
  MARK_UNMARK_AS_PAYMENT_CHECKED = "PYM_markAsPaymentChecked",
  SET_STUDENT_INFO = "PYM_setStudentInfo",
}

type PaymentAction =
  | GenericAction<PaymentActionsTypes.SET_TOTAL_AMOUNT, number>
  | GenericAction<PaymentActionsTypes.SET_PAYMENT_LIST, PaymentOrderType[]>
  | GenericAction<PaymentActionsTypes.SET_STUDENT_INFO, StudentInfoType>
  | GenericAction<PaymentActionsTypes.MARK_UNMARK_AS_PAYMENT_CHECKED, string>;

const PaymentDafultState: PaymentState = {
  totalAmount: 0,
  paymentsList: [],
  studentInfo: null
};

export type PaymentStoreType = Readonly<PaymentState> & {
  dispatch: React.Dispatch<PaymentAction>;
  markUnmarkPayment: (id: string) => void;
  setPaymentList: (paymentsList: PaymentOrderType[]) => void;
  setTotalAmount: (amount: number) => void;
  setStudentInfo: (student: StudentInfoType) => void;
};

const PaymentReducer: Reducer<PaymentState, PaymentAction> = (
  state,
  action
) => {
  switch (action.type) {
    case PaymentActionsTypes.SET_TOTAL_AMOUNT:
      return {
        ...state,
        totalAmount: action.payload,
      };
    case PaymentActionsTypes.SET_STUDENT_INFO:
      return {
        ...state,
        studentInfo: action.payload,
      };
    case PaymentActionsTypes.SET_PAYMENT_LIST:
      const paymentList = action.payload
        .filter((payment) => payment.status !== PAYMENT_STATUS.PAID)
        .map((item) => {
          return { ...item, checkedForPay: false };
        });
        
      return {
        ...state,
        paymentsList: [...paymentList ],
      };
    case PaymentActionsTypes.MARK_UNMARK_AS_PAYMENT_CHECKED:
      const newPaymentList = [...state.paymentsList ].map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            checkedForPay: !item.checkedForPay
          }
        } else {
          return item
        }
      });
      return {
        ...state,
        paymentsList: [...newPaymentList] ,
      };
    default:
      return state;
  }
};

export function PaymentProvider({ children }: any) {
  const [state, dispatch] = useReducer(PaymentReducer, PaymentDafultState);
  const setPaymentList = useCallback<PaymentStoreType["setPaymentList"]>(
    (paymentsList: PaymentOrderType[]) => {
      dispatch({type: PaymentActionsTypes.SET_PAYMENT_LIST, payload: paymentsList});
    },
    []
  );
  const markUnmarkPayment = useCallback<PaymentStoreType["markUnmarkPayment"]>(
    (id: string) => {
      dispatch({type: PaymentActionsTypes.MARK_UNMARK_AS_PAYMENT_CHECKED, payload: id});
    },
    []
  );
  const setTotalAmount = useCallback<PaymentStoreType["setTotalAmount"]>(
    (amount: number) => {
      dispatch({type: PaymentActionsTypes.SET_TOTAL_AMOUNT, payload: amount});
    },
    []
  );
  const setStudentInfo = useCallback<PaymentStoreType["setStudentInfo"]>(
    (student: StudentInfoType) => {
      dispatch({type: PaymentActionsTypes.SET_STUDENT_INFO, payload: student});
    },
    []
  );
  const value = useMemo<PaymentStoreType>(
    () => ({
      ...state,
      markUnmarkPayment,
      setPaymentList,
      setTotalAmount,
      setStudentInfo,
      dispatch,
    }),
    [state, markUnmarkPayment,setPaymentList, setTotalAmount, setStudentInfo, dispatch]
  );

  return (
    <PaymentStore.Provider value={value}>{children}</PaymentStore.Provider>
  );
}

export function usePaymentStore(): PaymentStoreType {
  return useContext(PaymentStore);
}
