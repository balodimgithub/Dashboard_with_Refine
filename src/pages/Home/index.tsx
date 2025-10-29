import React from 'react';

import { Col, Row } from 'antd';
import { UpcomingEvents,DealsChart, DashboardLatestActivities } from '@/components/Home';
import { DASHBOARD_TOTAL_COUNTS_QUERY } from '@/graphql/Queries';
import { useCustom } from '@refinedev/core';
import { DashboardTotalCountsQuery } from '@/graphql/types';
import { DashboardTotalCountCard } from '@/components/Home';
export const Home = () => {
  const {data, isLoading} = useCustom<DashboardTotalCountsQuery>({
    url: "",
    method :"get",
    meta : {
   gqlQuery : DASHBOARD_TOTAL_COUNTS_QUERY
    }

    
  })
  return (
<div>
  <Row gutter ={[32, 32]}>
   <Col  xs= {24}
   sm =  {24}
   xl ={8}
   style ={{
   height : "80px"
   }}>
    <DashboardTotalCountCard
     resource = "companies" 
     isLoading ={isLoading} 
     totalCount ={data?.data?.companies?.totalCount || 0}/>
   </Col>
    <Col  xs= {24}
   sm =  {24}
   xl ={8}
   style ={{
   height : "80px"
   }}>
    <DashboardTotalCountCard 
     resource = "contacts" 
     isLoading ={isLoading} 
     totalCount ={data?.data?.contacts?.totalCount || 0} />
   </Col>
    <Col xs= {24} sm = {24} xl ={8}
    style ={{
   height : "80px"
   }}>
    <DashboardTotalCountCard
     resource = "deals" 
     isLoading ={isLoading} 
     totalCount ={data?.data?.deals?.totalCount || 0} />
   </Col>
  </Row>

<Row gutter={[
  32,32]}
style ={{
  marginTop : "32px"
}}>
  <Col
   xs= {24}
   sm =  {24}
   xl ={8}
   style ={{
   height : "460px"
   }} >
<UpcomingEvents/>
  </Col>
   <Col
   xs= {24}
   sm =  {24}
   xl ={16}
   style ={{
   height : "460px"
   }} >
   <DealsChart/>
  </Col>
 
</Row>
 <Row gutter ={[32,32]} style ={{
    marginTop : "32px",

  }}>
   <Col xs = {24}>
   <DashboardLatestActivities/>
   </Col>
  </Row>
  </div>
  )
}
