import React from 'react';
import { CompanyListPage } from './list';
import {useModalForm, useSelect} from "@refinedev/antd"
import { useGo } from '@refinedev/core';
import { Form, Modal, Select } from "antd";
import { CREATE_COMPANY_MUTATION } from '@/graphql/Mutations';
import { USERS_SELECT_QUERY } from '@/graphql/Queries';
import { SelectOptionWithAvatar } from '@/components/select-option-with-avatar';
import { UsersSelectQuery } from '@/graphql/types';
import { GetFieldsFromList } from '@refinedev/nestjs-query';

export const CreateCompany = () => {
    const go = useGo();
    const {selectProps, queryResult} = useSelect({
      resource : "users",
      optionLabel  : "name",
      meta : {
        gqlQuery : USERS_SELECT_QUERY
      }
     
    })
    // A function which helps us navigate the user back to 
    // the companies list default page of the companies /companies 
    //parent route.
    const goToListPage = ()=> {
    go({
        to : {
resource : "companies",
action : "list",
        },
options: { keepQuery : true},
type : "replace"
    
})
   }
    const  {formProps, modalProps} = useModalForm({
        action : "create",
        defaultVisible : true,
         redirect : false,
       mutationMode : "pessimistic",
    resource : "companies",
   onMutationSuccess : goToListPage,
    meta : {
            gqlMutation : CREATE_COMPANY_MUTATION
        }
    })
  return (
    <CompanyListPage>
         <Modal
         {...modalProps}
          mask = {true}
          onCancel = {goToListPage}
          title ="Create Company"
          width ={512}>
           <Form style ={{
             display : "flex",
           flexDirection : "column",
           gap : "5px"
           }}
            {...formProps} layout ="horizontal"
>
    <Form.Item style={{
      width :  "100%",
      height : "100px",
      display : "flex",
      alignItems : "start",
      justifyContent : "center",
      flexDirection  : "column",
     gap : "5px"
    }}
    label = "Company name" 
    name = "name" 
    rules = {[{required : true}]}>
       <input style ={{
        width : "100%",
        height : "50px",
       borderRadius : 12,
        borderColor : "#000"
       }}
       type="text" 
       placeholder ="Please enter a company name" />
    
    </Form.Item>
    <Form.Item label ="sales owner" name="salesOwnerId"
    rules ={[{required : true}]}>
 <Select<GetFieldsFromList<UsersSelectQuery>>
   {...selectProps}
  placeholder ="please select a sales owner"
  options ={
    queryResult?.data?.data?.map((user)=> (
      {
       value : user?.id,
       label : (
       <SelectOptionWithAvatar
        name ={user?.name ?? undefined} avatarUrl = {user?.avatarUrl ?? undefined} shape={user?.shape}/>
       )
      }
    ))
  } />
    </Form.Item>
     
</Form>
         </Modal>
         </CompanyListPage>
  )
}

