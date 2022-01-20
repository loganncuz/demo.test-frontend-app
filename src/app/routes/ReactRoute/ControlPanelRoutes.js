import React from 'react';
import { Route,Switch,Redirect
	} from 'react-router-dom';
import {CONTEXT_PATH } from '../../../app/config';
import ExploreContainer from '../../../app/components/ExploreContainer';
import {
  IonRouterOutlet,
  IonTabs
} from '@ionic/react';
import Exception from '../../../app/pages/Exception';
import { IonReactRouter } from '@ionic/react-router';
import Home from '../../../app/pages/Home';
import Login from '../../../app/pages/Login';
import UnAuthorized from '../../../app/pages/UnAuthorized';
import Register from '../../../app/pages/Register';



export const rootRoute=(layout)=>{
	const rootMap=function(){
		if (!localStorage.getItem("authorized")){
//		     console.log("NOT AUTH ",CONTEXT_PATH());
            return(<Route  exact={true}      path={CONTEXT_PATH()}
                        render={(props) => <Redirect to={CONTEXT_PATH()+'login'} />  }>
                    </Route>)
		}else{
//		    console.log('main',layout.history.pathname);
			return(
					<Route    exact={true}      path={CONTEXT_PATH()}
						render={(props) =>   <Redirect to={CONTEXT_PATH()+'home'} />  }>
					</Route>
			)
		}
	}
//	console.log("rootRoute",localStorage);
	//const rootpath=rootmap();
	return(
			 <Switch  id="main">
				{rootMap()}
                <Route exact path={CONTEXT_PATH()+"login"}>
                    <Login {...layout} />
                </Route>
                <Route exact path={CONTEXT_PATH()+"home"}>
                    <Home {...layout} />
                </Route>
                <Route exact  path={CONTEXT_PATH()+"register"}>
                    <Register {...layout}/>
                </Route>
                <Route    exact={true}      path={CONTEXT_PATH()+"undefined"}
                	render={(props) =>   <Redirect to={CONTEXT_PATH()+'home'} />  }>
                </Route>
                <Route exact  path={CONTEXT_PATH()+"401"}>
                    <UnAuthorized {...layout}/>
                </Route>
			 </Switch>
		)

	}

