import { Popover, Button } from 'antd';
import React from 'react';
import { CustomAvatar } from '../custom-avatar';
import { useGetIdentity } from '@refinedev/core';
import type {User}  from "@/graphql/schema.types.ts";
import { Text } from '../text';
import { SettingOutlined } from '@ant-design/icons';
import { AccountSettings } from './account-settings';
import { AccordionHeaderSkeleton } from '../Skeleton/accordion-header-skeleton';

export const CurrentUser = () => {
  const [isOpen, setIsOpen] =React.useState(true)
  const {data : user} = useGetIdentity <User>();
   const content = (
    <div style ={{
      display :"flex",
      flexDirection :"column",
      height  : "100px"
 }}>
  <Text
  strong 
  style ={{
    padding : "12px 20px"
  }}>
  {user?.name}
  <div
  style ={
    {
      borderTop : "1px solid #d9d9d9",
    padding : "4px",
    display : "flex",
    flexDirection : "column",
    gap : "4px"
  }}>
    <Button
    style ={{
      textAlign : "left",
    }} icon ={<SettingOutlined/>}
    type ="text"
   onClick ={()=> {
   setIsOpen(true)
   }}
    >
 Account Settings
    </Button>
  </div>
  </Text>
    </div>
   )
if(!user?.id) return(
    <div style ={{
      marginTop : "50px"
    }}>
  <AccordionHeaderSkeleton/>
    </div>
) 
  return (
    <>
    <Popover placement ="bottomRight"
    trigger ='click'
    overlayInnerStyle={{padding : 0}}
    overlayStyle ={{zIndex: 999}}
     content ={content}>
         <CustomAvatar name={user?.name}
         src= {user?.avatarUrl}
         size="default"
         style={{cursor : "pointer"}}
        />
    </Popover>
    {user && ( <AccountSettings 
    isOpened ={isOpen} 
    setIsOpened ={setIsOpen}
     userId ={user?.id || ""}
      />)}
    </>
  )
  
}

