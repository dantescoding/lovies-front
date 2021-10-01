import React, { useMemo } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import axios from "axios";
import { useDispatch } from 'react-redux';
import { setImages, setGenre } from './App/Redux/reducers/MovieConfig'

// authentication component
import AuthProvider from './App/auth/AuthProvider';
import ProtectedRoute from './App/auth/ProtectedRoutes';

// import pages
import Home from './App/pages/Home'

const App = () => {

  // Initialize config Data
  const dispatch = useDispatch()  
  
  useMemo(() => {
    
    const configInit = async () => {

      const configs = await axios(
        process.env.REACT_APP_CONFIGS_API
      );
      if (configs.status === 200) dispatch( setImages(configs.data.images) );

      const genre = await axios(
        process.env.REACT_APP_GENRE_API
      );
      // console.log("genre",genre)
      if (genre.status === 200) dispatch( setGenre(genre.data.genres) );
  
    }
    
    configInit()
  }, [dispatch]);

  return (
    <Router>
      
      <Switch>
        <AuthProvider>

        <Route exact path='/' component={Home} />

        <ProtectedRoute exact path='/profile' component={Home} />

        </AuthProvider>
      </Switch>
    </Router>
  );
}

export default App;
