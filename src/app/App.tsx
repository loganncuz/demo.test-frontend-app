import React from 'react';
import * as PropTypes from "prop-types";
import { Redirect,Switch,Link, Route,withRouter,BrowserRouter as Router } from 'react-router-dom';
import FloatNav from "react-uwp/FloatNav";
import IconButton from "react-uwp/IconButton";
import {MINUTES,HOURS,SECONDS,EXPIRED,ACCESS_TOKEN,CONTEXT_PATH  } from './config';
import { IonApp,IonTabButton,IonRouterOutlet,IonTabBar,IonFabButton,IonIcon,IonBackButton,IonButton,IonButtons,IonMenuButton,IonMenu,IonItem,IonList,
IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonLabel } from '@ionic/react';
import { arrowBackOutline,homeSharp,personAddSharp} from 'ionicons/icons';
import { IonReactRouter } from '@ionic/react-router';
import {APIRoutes} from './routes/APIRoute';
import {utilities} from './utilities';
import LoadingIndicator from './components/LoadingIndicator';
import * as ReactRoute from './routes/ReactRoute';
import IdleTimer from 'react-idle-timer';
import * as AntD from 'antd';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import '../theme/variables.css';
import './AppIonic.css';
import './AppAntd.css';

 export interface AppState {
      hostTheme:any;
      isLogin:boolean;
      topPos:any;
      isExpired:boolean;
      isFailed:boolean;
      handleCurrentUser:any;
      handleSetTheme:any;
      currentUserOffline: any;
      isAuthenticated: boolean;
      isLoading:boolean;
      additionalHistoryPath:any;
      menuTitle:any;
      handleSetMenu:any;
      historyPath:any;
      index:any;
      handleAddHistoryPath:any;
      handleLogoutSessionExpired:any;
      ExpiredModal:any;
      expiredCount:any;
      leftMenu:any;
      handleSaveLeftMenu:any;
      selectedMenu:any;
      handleSetIndex:any;
      defaultPath:any;
      handleBackNav:any;
      collapsed:any;
      handleToggle:any;
      handleSubMenuToggle:any;
      message:any;
      handleSetMessage:any;
      showModal:any;
      modal:any;
      modalMessage:any;
      modalOKButtonTitle:any;
      modalCancelButtonTitle:any;
      modalOKButtonIcon:any;
      modalCancelButtonIcon:any;
      modalOKButton:any;
      modalOKButtonColor:any;
      modalCancelButtonColor:any;
      modalCancelButton:any;
      modalOKOnClick:any;
      modalCancelOnClick:any;
      modalTitleVisible:any;
      modalTitle:any;
      backwardDisabled:any;
      forwardDisabled:any;
      upwardDisabled:any;
      historyState:any;
      overrideFile:any;
      createVersion:any;
      enabledRollback:any;
      childModal:any;
      handleSetState:any;
      subMenuToggle:any;
      subMenuList:any;
      additionalhistorypath:any;
 }

class App extends   React.Component<any, AppState> {
    static contextTypes = { theme: PropTypes.object};
    static context: { theme: ReactUWP.ThemeType };
    static state:AppState;
    public history:any;
    public additionalHistoryPath:any;
    public idleTimer:any;

