import React, { Component, PureComponent } from "react";
import {CHECK_FOR_SUBSCRIPTION} from '../constants';
import axios from 'axios';
import { API_URL } from "../config";

export function getcate(userf, payid, email) {
    return  dispatch => {
    
    axios.post(API_URL + "getSubscriptiondetails", userf, {
  }).then(res => {

    console.log(res.data);
     dispatch({type:CHECK_FOR_SUBSCRIPTION, payload: res.data })
  })
  .catch(error => console.log(error));
}
   //console.log(data);	 
}
