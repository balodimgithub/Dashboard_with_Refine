import { Skeleton } from 'antd';

export const AccordionHeaderSkeleton = () => {
  return (
    <div style ={{
        display : "flex",
        alignItems : "center",
        gap : "8px",
        padding : "20px 5px",
        width : "100%",
        justifyContent : "",
        
    }}>
         
         <Skeleton.Input size = "small" block style ={{
            height : "22px"
         }}/>
         <Skeleton.Avatar size = "small" shape = "square"/>
        </div>
  )
}

