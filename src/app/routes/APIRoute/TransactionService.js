import {utilities} from '../../utilities';
import {ACCESS_TOKEN, PROXY_URL} from '../../config';
import * as CircularJSON from 'circular-json';




// Config URL Server Service -> must declare for each file Route Service
const proxyUrl = PROXY_URL;
const localProxy="https://localhost:6010";
const targetUrl ="/auth";

export const API_BASE_URL=proxyUrl+targetUrl;

export function postDeposit(loginRequest) {
//	 console.log(" signup : ",proxyUrl+targetUrl)
	const option={
			 url: proxyUrl+targetUrl+ "/deposit",
		     method: 'POST',
		     body: JSON.stringify(loginRequest)
        }
	return utilities.APIHelper.setRequest(option);
}

export function postPayment(loginRequest) {
//	 console.log(" signup : ",proxyUrl+targetUrl)
	const option={
			 url: proxyUrl+targetUrl+ "/payment",
		     method: 'POST',
		     body: JSON.stringify(loginRequest)
        }
	return utilities.APIHelper.setRequest(option);
}