import { Card } from 'antd'
import React from 'react'
import { Text } from '../text'
import { ContactsOutlined, ProjectOutlined, ShopOutlined } from '@ant-design/icons';

 type Props ={
    resource : "companies" | "contacts" | "deals",
     isLoading : boolean,
     totalCount : number
}
       
export const DashboardTotalCountCard = ({resource, isLoading, totalCount} : Props) => {
   
const InfoResources = [ { title : "Number of companies",
         icon : <ShopOutlined/>, 
         color : "#ADD8E6"},
       { title : "Number of contacts",
         icon : <ContactsOutlined/>, 
         color : "#F08080"},
    {title : "Total deals in the pipeline",
         icon : <ProjectOutlined/>, 
         color : "#90EE90"}
    ]


   const mapOutResourceObj = InfoResources?.filter((resourceValue)=> (
   resourceValue?.title?.includes(resource || "")
)
)
//We get the required object through forcefully entering the array filtered which we expects to 
//only return one object
const {title, icon, color } = mapOutResourceObj[0]

  return (
    <Card style={{
        height : "96px",
        padding : "0px",
    }} styles ={{
        body:{
      padding : "8px 8px 8px 12px"
        },
     }}
      size = "small" >
      
        <div style ={{
            display : "flex",
            alignItems : "center",
            gap: "8px",
            color : color,
            whiteSpace : "nowrap"
        }}>
              {icon}
<Text  size = "md" 
className= "secondary" 
style ={{
    marginLeft : "8px",
    }} >
     {title}
</Text>
        </div>
        <div style ={{
            display : "flex",
            justifyContent : "space-between"
        }}>
    <Text size = "xxxl" strong style={{
    flex : 1,
    whiteSpace : "nowrap",
    flexShrink : 0,
    textAlign : "start",
    marginLeft : "48px",
    fontVariantNumeric : "tabular-nums"
}}>
        {isLoading  ? (
            <p style ={{
                marginTop : "8px",
                width : "74px"
            }}>
                Loading......
            </p>
        ) : (
        totalCount
        )}
    </Text>
        </div>
</Card>
  )
}
