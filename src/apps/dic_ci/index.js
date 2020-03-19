import React from 'react'
import Template from '../../utils/AskForTemplate.jsx'

const Result = ({data}) =>{
    if(!data)return null
    return(
      <>       
            <p>{data}</p>
      </>
    )
}

class Ui extends React.Component {
    render(){
        return(
            <Template
                Result={Result}
                api="https://api.ygktool.cn/api/dic_ci?ci="
                inputOpt={{
                    header:'输入要查询的词语',
                    icon:'search'
                }}
            />
        )
    }
}

export default Ui