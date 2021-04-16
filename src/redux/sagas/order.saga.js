import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchCustomerOrders() {
  try {
    const response = yield axios.get('/api/orders');
    yield put({
      type: 'SET_CUSTOMER_ORDERS',
      payload: response.data
    })
  } catch (err) {
    console.error(err.message);
  }
}

function* addShipping(action) {
  try {
    const response = yield axios.post('/api/orders/shipping', action.payload);
  } catch (err) {
    console.error(err.message);
  }
}

function* fetchAllOrders() {
  try {
    const response = yield axios.get('/api/orders/all');
    yield put({
      type: 'SET_ALL_ORDERS',
      payload: response.data
    })
  } catch (err) {
    console.error(err.message);
  }
}; // end addShipping

function* initialSampleOrder(action) {
  try {
    const response = yield axios.post('/api/orders/initialSample', action.payload);

    yield put({
      type: 'SET_CURRENT_SAMPLE',
      payload: response.data
    });

  }
  catch (err) {
    console.log('💥 error in initial sample order', err);
  }
}; // end initialSampleOrder

function* addSampleInfo(action) {
  console.log('👾 add sample info hit', action.payload)
  try {
    const response = yield axios.put('/api/orders/updateOrder', action.payload);
    console.log('🪳 response in the add shipping:', response.data);

    // now set current sample with all the info 
    yield put({
      type: 'SET_CURRENT_SAMPLE',
      payload: response.data
    });

  }
  catch (err) {
    console.log('💥 error in the addSampleInfo', err);
  }
}; // end addSampleInfo

function* orderSaga() {
  yield takeLatest('FETCH_CUSTOMER_ORDERS', fetchCustomerOrders);
  yield takeLatest('ADD_SHIPPING_INFO', addShipping);
  yield takeLatest('ADD_SAMPLE_INFO', addSampleInfo);
  yield takeLatest('INITIAL_SAMPLE_ORDER', initialSampleOrder)
  yield takeLatest('FETCH_ALL_ORDERS', fetchAllOrders);
};


export default orderSaga;