import {utilities} from '../../../app/utilities';
import {ACCESS_TOKEN, PROXY_URL} from '../../../app/config';


const proxyUrl = PROXY_URL;
const targetUrl ="/auth";
const accountUrl ="/account/api";


export function login(loginRequest) {
//	 console.log(" Login : ",proxyUrl+targetUrl)
	const option={
			 url: proxyUrl+targetUrl+ "/login",
		     method: 'POST',
//             url:"https://jsonplaceholder.typicode.com/todos/1",
//             method:"GET",
		     body: JSON.stringify(loginRequest)
        }
	return utilities.APIHelper.setRequest(option,null);
}

export function getCurrentUser(offline) {
//	  console.log("Doc getCurrentUser token",offline)
    const option={
    		url: proxyUrl+targetUrl+ "/check-balance",
            method: 'GET'
       }
    return utilities.APIHelper.setRequest(option,offline);
}

export function register(loginRequest) {
//	 console.log(" Login : ",proxyUrl+targetUrl)
	const option={
			 url: proxyUrl+"/public/register",
		     method: 'POST',
//             url:"https://jsonplaceholder.typicode.com/todos/1",
//             method:"GET",
		     body: JSON.stringify(loginRequest)
        }
	return utilities.APIHelper.setRequest(option,null);
}

