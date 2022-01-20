import React from 'react';
import moment from 'moment';
import {  withRouter } from 'react-router-dom';
import * as PropTypes from "prop-types";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import {ACCESS_TOKEN,isOnline,CONTEXT_PATH  } from '../../config';
import {APIRoutes} from '../../routes/APIRoute';
import {utilities} from '../../../app/utilities';
import ExploreContainer from '../../components/ExploreContainer';
import './Register.css';
import * as AntD from 'antd';
import MaskedInput from 'antd-mask-input'
import Button from "react-uwp/Button";


const { Header, Content, Footer,  Sider } = AntD.Layout;
const FormItem = AntD.Form.Item;
const formItemLayout = {
       labelCol: { span: 4 },
       wrapperCol: { span: 20 },
    };

class Register extends   React.Component<any, any>  {
  static contextTypes = { theme: PropTypes.object};
  static context: { theme: ReactUWP.ThemeType };
  public AntWrappedRegisterForm = AntD.Form.create()(RegisterForm);
  constructor(props:any){
       super(props);
       this.state = {
          isloading: false
       }
  }
  componentDidMount() {
//   console.log(JSON.stringify({ secret:this.props.location.search.replace("?id=","") }));
    localStorage.setItem("secret",JSON.stringify({ secret:this.props.location.search.replace("?id=","") }));
//     this.props.handleCurrentUser(this.props.location.search.replace("?id=",""),this.props.history,
//             null,this);
  }
    render(){
        const { theme } = this.context;
        let toggleShow:any=this.props.visible?"visible":"hidden"
        toggleShow="visible";
//          console.log("Register",toggleShow)

        return (
            <div className="register-container" style={{  visibility:toggleShow }}>
                <div className="register-content">
                    <this.AntWrappedRegisterForm  {...this.props}/>
                </div>
            </div>
        );
    };
};

class RegisterForm extends React.Component<any,any> {
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
        console.log("handleSubmit :");
            event.preventDefault();
            let data:any;
            this.props.form.validateFields((err:any, values:any) => {
                if (!err) {
//                     this.setState({isloading:true})
                   data = Object.assign({}, values, data);
                   data.birthDate=moment(values.birthDate).format('YYYY-MM-DD');
                   data.phone=data.phone.replace("-_","")
                   data.phone=data.phone.replace(/_/g,"")
                    console.log("REGISTER validateFields :",err,data);
                   APIRoutes.LoginServices.register(data)
                    .then((response:any) => {
                        console.log("REGISTER Response :",response);
                        utilities.RouteHelper.statusMessage(response.status,response.message,this.context.theme.acrylicTexture80.background);
                    }).catch((error:any) => {
//                      console.log('error',error,error.status);
                        let status=500;
                        let message='';
                        let caused=null;
                        if(typeof(error)!=='undefined'){
                            status=error.status;
                            if(typeof(error.data)!=='undefined'){
                                message=error.data.message;
                                if(status===500){
//                                     console.log(error.data);
                                    message=error.data.message;
                                    this.setState({isloading: false});
                                }
                            }
                        }
                        console.log('message',message);
                        utilities.RouteHelper.statusMessage(status,message,this.context.theme.acrylicTexture80.background);

                    });
                    this.setState({isloading: false});
                }
            })
        }

   onDropdownVisibleChange=(e:any)=>{
        console.log("onDropdownVisibleChange",e);
       if(e){
//           this.loadUser();
       }
   }
   handleChange=(e:any)=>{
    console.log("handleChange",e);
//     let keys = [...this.state.users];
//     keys[index]=e;
//     this.setState({users:keys});
   }
   onDateChange=(date:any, dateString:any)=>{
    console.log("onDateChange",date, dateString);
//     let keys = [...this.state.users];
//     keys[index]=e;
//     this.setState({users:keys});
   }


    render() {
       //console.log("LoginForm",this.props,localStorage.getItem("authorized"));
        const { getFieldDecorator } = this.props.form;
        const { theme } = this.context;
        return (
            <AntD.Spin spinning={this.state.isloading} wrapperClassName='spin-sign'>
                <AntD.Form layout="horizontal"  {...formItemLayout}>
                    <FormItem label="User Name">
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your User Name!' }]
                        })(
                            <AntD.Input
                            type="text" allowClear
                            size="large"
                            name="user"
                            placeholder="User Name" style={{  background:theme.acrylicTexture60.background   }} />
                        )}
                    </FormItem>
                    <FormItem label="Password">
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }]
                    })(
                        <AntD.Input.Password  allowClear
                            size="large"
                            name="password"
                            type="password"
                            placeholder="Password"  style={{  background:theme.acrylicTexture60.background   }} />
                    )}
                    </FormItem>
                   <FormItem label="Phone">
                        {getFieldDecorator('phone', {
                            rules: [{ required: true, message: 'Please input your Phone!' }]
                        })(
                            <MaskedInput allowClear
                                name="phone"
                                maxLength={20}
                                mask="1111-1111-1111-1111"
                                placeholder="Phone"
                                size="large"
                                formatCharacters={{
                                  'W': {
                                    validate(char:any) { return /\w/.test(char ) },
                                    transform(char:any) { return char.toUpperCase() }
                                  }
                                }}
                                style={{  background:theme.acrylicTexture60.background   }} />
                        )}
                    </FormItem>
                   <FormItem label="ID No.">
                        {getFieldDecorator('identityNo', {
                            rules: [{ required: true, message: 'Please input your ID No.!' }]
                        })(
                            <AntD.Input
                            type="text" allowClear
                            size="large"
                            name="identityNo"
                            placeholder="ID No." style={{  background:theme.acrylicTexture60.background   }} />
                        )}
                    </FormItem>
                   <FormItem label="Birth Date">
                        {getFieldDecorator('birthDate', {
                            rules: [{ required: true, message: 'Please input your Birth Date!' }]
                        })(
                            <AntD.DatePicker onChange={this.onDateChange}
                            allowClear
                            size="large"
                            name="birthDate"
                            placeholder="Birth Date" style={{  width: '100%',background:theme.acrylicTexture60.background   }} />
                        )}
                    </FormItem>
                   <FormItem label="Role">
                        {getFieldDecorator('role', {
                            rules: [{ required: true, message: 'Please input your username!' }]
                        ,initialValue:"ROLE_ADMIN"
                        })(
                            <AntD.Select  style={{  background:theme.acrylicTexture60.background   }}
                                 allowClear={true}
                                onDropdownVisibleChange={this.onDropdownVisibleChange}
                                onChange={(e:any) => this.handleChange(e)}
                            >
                                    <AntD.Select.Option key="ROLE_ADMIN"      style={{color:'black !important'}}>ROLE_ADMIN</AntD.Select.Option>
                                    <AntD.Select.Option key="ROLE_USER"     style={{color:'black !important'}}>ROLE_USER</AntD.Select.Option>
                            </AntD.Select>
                        )}
                    </FormItem>
                        <Button className="login-form-button" onClick={this.handleSubmit}  style={{   width: '100%',background:theme.acrylicTexture80.background,color:'black', height: 50 }}
                            >Sign IN</Button>
                </AntD.Form>
            </AntD.Spin>
        );
    }
}

export default withRouter(Register);
