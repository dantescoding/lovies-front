import axios from "axios";
import * as Realm from "realm-web";
// import { useDispatch } from 'react-redux';
// import { setImages, setTrending } from '../Redux/reducers/MovieConfig'

// Custom Error Data
const data = {
  status: 406,
  error: true,
  message: "Service-Custom-Backend: 406 Not Acceptable | API call error",
};

export async function apiSearch(query) {
  if ( query ){
    const response = await axios(
      process.env.REACT_APP_SEARCH_API + `&query=${query}`
    );
    // console.log("apiSearch response", response)
    if (response.status === 200) return response;
    else return data;
  }
  else return data
}

export async function realmInit(userID) {
  const app = new Realm.App({ id: process.env.REACT_APP_REALM_ID });
  const credentials = Realm.Credentials.anonymous();
  try {
    const conn = await app.logIn(credentials);
    const user = await conn.functions.getOneUser(userID);
    return user;
  } catch (e) {
    throw new Error(`Failed to Login : ${e.message}`);
  }
}

export async function getApiData( page ) {
  let url = process.env.REACT_APP_TRENDIG_API
  if ( page ) url = process.env.REACT_APP_TRENDIG_API + '&page=' + page
  const response = await axios(
    url
  );
  // console.log("service getApiData > response", response);
  if (response.status === 200) return response;
  else return data;
}

export async function paginationCalling( query, page ) {
  let response;
  if ( query ){
    // console.log("paginationCalling query", query)
    response = await axios(
      `${process.env.REACT_APP_SEARCH_API}&query=${query}&page=${page}`
    )
    if (response.status === 200) return response;
    else return data;
  }
  else if ( page ){
    response = await getApiData( page )
    if (response.status === 200) return response;
    else return data;
  }
  else return data
}

