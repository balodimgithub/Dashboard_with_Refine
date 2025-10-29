import gql from "graphql-tag";


//Mutations to update user
export const UPDATE_USER_MUTATION = gql`
# The ! after the type means that it is required
mutation UpdateUser($input: UpdateOneUserInput!){
 # call the updateOneUser mutation with the input  and pass the 
 # $variableName is a convention for GraphQL variables
 updateOneUser(input: $input){
 id
 name
 avatarUrl
 email
 phone
 jobTitle
 }
}
`;

//Mutation to create  acomoany
export const CREATE_COMPANY_MUTATION = gql`
  mutation CreateCompany($input: CreateOneCompanyInput!){
  createOneCompany(input: $input){
  id
  salesOwner{
    id
  }
}
 }
`;

export const UPDATE_COMPANY_MUTATION = gql`
mutation UpdateCompany($input : UpdateOneCompanyInput!){
  updateOneCompany(input : $input){
    id
    name
    totalRevenue
    industry
    companySize
    businessType
    country
    website
    avatarUrl
    salesOwner{
      id
      name
      avatarUrl
    }


  }
}
`;

export const UPDATE_TASK_MUTATION = gql`
 # The ! after the type means that it is required
mutation UpdateTask($input: UpdateOneTaskInput!){
updateOneTask(input : $input){
id
title
completed
description
dueDate
stage{
id
title
}
users{
id
name
avatarUrl
}

checklist{
title
checked
}
}
}
`;

export const UPDATE_TASK_STAGE_MUTATIONS = gql`
  mutation UpdateTaskStage($input : UpdateOneTaskInput!){
    updateOneTask(input : $input){
      id
    }
  }
`