    constructor(props:any){
       super(props);
       this.state = {
            hostTheme:{},
            isFailed:false,
            handleCurrentUser:this.handleCurrentUser.bind(this),
            handleSetTheme:this.handleSetTheme.bind(this),
            isLogin:false,
            topPos:null,
            isExpired:false,
            currentUserOffline: JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('current_user')))),
            isAuthenticated: false,
            isLoading:false,
            additionalHistoryPath:null,
            menuTitle:null,
            handleSetMenu:null,
            historyPath:[],
            index:null,
            handleAddHistoryPath:null,
            handleLogoutSessionExpired:null,
            ExpiredModal:null,
            expiredCount:null,
            leftMenu:null,
            handleSaveLeftMenu:null,
            selectedMenu:null,
            handleSetIndex:null,
            defaultPath:CONTEXT_PATH(),
            handleBackNav:null,
            collapsed:null,
            handleToggle:null,
            handleSubMenuToggle:null,
            message:null,
            handleSetMessage:null,
            showModal:null,
            modal:null,
            modalMessage:null,
            modalOKButtonTitle:null,
            modalCancelButtonTitle:null,
            modalOKButtonIcon:null,
            modalCancelButtonIcon:null,
            modalOKButton:null,
            modalOKButtonColor:null,
            modalCancelButtonColor:null,
            modalCancelButton:null,
            modalOKOnClick:null,
            modalCancelOnClick:null,
            modalTitleVisible:null,
            modalTitle:null,
            backwardDisabled:null,
            forwardDisabled:null,
            upwardDisabled:null,
            historyState:null,
            overrideFile:null,
            createVersion:null,
            enabledRollback:null,
            childModal:null,
            handleSetState:null,
            subMenuToggle:null,
            subMenuList:null,
            additionalhistorypath:null
       }

    }
    componentDidMount() {
    }
    componentDidUpdate(){
    }

    handleHome=()=>{
           console.log("handleHome xxx this.props.history",CONTEXT_PATH())
           if(this.state.message) return;
            //event.preventDefault();
            this.handleUpdateAdditionalHistoryPath("",CONTEXT_PATH(),false)
//             this.handleSetMenu('');
            this.history.push(CONTEXT_PATH());
            this.setState({
                  historyPath:[],
                  defaultPath:CONTEXT_PATH()
            });
    }

    logout=()=>{
            localStorage.removeItem('authorized');
            localStorage.removeItem('collapsed');
            localStorage.removeItem('subMenuToggle');
            localStorage.removeItem('subMenuList');
            localStorage.removeItem(ACCESS_TOKEN);
            localStorage.removeItem('session_expired');
            localStorage.removeItem('current_path');
            localStorage.removeItem('current_user');
            localStorage.removeItem('cache_callback');
            localStorage.removeItem('cache_selectedMenu');
            localStorage.removeItem('expires_in');
            localStorage.removeItem('cache_leftMenu');
//              this.handleSetMenu('');
    }
    handleLogout=(event:any)=>{
//          console.log("handleLogout");
            if(this.state.message) return;
            event.preventDefault();
            this.logout();
            this.setState({
                 isLogin:true,
                 currentUserOffline: null,
                 isAuthenticated: false,
                 isExpired:false,
                 historyPath:[],
                 defaultPath:CONTEXT_PATH()
            });
             this.history.push(CONTEXT_PATH());
             utilities.RouteHelper.statusMessage(200,"You're logged out successfully.",this.context.theme.acrylicTexture80.background);
    }

    handleLogoutSessionExpired= (value:any) =>{
            localStorage.removeItem(ACCESS_TOKEN);
            localStorage.removeItem('authorized');
            localStorage.removeItem('cache_leftMenu');
            localStorage.setItem('session_expired','true');
            localStorage.setItem('current_path',this.props.location.pathname);
            console.log("handleLogoutSessionExpired",this.props.location.pathname)
            this.setState({
              isExpired: false,
              isLogin:true,
              currentUserOffline: null,
              isAuthenticated: false,
            });
            this.history.push(CONTEXT_PATH());
            utilities.RouteHelper.statusMessage(200,"You're successfull logged out.",this.context.theme.acrylicTexture80.background);
    }
    handleUpdateAdditionalHistoryPath=(pathname:any,location:any,linked:any)=>{
         // console.log("handleUpdateAdditionalHistoryPath",pathname,location,linked,this.state.additionalhistorypath)
         if(this.state.additionalhistorypath!==pathname){
             this.setState({
                 additionalhistorypath:pathname
             });
//              this.additionalHistoryPath=utilities.RouteHelper.getAdditionalBreadcrumbItems(pathname,location,linked)
         }

    }
    handleOnExpiredSession=()=>{

      //console.log("handleonExpiredSession",localStorage.getItem('session_expired'))
      if(localStorage.getItem('session_expired')){
         this.setState({
            isAuthenticated: false,
            isExpired:true
         });
      }else{
         this.setState({
            isExpired: false
         });
      }
    }
    handleLogin=(userFilter:any,expired:any)=>{
           this.handleLoadCurrentUser(userFilter,expired)
    }

    handleLoadCurrentUser=(userFilter:any,expired:any)=>{
//         console.log("APPS handleLoadCurrentUser  :",userFilter,expired);
        this.setState({
                 isLoading: true
        });

        APIRoutes.LoginServices.getCurrentUser(userFilter)
        .then((response:any)  => {
            let user=response.data;
            user = Object.assign({}, {'secret':userFilter.secret}, user);
//             console.log("APPS getCurrentUser RESPONSE :",userFilter,this.props.location.pathname,response);
            localStorage.setItem('authorized', 'true');
            localStorage.setItem('current_user',JSON.stringify(user));
//             console.log("APPS 2 :",user,this.props.location.pathname,localStorage.getItem('current_user'))
            localStorage.setItem('expires_in',expired);
            var  currentUser=JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('current_user'))));
            //  console.log("APPS getCurrentUser RESPONSE :",localStorage.getItem('current_path'),currentUser,JSON.parse(JSON.stringify(localStorage.getItem('expires_in'))));



