import { useDroppable, UseDroppableArguments } from "@dnd-kit/core"
import { Badge, Space, Button } from "antd"
import { Text } from "@/components/text"
import { PlusCircleOutlined } from "@ant-design/icons"
type Props = {
    id : string,
    title: string,
    description ?: React.ReactNode,
    count : number,
    data?: UseDroppableArguments["data"],
    onAddClick ? :(args : {id : string}) => void

 }

export const KanbanColumn = ({children
      ,id,
     title,
      description,
      count,
      data, 
    onAddClick
} : React.PropsWithChildren<Props>)=> {
    const {isOver, setNodeRef, active} = useDroppable(
       {
         id, data
        }
    )
const onhandleClickHandler=()=>{
    onAddClick?.({id})
   }
    return (
        <div ref ={setNodeRef}
        style ={{
            display : "flex",
            flexDirection : "column",
            padding : "0px 16px"
        }}>
<div style ={{
    padding :"12px"
}}>
<Space style ={{
    width : "100%",
     justifyContent : "space-between"
}}>
    <Space><Text title ={title}
     ellipsis = {{tooltip : true}}
     size = "xs" strong style = {{
        textTransform : "uppercase"
     }}>
      TITLE TO DO
    </Text>
    {!!count && <Badge count = {count} color  ="cyan"/>}
    {title}
    </Space>
    <Button shape = "circle"
     icon ={<PlusCircleOutlined/>}
      onClick={onhandleClickHandler}/>
     {description}
</Space>

</div>
<div style ={{
     flex : 1,
    overflowY : active ? "unset" : "auto", 
    border : "2px dashed transaparent",
    borderColor : isOver ? "#000040" : "transparent",
    borderRadius : "4px"
}}>
    <div style ={{
        marginTop : "12px",
     display : "flex",
     flexDirection : "column",
     gap : "10px"
    }}>
  {children}
    </div>
  
</div>
        </div>
    )
}