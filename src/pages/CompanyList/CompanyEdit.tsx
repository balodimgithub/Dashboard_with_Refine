import React from 'react';
import { Row, Col, Form , InputNumber, Input} from 'antd';
import {Edit} from  "@refinedev/antd";
import { useForm } from '@refinedev/antd';
import {UPDATE_COMPANY_MUTATION} from "@/graphql/Mutations";
import {CustomAvatar} from "@/components/custom-avatar";
import {getNameInitials} from "@/utilities";
import { Select } from 'antd';
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import { UsersSelectQuery } from '@/graphql/types';
import { SelectOptionWithAvatar } from '@/components/select-option-with-avatar';
import {useSelect} from "@refinedev/antd";
import { USERS_SELECT_QUERY } from '@/graphql/Queries';
import {ContactTable} from "./Contact-table";


export const CompanyEdit = () => {
    const { saveButtonProps, formProps, formLoading,queryResult } = useForm({
       redirect : false,
   meta: {
   gqlMutation : UPDATE_COMPANY_MUTATION
        }})
    const {avatarUrl, name} = queryResult?.data?.data || {};
    const {selectProps, queryResult : queryResultUsers} = useSelect<GetFieldsFromList<UsersSelectQuery>>({
        resource : "users",
        pagination : {mode : "off"},
        optionLabel : "name",
        meta : {
          gqlQuery : USERS_SELECT_QUERY 
        }
    })
  
   const industryOptions = [
  { label: "Agriculture", value: "agriculture" },
  { label: "Banking & Financial Services", value: "banking-finance" },
  { label: "Construction & Real Estate", value: "construction-real-estate" },
  { label: "Consumer Goods", value: "consumer-goods" },
  { label: "Energy & Utilities", value: "energy-utilities" },
  { label: "Healthcare & Pharmaceuticals", value: "healthcare-pharma" },
  { label: "Information Technology (IT)", value: "information-technology" },
  { label: "Telecommunications", value: "telecommunications" },
  { label: "Transportation & Logistics", value: "transport-logistics" },
  { label: "Manufacturing & Industrial", value: "manufacturing" },
  { label: "Media & Entertainment", value: "media-entertainment" },
  { label: "Mining & Natural Resources", value: "mining-natural-resources" },
  { label: "Retail & E-commerce", value: "retail-ecommerce" },
  { label: "Education & Training", value: "education-training" },
  { label: "Hospitality & Tourism", value: "hospitality-tourism" },
  { label: "Insurance", value: "insurance" },
  { label: "Aerospace & Defense", value: "aerospace-defense" },
  { label: "Public Sector & Government", value: "public-sector" },
  { label: "Environmental & Sustainability", value: "environmental" },
  { label: "Technology & Innovation", value: "technology-innovation" }
];
     const businessTypeOptions = [
  { label: "Business to Business (B2B)", value: "b2b" },
  { label: "Business to Consumer (B2C)", value: "b2c" },
  { label: "Business to Government (B2G)", value: "b2g" },
  { label: "Consumer to Consumer (C2C)", value: "c2c" },
  { label: "Consumer to Business (C2B)", value: "c2b" },
  { label: "Direct to Consumer (D2C)", value: "d2c" },
  { label: "Business to Business to Consumer (B2B2C)", value: "b2b2c" },
  { label: "Government to Business (G2B)", value: "g2b" },
  { label: "Government to Citizen (G2C)", value: "g2c" },
  { label: "Nonprofit / NGO", value: "nonprofit" },
  { label: "Franchise", value: "franchise" },
  { label: "E-commerce Platform", value: "ecommerce-platform" },
  { label: "Subscription-based Business", value: "subscription-based" },
  { label: "Marketplace", value: "marketplace" },
  { label: "Service-based Business", value: "service-based" }
];
  const topFirmOptions = [
  { label: "Dangote Cement Plc (Nigeria / Africa)", value: "dangote-cement" },
  { label: "Apple Inc. (USA)", value: "apple" },
  { label: "Royal Bank of Canada (Canada)", value: "royal-bank-of-canada" },
  { label: "Shell PLC (United Kingdom)", value: "shell-plc" },
  { label: "Microsoft Corporation (USA)", value: "microsoft" },
  { label: "MTN Group Limited (South Africa / Africa)", value: "mtn-group" },
  { label: "Unilever PLC (United Kingdom)", value: "unilever" },
  { label: "Amazon.com Inc. (USA)", value: "amazon" },
  { label: "Shopify Inc. (Canada)", value: "shopify" },
  { label: "Naspers Limited (South Africa / Africa)", value: "naspers" },
  { label: "Tesla Inc. (USA)", value: "tesla" },
  { label: "Vodacom Group (South Africa / Africa)", value: "vodacom" },
  { label: "Barclays PLC (United Kingdom)", value: "barclays" },
  { label: "Brookfield Asset Management (Canada)", value: "brookfield" },
  { label: "Berkshire Hathaway Inc. (USA)", value: "berkshire-hathaway" },
  { label: "Standard Bank Group (South Africa / Africa)", value: "standard-bank" },
  { label: "HSBC Holdings PLC (United Kingdom)", value: "hsbc" },
  { label: "Magna International Inc. (Canada)", value: "magna-international" },
  { label: "Coca-Cola Company (USA)", value: "coca-cola" },
  { label: "FirstRand Limited (South Africa / Africa)", value: "firstrand" }
];

  return (
    <div>
    <Row gutter = {[32, 32]}>
    <Col xs = {24} xl = {12}>
    <Edit {...formProps} 
    isLoading ={formLoading}
     saveButtonProps ={saveButtonProps}
     breadcrumb = {false}>
     <Form {...formProps} layout ="vertical">
     <CustomAvatar shape= "circle"
      src = {avatarUrl}
       name={getNameInitials(name || "") }
       style ={{
        width : 96,
        height : 96,
         marginBottom :"24px"
       }}/>

     <Form.Item label ="sales owner" name="salesOwnerId"
        initialValue={formProps?.initialValues?.salesOwner?.id}>
      <Select<GetFieldsFromList<UsersSelectQuery>>
        {...selectProps}
       placeholder ="please select a sales owner"
       options ={
         queryResultUsers?.data?.data?.map((user)=> (
           {
            value : user?.id,
            label : (
            <SelectOptionWithAvatar
             name ={user?.name ?? undefined} avatarUrl = {user?.avatarUrl ?? undefined} shape={user?.shape}/>
            )
           }
         )) ?? []
       } />
         </Form.Item>
           <Form.Item  label = "Company">
            <Select options = {topFirmOptions} />
          </Form.Item>
          <Form.Item>
            <InputNumber
              autoFocus 
               addonBefore= "$"
               minValue = {0}
               placeholder = "0.00"
            />
          </Form.Item>
          
           <Form.Item label = "Industry" name = "industry">
            <Select options ={industryOptions}/>
          </Form.Item>

          <Form.Item label ="Business Type" name = "businessType">
            <Select options = {businessTypeOptions}/>
          </Form.Item>

             <Form.Item label = "Country" name = "country">
            <Input placeholder ="Country" />
          </Form.Item>

             <Form.Item label ="Website" name = "website">
             <Input placeholder ="Website" />
          </Form.Item>
   </Form>
   </Edit>
    </Col>
       

      <Col xs={24} xl ={12}>
      <ContactTable/>
      </Col>
       </Row>
       
        </div>
  )
}
