import { DollarOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import  {useMemo}  from 'react';
import { Text } from '../text';
import { Area,type  AreaConfig } from '@ant-design/plots';
import { useList } from '@refinedev/core';
import { DASHBOARD_DEALS_CHART_QUERY } from '@/graphql/Queries';
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import { DashboardDealChartQuery } from '@/graphql/types';
import { mapDealsData } from './utils';


export const DealsChart = () => {
 const {data} = useList<GetFieldsFromList<DashboardDealChartQuery>>({
  resource : "dealStages",
  filters : [{
    field : "title",
    operator : "in",
    value : ["WON", "LOST"]
  },
],
  meta : {
   gqlQuery : DASHBOARD_DEALS_CHART_QUERY
  }
 })

const dealData = (useMemo(()=> {
  return data?.data ?  mapDealsData(data?.data) : [];
}, [data?.data] ));
 
   const config: AreaConfig = {
    data : dealData,
    xField : "timeText",
    yField : "value",
    isStack  : false,
     seriesField  :"state",
     startOnZero : false,
      animation  :true,
      smooth : true,
      legend : {
        offsetY : -6,
      },
      yAxis : {
        tickCount : 4,
        label : {
          formatter : ((v : string)=> {
            return `$${Number(v)/ 1000}K`
          })
        }
      },
      tooltip : {
        formatter : (data)=> {
     return { 
      name : data?.state,
      value : `${Number(data.value)/ 100}K`
        }
      }, 
   

 },
    areaStyle: (data)=> {
      const won = "l(270) ):#ffffff 0.5:#b7eb8f 1:#52c41a";
      const lost = "l(270) 0:#ffffff 0.5:#f3b7c2 1:#ff4d4f";
      return {fill : data.state === "Won" ? won : lost}
      },
      color : (data)=> {
        return data.state === "Won" ? "#52c41A" : "#F5222D"
      }
   }
  // alert(data);
  return (
    <Card style ={{
      height : "100%",
    }} 
    styles= {{
      header :{
        padding : "8px 16px"
      },
      body : {
        padding :  "24px 0px"
      }
    }}
    title = {
    <div style ={{
      display : "flex",
      alignItems : "center",
      gap : "5px"
    }}
    >
        <DollarOutlined/>
         <Text size = "sm" style = {{ marginLeft : "0.5rem" }}> Deals</Text>
    </div>}>
      <Area {...config} height = {325} />
        </Card>
  )
}
