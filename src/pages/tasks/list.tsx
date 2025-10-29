import React from "react";
import {KanbanBoardContainer, KanbanBoard} from "@/components/tasks/kanban/board"
import { KanbanColumn } from "@/components/tasks/kanban/Column";
import { KanbanItem } from "@/components/tasks/kanban/KanbanItem";
import { TASK_STAGES_QUERY, TASKS_QUERY } from "@/graphql/Queries";
import {useList, useUpdate, useNavigation} from "@refinedev/core";
import { TaskStage } from "@/graphql/schema.types";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import { TasksQuery } from "@/graphql/types";
import { ProjectCardMemo } from "@/components/tasks/Card";
import { KanbanAddCardButton } from "./add-card-button";
import { ProjectCardSkeleton } from "@/components/Skeleton/Skeleton-body";
import { KanbanColumnSkeleton } from "@/components/Skeleton/KanbanColumnSkeleton";
import { DragEndEvent } from "@dnd-kit/core";
import { UPDATE_TASK_STAGE_MUTATIONS } from "@/graphql/Mutations";



export const List = ({children}: React.PropsWithChildren)=> {
  const {data: stages, isLoading : isLoadingStages} = useList<TaskStage>({
    resource : "taskStages",
     filters : [{
      field : "title",
      operator : "in",
      value : ["TO DO", "IN PROOGRESS", "IN REVIEW", "DONE"]
    }],
  
    sorters : [
    {
      field : "createdAt",
      order : "asc"
    }
    ],
 
    meta : {
      gqlQuery : TASK_STAGES_QUERY
    
  }})
  const {replace} = useNavigation();
        const {mutate : updateTask} = useUpdate()
  const {data : tasks, isLoading : isLoadingTask} = useList<GetFieldsFromList<TasksQuery>>({
    resource : "tasks",
      pagination : {
      mode : "off"
    },
    sorters :[ {
   field : "dueDate",
   order : "asc"
    }],
    queryOptions : {
      enabled : !!stages
    },
    meta : {
      gqlQuery : TASKS_QUERY
    }
  });
  const taskStages = React.useMemo(()=> {
      if(!tasks?.data || !stages?.data){
        return {
          unassignable : [],
          stages : []
        }
      }
 



  const unassignedStage  = tasks?.data?.filter((task)=> (
    task.stageId === null
))
 
  const grouped : TaskStage[] = stages?.data?.map((stage) => ({
       ...stage,
   tasks : tasks?.data?.filter((task)=> task?.stageId?.toString() === stage.id)
  }))
  
return {
  unassignedStage,
  columns : grouped,

}
   }, [stages, tasks])
console.log(taskStages?.unassignedStage);

   const handleAddCard = (args : {stageId : string})=> {
    const path = args?.stageId === "unassigned"
     ? "/taksks/new" : `/tasks/new?stageId=${args?.stageId}`
   };
 const isLoading = isLoadingStages || isLoadingTask;
 if(isLoading) return <PageSkeleton/>
 //The function help move the tasks from the current stage
 //of the task to another either from unassigned to TO-DO or anything else
 const handleDragEvent = (event : DragEndEvent)=> {
   let stageId = event?.over?.id as undefined | string | null;
   const taskId = event?.active?.id
   const taskStageId = event?.active?.data?.current?.stageId;
   if(taskStageId === stageId) return;

   if(stageId === "unassigned"){
    stageId = null
   }
   updateTask({
     resource : "tasks",
     id : taskId,
     values :{
stageId : stageId
     },
     mutationMode : "optimistic",
     successNotification: false,
     meta : {
      gqlMutation : UPDATE_TASK_STAGE_MUTATIONS
     }
   })
 }

    return(
         <KanbanBoardContainer>
      <KanbanBoard onDragEvent= {handleDragEvent}>
      <KanbanColumn id ="unassigned"
  title={"unassigned"} 
  count = {taskStages?.unassignedStage?.length || 0}
  onAddClick ={()=> handleAddCard({stageId:  "unassigned"})}>
    {taskStages?.unassignedStage?.length
     ?( taskStages?.unassignedStage.map((task)=>{
      return <div>
       
      <KanbanItem key ={task?.id} id ={task?.id}
      data = {{...task, stageId : "unassigned"}}>
 <ProjectCardMemo {...task} 
 dueDate = {task.dueDate || undefined} />
      </KanbanItem>
      </div>
})

) :( 
     <KanbanAddCardButton onClick = {()=> handleAddCard({stageId : "unassigned"})}/> 
)}
      </KanbanColumn>

     
    {taskStages?.columns?.map((column)=> (
      <KanbanColumn 
      key = {column?.id} 
      id = {column?.id}
      title={column?.title} 
      count = {column?.tasks?.length}
       onAddClick = {()=> handleAddCard({stageId : column?.id})} >
   {!isLoading && column?.tasks?.map((task) => (
    <KanbanItem key = {task?.id} id ={task?.id}>
      <ProjectCardMemo {...task} dueDate ={task?.dueDate || undefined}
       title ={task?.title} id ={task?.id} users={task?.users} />
      </KanbanItem>
   ))}
        </KanbanColumn>
    ))}
    {!taskStages?.columns?.length &&(
       <KanbanAddCardButton onClick = {()=> handleAddCard({stageId : "unassigned"})}/> 
    )}
   
        </KanbanBoard>
    </KanbanBoardContainer>

   
    )
}

const PageSkeleton = ()=> {
  const columnCount = 6;
  const itemCount = 4;
  return (
    <KanbanBoardContainer>
     
      {Array.from({length : columnCount}).map((_, index)=> (
           <KanbanColumnSkeleton key ={index}>
            {Array.from({length : itemCount})?.map((_, index)=> (
              <ProjectCardSkeleton key ={index}/>
            ))}
         <ProjectCardSkeleton key = {index}/>
         </KanbanColumnSkeleton>
      ))}
    
    </KanbanBoardContainer>
  )
} 