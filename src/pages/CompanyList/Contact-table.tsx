import React from 'react';
import {  Form, 
  Table ,
   Space, 
   Select,
    Button,
     Card, Input} from "antd"
import {useTable,  FilterDropdown, List} from "@refinedev/antd";
import {COMPANY_CONTACT_TABLE_QUERY} from "@/graphql/Queries";
import {CompanyContactsTableQuery} from "@/graphql/types"
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import {Text} from  "@/components/text";
import {getDefaultFilter} from "@refinedev/core";
import { SearchOutlined, PhoneOutlined, MailOutlined, TeamOutlined } from '@ant-design/icons';
import {CustomAvatar} from "@/components/custom-avatar";
import {useParams} from "react-router-dom";
import {ContactStatusTag} from "@/components/tags/contact-status-tag"


type Contact = GetFieldsFromList<CompanyContactsTableQuery>

export const ContactTable = () => {
const params = useParams()
  const {tableProps} = useTable<Contact>({
       resource : "contacts",
       syncWithLocation : false,
        meta : {
        gqlQuery : COMPANY_CONTACT_TABLE_QUERY
       }, 
       sorters : {
        initial : [
          {
            field : "createdAt",
            order : "desc"
          }
        ]
       }, 
       filters : {
        initial : [
          {
            field : "jobTitle",
            value : "",
            operator : "contains"
          },
          {
            field : "name",
            value : "",
            operator : "contains"
          }
        ],
        permanent : [
          {
            field : "company.id",
            operator : "eq",
            value : params?.id as string
          }
        ]
      }
  })
 
console.log(params?.id);
  return (
       
        <Card
        styles ={{
          header: {
            borderBottom : "1px solid #D9D9D9",
            marginBottom : "1px"
          },
          body : {
         padding : 0
          }
        }} title ={
    <Space size = "middle">
        <TeamOutlined/>
        <Text>
          Contacts
        </Text>
      </Space>
        }
        extra ={
          <>
          <Text className ="tertiary">
          Total Contacts:
          </Text>
          <Text strong>
            {tableProps?.pagination !== false && tableProps.pagination?.total}
          </Text>
          </>
        }>
        <Table 
              {...tableProps} 
              pagination={{...tableProps.pagination,
                showSizeChanger : false

              }}>
               <Table.Column<Contact>
               dataIndex="name" title="Name"
             render={((_, record)=> (
                 <Space>
                   <CustomAvatar shape ="square" src ={record?.avatarUrl} 
                   name ={record?.name}/>
                   <Text style ={{
                     whiteSpace : "nowrap"
                   }}>
                 {record?.name || ""}
                   </Text>
                 </Space>
         ))}
           filterIcon = {<SearchOutlined/>}
           filterDropdown = {(props)=> (
            <FilterDropdown {...props}>
              <Input placeholder ="Search Name"/>
            </FilterDropdown>
           )}
         /> 
          <Table.Column
          title ="Title"
          dataIndex = "jobTitle"
          filterIcon = {<SearchOutlined/>}
          filterDropdown ={(props)=> (
            <FilterDropdown {...props}>
              <Input placeholder = "Search for Job  Title"/>
            </FilterDropdown>
          )}
          />
          <Table.Column<Contact>
              dataIndex ="status"
              title ="Stage"
              render = {(_,record)=> {
                return <ContactStatusTag status = {record?.status}/>
              }}
              filterDropdown = {(props)=> (
                <FilterDropdown {...props}>
                  <Select style ={{ width : "200px" }}
                  mode = "multiple"
                  placeholder = "Select Stage"
                  options = {statusOptions}/>
                </FilterDropdown>
              )}
            />
          <Table.Column<Contact>
             dataIndex = "id"
             width ={112}
             render = {(value, record)=> {
              return (
                <Space>
                   <Button size = "small"
                   href = {`mailto: ${record?.email}`}
                   icon = {<MailOutlined/>}/>
                     <Button size = "small"
                   href = {`tel: ${record?.phone}`}
                   icon = {<PhoneOutlined/>}/>
                </Space>
              )
             }}
          />
              </Table>
           
             
              </Card>
  )
}

const statusOptions : {
  label : string,
  value : Contact["status"];
}[] = [
  {label : "New", value : "New"},
  {label : "Qualified", value : "Qualified"},
  {label : "Unqualified", value : "Unqualified"},
  {label : "Won", value : "Won"},
  {label : "Negitiations", value : "NEGOTIATIONS"},
  {label : "Lost", value : "LOST"},
  {label : "Interested", value : "INTERESTED"},
  {label : "Contacted", value : "CONTACTED"},
  {label : "Churned", value : "CHURNED"}
]
