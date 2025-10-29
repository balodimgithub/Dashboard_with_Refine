import { Skeleton } from "antd";

export const ProjectCardSkeleton= ()=> {
    return (
      
<Skeleton paragraph= {{
    rows : 5,
    width : [200]
}} style ={{
    height : "200px",
    width : "200px",
    marginBottom : "10px"
}}/>
   
    )
}