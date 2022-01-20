import * as React from "react";
import Button from "react-uwp/Button";
import * as AntD from 'antd';
import * as PropTypes from "prop-types";
import CalendarDatePicker from "react-uwp/CalendarDatePicker";
import AppBarButton, { DataProps as AppBarButtonProps } from "react-uwp/AppBarButton";
import CommandBar from "react-uwp/CommandBar";
import FloatNav from "react-uwp/FloatNav";
import IconButton from "react-uwp/IconButton";
import Image from "react-uwp/Image"
//import logo from '../../../app/resources/LogoCSI.png';
import {
    Link,
    Route,
    withRouter,
    Switch
  } from 'react-router-dom';
  //import '../../../app/components/uwp-design/uwp-design.css';
  import { Theme as UWPThemeProvider, getTheme } from "react-uwp/Theme";
  import './Login.css';
  import TextBox from "react-uwp/TextBox";
  import PasswordBox from "react-uwp/PasswordBox";
  import Icon from "react-uwp/Icon";
  import {APIRoutes} from '../../../app/routes/APIRoute';
  import {ACCESS_TOKEN,isOnline,CONTEXT_PATH } from '../../../app/config';
  import {utilities} from '../../../app/utilities';

const { Header, Content, Footer,  Sider } = AntD.Layout;
const FormItem = AntD.Form.Item;



class Login extends React.Component<any,any> {
    static contextTypes = { theme: PropTypes.object };
    static context: { theme: ReactUWP.ThemeType };


    constructor(props:any) {
        super(props);
        this.state = {
            isloading: false
         }

        //console.error("Login Constructor :"+this.props.location.pathname)
    }

    componentDidMount() {
       // console.error("Login componentDidMount :"+this.props.location.pathname);

    }
    render() {
//        console.log("WRAP LOGIN",this.props)
        const { theme } = this.context;
        const toggleShow=this.props.visible?"visible":"hidden"

        const AntWrappedLoginForm:any = AntD.Form.create()(LoginForm)
        return (
            <div className="login-container" style={{  visibility:toggleShow }}>

                <div className="login-content">
                    <AntWrappedLoginForm onLogin={this.props.onLogin} {...this.props}/>
                </div>
            </div>
        );
    }
}

class LoginForm extends React.Component<any,any> {
    static contextTypes = { theme: PropTypes.object };
    static context: { theme: ReactUWP.ThemeType };
    private useradmin:any="admin";
    private passwordadmin:any="admin";

    constructor(props:any) {
        super(props);
       //  console.log("Login LoginForm :"+this.props.form)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            isloading: false
         }

    }

    componentDidMount() {
        //console.log("componentDidMount Login :",this.props.history,localStorage.getItem("authorized"));
        if (localStorage.getItem("authorized")){
            this.props.history.push(CONTEXT_PATH());
        }
    }

    handleLoginSuccessfully=(response:any,loginRequest:any,userFilter:any,expired:any)=>{
//             console.log("handleLoginSuccessfully",localStorage.length);
            if(localStorage.length===0){
//                 userFilter=loginRequest.user;
                userFilter = Object.assign({}, {user:loginRequest.user}, userFilter);

                localStorage.setItem('session_expired', 'false');
                localStorage.setItem('current_path', CONTEXT_PATH());
                localStorage.setItem(ACCESS_TOKEN, response.data.access_token);
                localStorage.setItem('cache_callback',JSON.stringify(''));
//                 console.log("response No Session :",response,localStorage.getItem(ACCESS_TOKEN),ACCESS_TOKEN,response.accessToken);
             }else{

                 localStorage.setItem('session_expired', 'false');
                 localStorage.setItem(ACCESS_TOKEN, response.data.access_token);
//                  localStorage.setItem('current_path', CONTEXT_PATH());
                 var currentUser=(localStorage.getItem('current_user'))?JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('current_user')))).data:null;
//                  console.log("response Session",currentUser,localStorage.getItem('current_user'));
             }

           this.setState({isloading: false})
//            console.log("userFilter ",userFilter,loginRequest.user);
//            userFilter.secret=response.secret;
           userFilter = Object.assign({}, {'secret':response.secret}, userFilter);
//            console.log("CONTEXT_PATH() ",userFilter,response,CONTEXT_PATH(),loginRequest,localStorage.getItem('current_user'))
            this.props.onLogin(userFilter,expired);
        }

    handleSubmit(event:any) {
//         console.log("LOGIN :");
            event.preventDefault();
            this.props.form.validateFields((err:any, values:any) => {
                if (!err) {
                    this.setState({isloading:true})
                    const loginRequest = Object.assign({}, values);
//                   console.log("LOGIN :",err,values,this.useradmin,loginRequest);
                   APIRoutes.LoginServices.login(loginRequest)
                    .then((response:any) => {
//                         return;
                        let user=response

                        if(typeof(user.error)==='undefined'){
//                             console.log("RESPONSE :",response,user.error);
                           this.handleLoginSuccessfully(response,loginRequest,null,user.expires_in);
                        }else{
                           let addtext="";
                           if(user.status==400) addtext=", Your password is incorrect. Please try again !"
//                            console.log("RESPONSE ONLINE X:",typeof(user.error),user,user.message+addtext);
                              utilities.RouteHelper.statusMessage(user.status,user.message+addtext,this.context.theme.acrylicTexture80.background);
                              this.setState({isloading: false})
                           }
                    }).catch((error:any) => {
                        let status=500;
                        let message='';
                        let caused=null;
                        if(typeof(error)!=='undefined'){
                            status=error.status;
                            if(typeof(error.data)!=='undefined'){
                                try{
                                    caused=JSON.parse(JSON.parse(JSON.stringify(error.data.error)));
//                                     console.log('caused',caused);
                                    message=caused?.error_description.toUpperCase()+' : Your Password is not matched. Please try again !'??'';
                                }catch{
                                    message=error.data.error+' : Your Username is not found. Please try again !';
                                }
                                if(status===500){
//                                     console.log(error.data);
                                    message=error.data.message;
                                    this.setState({isloading: false});
                                }
                            }
                        }
                        this.setState({isloading: false});
//                         console.log('message',message);
                        utilities.RouteHelper.statusMessage(status,message,this.context.theme.acrylicTexture80.background);

                    });
                }
            })
        }



    render() {
       //console.log("LoginForm",this.props,localStorage.getItem("authorized"));
        const { getFieldDecorator } = this.props.form;
        const { theme } = this.context;
        return (
            <AntD.Spin spinning={this.state.isloading} wrapperClassName='spin-sign'>
                <AntD.Form className="login-form">
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your username!' }]
                        })(
                            <AntD.Input
                            type="text" allowClear
                            prefix={<AntD.Icon type="user" />}
                            size="large"
                            name="user"
                            placeholder="Username" style={{  background:theme.acrylicTexture60.background   }} />
                        )}
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }]
                    })(
                        <AntD.Input.Password  allowClear
                            prefix={<AntD.Icon type="lock" />}
                            size="large"
                            name="password"
                            type="password"
                            placeholder="Password"  style={{  background:theme.acrylicTexture60.background   }} />
                    )}
                    </FormItem>
                    <FormItem>

                        <Button className="login-form-button" onClick={this.handleSubmit}  style={{  background:theme.acrylicTexture80.background, height: 50 }}
                            >Log IN</Button>
                        {/* }Or <Link to={CONTEXT_PATH+"/signup"}>register now!</Link>*/}
                    </FormItem>
                </AntD.Form>
            </AntD.Spin>
        );
    }
}



export default Login;