import { SaveButton, useForm } from '@refinedev/antd';
import { HttpError} from '@refinedev/core';
import { GetFields, GetVariables } from '@refinedev/nestjs-query';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Drawer, Card, Spin, Input, Form } from 'antd';
import { getNameInitials} from '@/utilities';
import { UPDATE_USER_MUTATION } from '@/graphql/Mutations';
import { Text } from '../text';
import { CustomAvatar } from '../custom-avatar';
import { UpdateUserMutation, UpdateUserMutationVariables } from '@/graphql/types';
 type Props = {
    isOpened : boolean,
   setIsOpened : (opened : boolean)=> (void),
   userId : string
}


export const AccountSettings = ({isOpened, setIsOpened, userId} : Props) => {
 //useForm in refine is used to manage form in refine. It provides useful props and methods 
    // that are used to manage form
    //https://refine.dev/docs/data/hooks/useform/#usage

    //Save Button contains all the props yto save button
    //FormProps :it is an instance of HTML element which includes actions 
    //and states such as onFinish, onValuesChange
    const {saveButtonProps, formProps, queryResult} = useForm <GetFields<UpdateUserMutation>,
     //The GetFields is is used to get the fields of the mutation
    //in this  case the name, jobTitle of the user.
        //The is to get the HTTP error type that the UpdateUserMutation can 
        //return 
      HttpError,
      //This is the third type parameter used to specify 
      //variables of the updateUserMutation.Meaning the variables 
      //specified must be of the type of UpdateUserMutationVariables
      GetVariables<UpdateUserMutationVariables>>({
        //The Mutation mode is used to determine how the mutation 
        //is being perfprmed e.g optimistic, pessimistic, undoable
    //optimistic: redirection and UI updates are executed immediately
    //  as if the mutation were successful.
        //pesimistic: redirection and UI updates are executed after//mutation are successful
          mutationMode : "optimistic",
          //The resource is used to specify where the mutation
          //is being carried out, if not specified refine carries out
          //mutation based on the path.
          resource : "users",
          //The action is to determine the executable action which
          // is to be carried out on the resource meant to mutated
          action : "edit",
          id: userId,
          //used to provide  any additional information to the dataProvider
          meta : {
            //gql mmutation is used to specify thye mutation that should be performed
            gqlMutation : UPDATE_USER_MUTATION
          }
      })
      const {avatarUrl, name} = queryResult?.data?.data || {};
      const closeModal =()=> {
        setIsOpened(false)
      }
//if query is processing.show a landing indicator.
if(queryResult?.isLoading){
    return(
        <Drawer open ={isOpened}
        width={756}
        styles={{
            body :{
                backgroundColor : "#f5f5f5",
                display : "flex",
                alignItems : "center",
                justifyContent :"center"
            }
        }}
        >
            <Spin/>
        </Drawer>
    )

}
     

       

    

  return (
  <Drawer
   onClose={closeModal}
   open ={isOpened}
   width ={756}
   styles ={{
    body :{
        backgroundColor : "#f5f5f5",
        padding : 0,
    },
      header : {display : "none"}
   }}>
    <div
    style ={{
        display : "flex",
        alignItems : "center",
        justifyContent : "space-between",
        padding : "16px",
        backgroundColor : "#fff"
    }}>
   <Text strong>
    Account Settings
    </Text>
    <Button type="text"
    icon ={<CloseOutlined/>}
    onClick ={()=> closeModal()}
    />
    </div>
  <div style={{
    padding : "16px",

  }}>
   <Card>
    <Form {...formProps}
    layout ="vertical">
   <CustomAvatar
   shape ='square'
   src={avatarUrl}
   name={getNameInitials(name || "")}
   style ={{
    width:  96,
    height : 90,
    marginBottom : 24
   }}
   />
   <Form.Item label ="Name" name="name">
    <Input placeholder ="Name"/>
    </Form.Item>
     <Form.Item label ="Email" name="email">
    <Input placeholder ="email"/>
    </Form.Item>
      <Form.Item label ="Job title" name="jobTitle">
    <Input placeholder ="jobTitle"/>
    </Form.Item>
       <Form.Item label ="Phone" name="phone">
    <Input placeholder ="Timezone"/>
    </Form.Item>
    
     </Form>

     <SaveButton {...saveButtonProps}
   
        style ={{
            display : "block",
             marginLeft  : "auto"
        }}/>
   
   </Card>
</div>
   
    

  </Drawer>
  )
}
