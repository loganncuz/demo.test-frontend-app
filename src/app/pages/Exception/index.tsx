import React from 'react';
import * as PropTypes from "prop-types";
import {withRouter 	} from 'react-router-dom';
import * as AntD from 'antd';
import { IonCard,IonCardContent,IonFabButton,IonIcon,IonBackButton,IonButton,IonButtons,IonMenuButton,IonMenu,IonItem,IonList,
IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';

interface ContainerProps {
  name: string;
}

class Exception extends   React.Component<any, ContainerProps>  {
    constructor(props:any){
        super(props);
        this.state = {
            name:this.props.name
        }
//         console.log("Database CONS",this.state.name,this.menuName);
        this.props.handleSetIndex((this.props.index==0)?1:0);
         if(this.props.index==0){
                 this.isExist=true;
                 this.menuName=this.state.name;
                 this.props.handleSetMenu(this.state.name);
                 this.props.handleAddHistoryPath(this.props.location.pathname);
                 this.props.handleSetIndex(0);
         }
    }
    componentDidMount() {
       // console.log("SERVER MOUNT",this.props.index,this.props);
    }
    componentDidUpdate(){
        if(this.props.name!==this.menuName){
            this.menuName=this.props.name;
            this.props.handleSetMenu(this.menuName);
            if(!this.isExist){
            //console.log("SERVER ZZZZZ",this.index,this.menuName,this.props.name,this.isExist,this.props.index);
                this.props.handleAddHistoryPath(this.props.location.pathname);
            }else
            if(this.isExist==true){
              //   console.log("SERVER XXXXX",this.index,this.menuName,this.props.name,this.isExist,this.props.index);
                 this.props.handleAddHistoryPath(this.props.location.pathname);
            }
            this.isExist=false;
           // console.log("SERVER UPDATE",this.props,this.props.location.pathname,this.props.historyPath);
       }

    }
    render(){
        const { theme } = this.context;
        return(
            <ExploreContainer visible={'visible'}
                                     style={{height:"99%" ,width:"100%" }}/>
        )
    }

    static contextTypes = { theme: PropTypes.object };
    static context: { theme: ReactUWP.ThemeType };
    private menuName:any;
    private isExist:any;
    private index:any=0;
    public isLoading=false;
}
export default withRouter(Exception);