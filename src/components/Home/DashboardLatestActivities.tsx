import { UnorderedListOutlined } from '@ant-design/icons'
import { Card, Space } from 'antd';
import { Text } from '../text';
import { List } from 'antd/lib';
import { DASHBOARD_LATEST_ACTIVITES_AUDITS_QUERY, DASHBOARD_LATEST_ACTIVITES_DEALS_QUERY } from '@/graphql/Queries';
import { useList } from '@refinedev/core';
import dayjs from 'dayjs';
import { CustomAvatar } from '../custom-avatar';
export const DashboardLatestActivities = () => {
   const {data : auditData,
     isLoading: isLoadingAudit,
      isError, error} = useList({
    resource : "audits",
    meta : {
      gqlQuery : DASHBOARD_LATEST_ACTIVITES_AUDITS_QUERY
    }, 
  })
  const dealId = auditData?.data?.map((audit)=> {
    return audit?.targetId;
  });

  const {data : deals, isLoading: dataIdLoading} = useList({
      resource : "deals",
      queryOptions : {enabled : !!dealId?.length},
      pagination : {mode : "off"},
      filters : [{field : "id", operator : "in", value : dealId}],
      meta: {
        gqlQuery : DASHBOARD_LATEST_ACTIVITES_DEALS_QUERY
      }
  })
  console.log(deals);
  if(isError){
    console.log(error);
    return null;
  }
  return (
    <Card styles={{
      header : {
   padding : "16px"
      }, body : {
     padding : "0 1rem"
      }
    }}
      title={(
        <div style ={{
        display : "flex",
        alignItems : "center",
        gap: "8px"
      }}>
     <UnorderedListOutlined/>
     <Text size ="sm"
      style = {{
      marginLeft : "10px"
     }}>
     Latest Activity
     </Text>
      </div>
  )}>
      {isLoadingAudit ? (
    <List
    itemLayout ="horizontal"
    dataSource ={ Array.from({length : 5}).map((_, i)=>  i )}
  renderItem={((_, i)=> (
  <Text strong size ="sm">
    Loading ......
  </Text>
  ))}
    />
      ) : (
        <List itemLayout ="horizontal"
        dataSource ={auditData?.data} 
        renderItem={(item)=> {
        const dealData
         = deals?.data.find((deal)=>  deal.id === String(item.targetId)) || undefined 
         return(
          <List.Item>
           <List.Item.Meta title={dayjs(dealData?.created_At)?.format("MMM-DD,YYYY-HH:mm")}
           avatar={<CustomAvatar shape ="square"
        size={48}  src ={dealData?.company?.avatarUrl}
        name ={dealData?.company?.name}/>}
        description ={<Space size={4}>
          <Text strong>
       {item?.user?.name}
      
          </Text>
           <Text>
          {item?.action === "CREATE" ? "created" : "move"}
       </Text>
        <Text strong>
           {dealData?.title || ""}
       </Text>
         <Text strong>
           {item?.data}
       </Text>
                <Text strong>
           {item?.action === "CREATE" ? "in" : "out"}
       </Text>
        <Text strong>
           {dealData?.stage?.title}
       </Text>
        </Space> } />
           </List.Item>
         )
     
        }}
        />
      )}
      </Card>
  )
}
