import React from 'react'
import { removeUserInfo, getUserInfo } from '../../../../utils/Services/UserInfo'
import { Input } from 'mdui-in-react'
// @ts-expect-error ts-migrate(6142) FIXME: Module '../../../../utils/Services/SendCode' was r... Remove this comment to see the full error message
import SendCode from '../../../../utils/Services/SendCode'
import Axios from '../../../../utils/axios'
import { snackbar } from 'mdui'

type State = any;

class Ui extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            username:getUserInfo().username,
            password:null,
            xcode:null
        }
    }
    reset(){
        const { username, password, xcode } = this.state
        window.loadShow();
        Axios({
            method: 'post',
            url: 'https://api.ygktool.cn/ygktool/user/reset',
            withCredentials: false,
            data:{
                username:username,
                newPwd:password,
                xcode: xcode
            }
        }).then(response =>{
            var json = JSON.parse(response.request.response); 
            switch(json.code){
                case 500:
                    snackbar({message:'服务器错误，请联系管理员'});
                    break;
                case 2:
                    snackbar({message:'验证码错误'});
                    break;
                case 666:
                    snackbar({message:'修改成功，即将退出...'});
                    removeUserInfo()
                    setTimeout(_=>window.location.href = '/user/login', 2000)
                    break;
            }      
        }).then(_=>{
            window.loadHide()
        })
    }
    render(){
        const { password, username, xcode }  = this.state
    	return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    		<>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Input
                    onValueChange={newText=>{
                        this.setState({password:newText})
                    }}
                    header="新的密码"
                    icon="lock"
                    type="password"
                    value={password}
                />    
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <SendCode
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'code' implicitly has an 'any' type.
                    onInput={code=>{
                        this.setState({xcode: code})
                    }}
                    xcode={xcode}
                    email={username}
                />       
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <button 
                    onClick={()=>{
                        this.reset()
                    }} 
                    disabled={!xcode}
                    className="mdui-ripple mdui-color-theme mdui-fab mdui-fab-fixed">
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <i className="mdui-icon material-icons">&#xe5ca;</i>
                </button>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className="mdui-clearfix"></div>
            </>
    	)
    }
}

export default Ui
