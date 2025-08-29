import { Popover, Button } from 'antd';
import React from 'react';

export const CurrentUser = () => {
  return (
    <>
    <Popover placement ="bottomRight"
    trigger ='click'
    overlayInnerStyle={{padding : 0}}
    overlayStyle ={{zIndex: 939}}>
      TEST
    </Popover>
    </>
  )
  
}
