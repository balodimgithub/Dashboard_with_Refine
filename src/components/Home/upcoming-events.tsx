import { Badge, Card } from 'antd'
import React from 'react'
import { CalendarOutlined } from '@ant-design/icons'
import { Text } from '../text'
import { List } from 'antd';
import { useList } from '@refinedev/core';
import { DASHBOARD_CALENDAR_UPCOMINNG_EVENTS_QUERY } from '@/graphql/Queries';
import dayjs from 'dayjs';



export const UpcomingEvents = ()  => {
    
  const {data, isLoading } = useList({
     resource :"events",
     pagination : {pageSize : 5},
     sorters : [{
        field : "startDate",
        order :  "asc"
     }],
    //  filters : [{
    //  field : "startDate",
    //     operator : "gte",
    //    value :  dayjs().format('MMM-DD-YYYY')
    //    }
    //   ],
     meta : {
        gqlQuery : DASHBOARD_CALENDAR_UPCOMINNG_EVENTS_QUERY
     }
  })

  return (
    <Card style ={{
        height : "100%"
    }}
    styles={{
        body :{
            padding : "8px 16px"
        },
       header : {
        padding : "0 1rem"
       }
    }}> 
       <div style ={{
        display : "flex",
        alignItems : "center",
        gap:"8px"
       }}>
        <CalendarOutlined/>
        <Text size ="sm" 
        style={{marginLeft : "0.7rem"}}>
            Upcoming Events
        </Text>
        </div>
        {isLoading  ? (
            <List itemLayout= 'horizontal'
            dataSource ={Array.from({length : 5}).map((_, index)=> ({
                id :index,
              }))}
          >
            <p>Loading.....</p>
        </List>
        )
        : (
            <List itemLayout='horizontal'
            dataSource = {data?.data || []}
            renderItem={(item)=> {
                return (
                    <List.Item>
            <List.Item.Meta avatar={<Badge color ={item.color}/>}
               title={<Text size="xs"> {item.startDate}</Text>}
            description ={<Text strong ellipsis ={{tooltip : true}}>
                {item.title}
            </Text>}/>
            </List.Item>
                )
         }}
         
           />
               

        )
        }
            {(!isLoading && data?.data?.length === 0) && (
                    <p style ={{
                        display : "flex",
                        alignItems : "center",
                        justifyContent : "center",
                        height : "100%"
                    }}>
                        No Upcoming events.
                    </p>
                ) }
        </Card>
  )
}

