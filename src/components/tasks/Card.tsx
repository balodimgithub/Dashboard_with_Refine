import { ConfigProvider, theme, Card, MenuProps, Dropdown, Button, Tag, Tooltip, Space } from 'antd'
import {memo, useMemo} from 'react'
import { Text } from '../text';
import { ClockCircleOutlined, DeleteOutlined, EyeOutlined, MoreOutlined } from '@ant-design/icons';
import { User } from '@/graphql/schema.types';
import { TextIcon } from '../Icon/text-icon';
import dayjs from 'dayjs';
import { getDateColor } from '@/utilities';
import { CustomAvatar } from '../custom-avatar';
import { useDelete, useNavigation } from '@refinedev/core';

type ProjectCardProps = {
  id : string,
  title : string,
  updatedAt : string,
  dueDate ?: string,
  users?: {
    id : string,
  name : string,
  avatarUrl ?: User["avatarUrl"]
  }[]
}
export const ProjectCard = ({id,
     title,
      dueDate,
       users}:ProjectCardProps) => {
    const {edit} = useNavigation();



    const {mutate: Delete} = useDelete()
    const {Token} = theme.useToken;
    const dropdownItems = useMemo(()=> {
        const dropdownItems: MenuProps["item"] = [{
            label : "View Card",
            key : "1",
            icon : <EyeOutlined/>,
            onClick : (()=> {
                edit("tasks", id, "replace")
            })},
            {
                danger : true,
                label : "Delete Card",
                key : "2",
                icon : <DeleteOutlined/>,
                onClick : ()=> {
                  Delete({
                    resource : "tasks",
                    id,
                    meta : {
                      operation : "task"
                    }
                  })
                }
            }
        ]
        return dropdownItems;
}, [dueDate])

const dueDateOptions = useMemo(()=> {
if(!dueDate) return null;
const date = dayjs(dueDate);
return {
    color : getDateColor({date : dueDate}) as string,
    text : date.format("MMM-DD")
}
}, [dueDate])
console.log(dueDateOptions);
  return (
    <ConfigProvider theme ={{
        components : {
            Tag : {
                 colorText : Token?.colorTextSecondary
            }, Card : {
                headerBg : "transparent",
            }
        }
    }}>
      <Card style ={{
        height : "200px",
        width : "300px"
      }} size = "small" title =
      {<Text ellipsis = {{tooltip : title}}>
   {title}
      </Text>} 
      onClick = {(()=> edit) }
      extra = {
        <Dropdown trigger = {["click"]}
        menu = {{
            items : dropdownItems || undefined
        }} placement='bottom' arrow= {{pointAtCenter : true}}>
        <Button type ="text"
         shape = "circle"
         icon = {
            <MoreOutlined/>
         }
         style ={{
            transform : "rotate(90deg)"
         }}
         onPointerDown = {(e)=> {
            e.stopPropagation()
         }}
         onClick = {(e)=> {
            e.stopPropagation()
         }}
        />
 </Dropdown>
      }>
  <div style ={{
        display: "flex",
        flexWrap : "wrap",
        alignContent : "center",
        gap : "8px"
    }}>
 <TextIcon style ={{marginRight : "4px"}}/> 
   {dueDateOptions && (
    <Tag icon = {<ClockCircleOutlined style ={{
   fontSize : "12px"  }} />}
    style ={{
        padding : "0px 4px",
      marginInlineEnd: 0,
      backgroundColor : dueDateOptions?.color 
      === "default" ? "transparent" : "unset"
    }}
    color = {dueDateOptions?.color}
    bordered={dueDateOptions?.color !== "default"}
    >
   {dueDateOptions?.text}
    </Tag>
   )}
   {!!users?.length && (
    <Space size = {4} wrap
     direction = "horizontal"
      align = "center"
       style ={{
        display : "flex",
        justifyContent : "center",
        marginRight : 0
    }}>
        {users?.map((user)=> (
            <Tooltip key ={user?.id} title ={user?.name}>
                <CustomAvatar
                 name ={user?.name} 
                 src ={user?.avatarUrl}/>
            </Tooltip>
        ))}
    </Space>
   )}
  </div>
      </Card>
        </ConfigProvider>
  )
}
//Optimizing the app to avoid re-rendering of the list components,
//ensuring the current list isnt re-rendered, even if the parent components chnanges
//i.e if new items are added to the list
export const ProjectCardMemo = memo(ProjectCard, (prev, next)=> {
    return (
        prev?.id === next?.id 
        && prev?.title === next?.title &&
        prev?.updatedAt === next?.updatedAt &&
      prev?.dueDate === next?.dueDate &&
      prev?.users?.length === next?.users?.length

    )
})

