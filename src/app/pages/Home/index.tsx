import React from 'react';
import * as PropTypes from "prop-types";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import {APIRoutes} from '../../routes/APIRoute';
import Button from "react-uwp/Button";
import './Home.css';
import * as AntD from 'antd';

const { Header, Content, Footer,  Sider } = AntD.Layout;
const FormItem = AntD.Form.Item;
const formItemLayout = {
       labelCol: { span: 2 },
       wrapperCol: { span: 22 },
    };
class Home extends   React.Component<any, any>  {
    static contextTypes = { theme: PropTypes.object};
    static context: { theme: ReactUWP.ThemeType };
    public isLoading=false;
    public child:any;
    public AntWrappedPaymentForm=AntD.Form.create({})(PaymentForm);
    public AntWrappedDepositForm=AntD.Form.create({})(DepositForm);
    constructor(props:any){
       super(props);
        this.state = {
            numberValidation : this.numberValidation.bind(this)
         }
       this.child = React.createRef();
    }
    componentDidMount() {
//           console.log(JSON.stringify({ secret:this.props.location.search.replace("?id=","") }));
        localStorage.setItem("secret",JSON.stringify({ secret:this.props.location.search.replace("?id=","") }));
        this.props.handleCurrentUser(this.props.location.search.replace("?id=",""),this.props.history,
            null,this);
    }
    handleRefresh=(e:any,f:any)=>{
        e.stopPropagation();
     this.props.handleCurrentUser(this.props.location.search.replace("?id=",""),this.props.history,
                null,this);
    }
    handleSubmit(event:any,i:any,t:any) {
        event.preventDefault();
        console.log("handleSubmit :",event,i,t,t==0);
        let form=i.child.current.getForm();
        form.validateFields((err:any, values:any) => {
            if (!err) {
                if(t==0){
                    console.log("handleSubmit Deposit:",values);
                    APIRoutes.TransactionServices.postDeposit(values)
                    .then((response:any)  => {
//                         console.log("handleSubmit response:",response,this.props.currentUserOffline,form);
                        this.props.handleCurrentUser(this.props.location.search.replace("?id=",""),this.props.history,
                       null,this);

                    }).catch((error:any) => {
                        console.log("handleSubmit response:",error);
                    });
                }else
                if(t==1){
                    console.log("handleSubmit Payment:",values);
                     APIRoutes.TransactionServices.postPayment(values)
                     .then((response:any)  => {
 //                         console.log("handleSubmit response:",response,this.props.currentUserOffline,form);
                         this.props.handleCurrentUser(this.props.location.search.replace("?id=",""),this.props.history,
                        null,this);

                     }).catch((error:any) => {
                         console.log("handleSubmit response:",error);
                     });
                }

                    console.log("validateFields :",err,values);
                    form.resetFields();
            }
            });

    }
    numberValidation=(rule:any,value:any,callback:any)=>{
        if (isNaN(value)) {
            console.log("numberValidation",value);
            callback("Number Allowed");
        }
      callback();
  }
    genExtra = (e:any) => {
      let title=(e==1)?"Balance":(e==2)?" ":" "
      return(
        <div>
            <AntD.Tooltip   title={"Reload "+title}>
                <AntD.Icon style={{  verticalAlign: '1px',color:'#cbc2c2'}}
                    type="sync"
                    onClick={(f) => {
                        this.handleRefresh(f,e)
                    }}
                />
            </AntD.Tooltip>
        </div>
     );
    }
    render(){
        const { theme } = this.context;
        const antIcon = <AntD.Icon type="loading-3-quarters" style={{ fontSize: 30 }} spin />;
//         console.log("Home",this.props.currentUserOffline?.balance)
        return (
            <IonContent  style={{  '--background':theme.acrylicTexture60.background}}>
                <AntD.Spin spinning={this.isLoading}>
                    <AntD.Collapse className='tableServer' accordion={true} defaultActiveKey={['1']} style={{ background:theme.acrylicTexture60.background}} >
                        <AntD.Collapse.Panel header="BALANCE" key="1"
                            extra={this.genExtra(1)}
                            style={{  background:theme.acrylicTexture60.background}}>
                            <AntD.Divider type="horizontal" orientation="left" style={{ marginTop:-15,marginBottom:10,backgroundColor:'#8382bc' }}/>
                                <div style={{ marginLeft:20 }}>
                                    <strong>{this.props.currentUserOffline?.balance}</strong>
                                </div>
                            <AntD.Divider type="horizontal" orientation="left" style={{  top:-10,backgroundColor:'#8382bc' }}/>
                        </AntD.Collapse.Panel>
                        <AntD.Collapse.Panel header="DEPOSIT" key="2"
                            style={{  background:theme.acrylicTexture60.background}}>
                            <div style={{ marginLeft:20 }}>
                                 <this.AntWrappedDepositForm  ref={this.child} {...this.props} {...this.state}/>
                                <div>
                                    <Button  onClick={(e:any) => this.handleSubmit(e,this,0)}  style={{  width: '100%',background:theme.acrylicTexture80.background,color:'black', height: 50 }}
                                    >Submit</Button>
                                </div>
                            </div>
                        </AntD.Collapse.Panel>
                        <AntD.Collapse.Panel header="PAYMENT" key="3"
                            style={{  background:theme.acrylicTexture60.background}}>
                            <div style={{ marginLeft:20 }}>
                                 <this.AntWrappedPaymentForm  ref={this.child} {...this.props} {...this.state}/>
                                <div>
                                    <Button  onClick={(e:any) => this.handleSubmit(e,this,1)}  style={{  width: '100%',background:theme.acrylicTexture80.background,color:'black', height: 50 }}
                                    >Submit</Button>
                                </div>
                            </div>
                        </AntD.Collapse.Panel>
                        </AntD.Collapse>
                </AntD.Spin>
            </IonContent>
        );
    };
};

