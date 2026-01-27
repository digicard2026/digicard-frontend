export const API_URL = import.meta.env.VITE_API_URL;
export const USER_URL = `${API_URL}/api/v1/user`;
export const ACTIVITYLOG_URL = `${API_URL}/api/v1/activity`;
export const ORDER_URL = `${API_URL}/api/v1/order`;
export const INVENTORY_URL = `${API_URL}/api/v1/inventory`;
export const REPORT_URL = `${API_URL}/api/v1/report`;
export const PAYMENT_URL = `${API_URL}/api/v1/payments`;
export const TRANSACTION_URL = `${API_URL}/api/v1/transaction`;
export const WALLET_URL = `${API_URL}/api/v1/wallet`;
export const LISTUPLOAD_URL = `${API_URL}/api/v1/vb-list-leads`;
export const CALL_URL = `${API_URL}/api/v1/call`;
export const CARD_URL = `${API_URL}/api/v1/card-routes`;
export const CHECK_URL = `${API_URL}/api/v1/check`;
export const ADMIN_URL = `${API_URL}/api/v1/admin`;

export const PLAN_URL = `${API_URL}/api/v1/plans`;
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
};

export const COPY_TIMEOUT = 2000; // Timeout duration for copied message

export const GET_METHOD = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',

}

export const GET_METHOD_NO_AUTH = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
}

export const POST_METHOD = { 
  method: 'POST',
   headers: { 'Content-Type': 'application/json' },
  credentials: 'include', 
}

export const POST_METHOD_NO_AUTH = { 
  method: 'POST',
   headers: { 'Content-Type': 'application/json' },
 
}

export const DELETE_METHOD = { 
  method: 'DELETE',
   headers: { 'Content-Type': 'application/json' },
  credentials: 'include', 
}

export const DELETE_METHOD_NO_AUTH = { 
  method: 'DELETE',
   headers: { 'Content-Type': 'application/json' },
 
}