//                 console.log("APPS getCurrentUser RESPONSE X :",response,localStorage.getItem('current_user'),
//                 this.state.historyPath,localStorage.getItem('current_path'),currentUser);
            this.props.history.push(localStorage.getItem('current_path'));
            utilities.RouteHelper.statusMessage(200,"You're logged in successfully.",this.context.theme.acrylicTexture80.background);
            this.setState({
                currentUserOffline:currentUser ,
                isAuthenticated: true,
                isLoading: false,
                expiredCount:expired
            });
         }).catch((error:any) => {
//             console.log("APPS getCurrentUser error :"+error)
           this.setState({
             isLoading: false
           });
          // this.props.history.push(CONTEXT_PATH());
         });

    }
    onChange=()=>{
//            console.log("Root Handle Change",this.state.isLogin,this.history.location.pathname);
           if(this.state.isLogin,this.history.location.pathname!=CONTEXT_PATH()+'login'){
                this.setState({
                       isLogin:true
                });
                this.history.push(CONTEXT_PATH());
           }else{
                this.setState({
                       isLogin:!this.state.isLogin
                });
           }
    }
    onSignChange=()=>{
//         console.log("onSignChange",this.state.isLogin,
//         (this.state.isLogin,this.history.location.pathname!=CONTEXT_PATH()+'signup'));
       if(this.state.isLogin,this.history.location.pathname!=CONTEXT_PATH()+'register'){
             this.history.push(CONTEXT_PATH()+'register');
       }else{
         this.setState({
            isLogin:!this.state.isLogin
         });
       }
    }
    scrollToTop() {
                // let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
                // this.setState({ intervalId: intervalId });
                 //console.log("scrollToTop")
                 let intervalId = setInterval(this.scrollStep.bind(this), 16.66);
                 //console.log("scrollToTop",intervalId)
                 this.setState({ topPos: intervalId });
    }
     scrollStep() {
            if (window.pageYOffset === 0) {
                clearInterval(this.state.topPos);
            }
            window.scroll(0, window.pageYOffset - 50);
     }
    handleSetTheme=(e:any)=>{
         if(e.data !==''){
            this.setState({hostTheme:e.data});
        }
    }
    loadCurrentUser(e:any,c:any,i:any){
//         console.log("loadCurrentUser  :",e,c,i)
        APIRoutes.LoginServices.getCurrentUser(e)
        .then((response:any)  => {

            if(typeof(response.data.error)==='undefined'){
//                 localStorage.setItem(ACCESS_TOKEN,response.data['access_token']);
                let user=response.data;
                user = Object.assign({}, {'secret':''}, user);
                localStorage.setItem("current_user",JSON.stringify(user));
                var  currentUser=JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('current_user'))));
                this.setState({
                    currentUserOffline:currentUser
                });
                if(c!=null) c(i,null);

            }else{
//             console.log("loadDocumentTree error response :",response)
                utilities.RouteHelper.statusMessage(response.data.status,response.data.message,'linear-gradient(to bottom,  #0a1a89 0%, #F6f7ef  100%)  repeat scroll 0 0 rgba(0, 0, 0, 0)');
                window.parent.postMessage({message: 'Form is Close', show: false}, '*');
                this.history.replace(CONTEXT_PATH()+'401');
                this.setState({
                    isLoading: false,
                    isFailed:true
                });
            }
