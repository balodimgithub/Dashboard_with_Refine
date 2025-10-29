import React from 'react'
import { Skeleton } from 'antd';

export const KanbanColumnSkeleton = ({children} : React.PropsWithChildren) => {
  return (
<div style ={{
    display : "flex",
    gap : "8px",
   
}}>
    <Skeleton paragraph = {{
        rows : 1,
        width : 200
    }} style ={{
         height : "100px",
         
         marginRight : "10px"
    }}/>
    {children}
      </div>
        
  )
}