class DepositForm extends React.Component<any,any> {
    static contextTypes = { theme: PropTypes.object };
    static context: { theme: ReactUWP.ThemeType };
//     public child:any;
    constructor(props:any) {
        super(props);
       //  console.log("Login LoginForm :"+this.props.form)
        this.state = {
            isloading: false
         }
//         this.child = React.createRef();
    }
    componentDidMount() {
    }
   render(){
        const { getFieldDecorator } = this.props.form;
        const { theme } = this.context;
        const antIcon = <AntD.Icon type="loading-3-quarters" style={{ fontSize: 30 }} spin />;
//          console.log("DepositForm",this.props.numberValidation)
        return (
            <AntD.Spin spinning={this.state.isloading} wrapperClassName='spin-sign'>
                <AntD.Form layout="horizontal"  {...formItemLayout}>
                    <FormItem label="Amount">
                        {getFieldDecorator('amount', {
                            rules: [{ required: true, message: 'Please input amount!' },
                             {validator: this.props.numberValidation,}]
                        })(
                            <AntD.Input
                            type="text" allowClear
                            size="large"
                            name="amount"
                            placeholder="amount" style={{  background:theme.acrylicTexture60.background   }} />
                        )}
                    </FormItem>
                </AntD.Form>

            </AntD.Spin>
        );
    };
}

class PaymentForm extends React.Component<any,any> {
    static contextTypes = { theme: PropTypes.object };
    static context: { theme: ReactUWP.ThemeType };
    constructor(props:any) {
        super(props);
       //  console.log("Login LoginForm :"+this.props.form)
        this.state = {
            isloading: false
         }
    }
    componentDidMount() {
    }
   render(){
        const { getFieldDecorator } = this.props.form;
        const { theme } = this.context;
        const antIcon = <AntD.Icon type="loading-3-quarters" style={{ fontSize: 30 }} spin />;
        return (
            <AntD.Spin spinning={this.state.isloading} wrapperClassName='spin-sign'>
                <AntD.Form layout="horizontal"  {...formItemLayout}>
                    <FormItem label="Amount">
                        {getFieldDecorator('amount', {
                            rules: [{ required: true, message: 'Please input amount!' },
                            {validator: this.props.numberValidation,}]
                        })(
                            <AntD.Input
                            type="text" allowClear
                            size="large"
                            name="amount"
                            placeholder="Amount" style={{  background:theme.acrylicTexture60.background   }} />
                        )}
                    </FormItem>
                </AntD.Form>
            </AntD.Spin>
        );
    };
}

export default Home;