//         localStorage.setItem('current_user',JSON.stringify(response));
        }).catch((error:any) => {
 //       console.log("APPS getCurrentUser error :"+error)
            this.setState({
                isLoading: false,
                isFailed:true
            });
            window.parent.postMessage({message: 'Form is Close', show: false}, '*');
            this.history.replace(CONTEXT_PATH()+'401');
       });
    }
    handleCurrentUser(e:any,history:any,callback:any,i:any){
//         console.log("handleCurrentUser",e,ACCESS_TOKEN,localStorage.getItem("authorized"),localStorage);
        this.history=history;
        let token=localStorage.getItem(ACCESS_TOKEN);
// //         localStorage.removeItem(ACCESS_TOKEN);
//         localStorage.removeItem("secret");
//
//         if(localStorage.getItem("secret")==null){
//        //console.log('handleCurrentUser null',localStorage.getItem("secret"),e);
//         localStorage.setItem("secret",JSON.stringify({secret:e}));
// //         if(e!=="")
// //             localStorage.setItem(ACCESS_TOKEN,e);
//     }
// //      console.log('handleCurrentUser',localStorage.getItem("secret"));
//         let token=JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem("secret"))));
//      console.log('handleCurrentUsermmm ',token,e,this.state.isFailed,localStorage.getItem("secret"));
        if(token!==localStorage.getItem("secret") && !this.state.isFailed){
//             console.log('x',token,e);
            this.loadCurrentUser(token,callback,i);
        }
    }
    _onActive=(e:any)=> {
//             console.log("on_active");
    }
    _onIdle=(e:any) =>{
          localStorage.setItem('session_expired','true');
           this.handleOnExpiredSession();
    }
    staticButtonStyle: React.CSSProperties = {
                position: "fixed",
                right: "20px",
                bottom: "40px",
                zIndex:309
        };

    Root = (e:any) => {
                const toggleShow=e.visible?"visible":"hidden";
              return (
                  <div style={{  visibility:toggleShow }}>

                      <div style={this.staticButtonStyle}>
                        <FloatNav
                            style={{ margin: "20px 0" }}
                            expandedItems={
                            [
                                {
                                    iconNode: (
                                        <IconButton  hoverStyle={{}} activeStyle={{}}>
                                            ContactLegacy
                                        </IconButton>
                                    ),
                                    title: "Sign UP",
                                    onClick:this.onSignChange
                                },
                                {
                                    iconNode: (
                                        <IconButton  hoverStyle={{}} activeStyle={{}}>
                                            PermissionsLegacy
                                        </IconButton>
                                    ),
                                    title: "Log IN",
                                    onClick:this.onChange
                                },
                            ]
                            }
                        />
                      </div>
                     <e.routes.rootRoute visible={e.loginVisible} onLogin={this.handleLogin}
                         {...this.props} {...this.state}/>
                 </div>
              );
    };

    render(){
        const isAuthorized=(localStorage.getItem("authorized")==null)?false:localStorage.getItem("authorized");
//         console.log('APP RENDER X',this,CONTEXT_PATH(),this.state.currentUserOffline,localStorage.getItem("authorized")==null);
        const { theme } = this.context;
        const { history } = this.props;
        const {controlPanelRoutes}=ReactRoute;
        const toogleBackNav=(this.state.historyPath.length>0)?"visible":"hidden"
        this.history=history;
        if(this.state.isLoading) {
         	return <LoadingIndicator />
        }

         if(!isAuthorized) {
//             console.log("not authorized",this.state.isLogin);
            let isLogin=this.state.isLogin?this.state.isLogin:true;
             return(
                <this.Root visible={true}  loginVisible={isLogin} routes={controlPanelRoutes}  />
             )
         }else{
            return(
                    <IonPage >
                    <IdleTimer
                        ref={(ref:any) => { this.idleTimer = ref }}
                        element={document}
                        onActive={this._onActive}
                        onIdle={this._onIdle}
                        timeout={SECONDS * this.state.expiredCount}
                    >
                        <controlPanelRoutes.rootRoute handleHome={this.handleHome}
                            handleChange={this.onChange} {...this.props} {...this.state}
                            onExpiredSession={this.handleOnExpiredSession}
                            AdditionalPath={this.additionalHistoryPath}
                            onUpdateAdditionalPath={this.handleUpdateAdditionalHistoryPath}
                        />
                           <div style={this.staticButtonStyle}>
                              <FloatNav
                                style={{ margin: "20px 0" }}
                                topNode={[
                                    <IconButton onClick={this.handleHome}>
                                        Home
                                    </IconButton>
                                ]}
                                expandedItems={
                                [
                                    {
                                        iconNode: (
                                            <IconButton  hoverStyle={{}} activeStyle={{}}>
                                                ContactPresence
                                            </IconButton>
                                        ),
                                        title: 'Welcome, '+this.state.currentUserOffline?.['userName'].toUpperCase(),

                                    },
                                    {
                                        iconNode: (
                                            <IconButton  hoverStyle={{}} activeStyle={{}}>
                                                PowerButton
                                            </IconButton>
                                        ),
                                        title: "Logout",
                                        onClick:this.handleLogout,

                                    }
                                ]
                                }
                                bottomNode={[
                                    <IconButton onClick={this.scrollToTop.bind(this)}>
                                        ScrollChevronUpLegacy
                                    </IconButton>
                                ]}
                              />
                           </div>
                 <IonHeader  >
                    <IonToolbar
                       style={{ '--background': `${this.context.theme.acrylicTexture80.background}`,
                       '--color': `${this.context.theme.acrylicTexture80.background}`}}>
                             <IonButtons slot="start" style={{visibility:toogleBackNav}} >
                                <Link to={this.state.defaultPath}  >
                                    <IonFabButton  size="small" style={{ '--background':'transparent'}}
                                        onClick={this.props.handleBackNav}>
                                              <IonIcon   icon={arrowBackOutline} />
                                    </IonFabButton>
                                </Link>
                             </IonButtons>
                        <IonButtons slot="end">
                             <IonMenuButton disabled={this.props.message}></IonMenuButton>
                        </IonButtons>
                        <IonTitle style={{color:'black',fontWeight:'bold',marginLeft:'10px'}}>{this.props.menuTitle}</IonTitle>
                    </IonToolbar>
                 </IonHeader  >

                    <IonTabBar slot="bottom" style={{background: theme.acrylicTexture80.background}}>
                       <IonTabButton tab="Home" href={CONTEXT_PATH()+"home"} style={{background: theme.acrylicTexture80.background}}>
                            <AntD.Tooltip   title={"Home"}>
                            <IonIcon icon={homeSharp} style={{ 'color': `red`}}/>
                            </AntD.Tooltip>
                       </IonTabButton>
                       <IonTabButton tab="Registration" href={CONTEXT_PATH()+"register"} style={{background: theme.acrylicTexture80.background}}>
                            <AntD.Tooltip   title={"Registration"}>
                            <IonIcon icon={personAddSharp} style={{ 'color': `red`}}/>
                            </AntD.Tooltip>
                       </IonTabButton>
                            {/*
                                <IonTabButton tab="settings" href={CONTEXT_PATH()+"preferrences/server"}  style={{background: theme.acrylicTexture80.background}}>
                                    <IonIcon icon={triangle} style={{ 'color': `red`}}/>

                                </IonTabButton>
                                 <IonTabButton tab="settings2" href={CONTEXT_PATH()+"preferrences/sample"}  style={{background: theme.acrylicTexture80.background}}>
                                                                    <IonIcon icon={triangle} style={{ 'color': `red`}}/>

                                                                </IonTabButton>
                            */}
                     </IonTabBar>
                    </IdleTimer>
                  </IonPage >
            );
        }
    }
};

export default withRouter(App);
