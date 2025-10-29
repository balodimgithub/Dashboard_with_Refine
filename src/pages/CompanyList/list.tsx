import { CustomAvatar } from '@/components/custom-avatar';
import { COMPANY_LIST_QUERY } from '@/graphql/Queries';
import { SearchOutlined } from '@ant-design/icons';
import { CreateButton, FilterDropdown, List, useTable } from '@refinedev/antd'
import { getDefaultFilter, useGo } from '@refinedev/core'
import { Space, Table } from 'antd'
import { Text } from '@/components/text';
import { Company } from '@/graphql/schema.types';
import { currencyNumber } from '@/utilities';
import { EditButton } from "@refinedev/antd";
import { DeleteButton } from  "@refinedev/antd";


export const CompanyListPage = ({children }: React.PropsWithChildren) => {
  const go = useGo()
  const {tableProps, filters } = useTable({
    resource : "companies",
    onSearch : ((values)=> {
   return  [ 
    {field : "name",
    operator : "contains",
    value : values.name
        }
      ]
  }),
    sorters : {
      initial : [{
        field : "createdAt",
        order : 'desc'
      }
      ],
    },
    pagination : {pageSize : 12},
    filters : {
      initial : [{
        field : "name",
        operator : "contains",
        value : undefined
      }]
    },
    
    meta : {
      gqlQuery : COMPANY_LIST_QUERY
    }
  })
  return (
    <div>
    <List breadcrumb={false}
    headerButtons={()=> (
      <CreateButton onClick={(()=> {
        go({
          to : {
            resource : "companies",
          action : "create"
          },
          options : {
            keepQuery : true,
          },
          type : 'replace'
    })
      })}/>
    )}>
       <Table 
       {...tableProps} 
       pagination={{...tableProps.pagination}}>
        <Table.Column<Company> 
        dataIndex="name" title="Company title"
         defaultFilteredValue={getDefaultFilter("id", filters)}
         filterIcon= {<SearchOutlined/>}
          filterDropdown ={((props)=> (
            <FilterDropdown {...props}>
              <input placeholder ="Search Company"/>
              </FilterDropdown>
            
          ))}  render={((value, record)=> (
          <Space>
            <CustomAvatar shape ="square" src ={record?.avatarUrl} name ={record?.name}/>
            <Text style ={{
              whiteSpace : "nowrap"
            }}>
          {record?.name}
            </Text>
          </Space>
  ))} /> 
  <Table.Column<Company>
    dataIndex ="Total Revenue"
    title ="Open deals amount"
    render = {((value, company)=> (
      <Text>
        {currencyNumber(company?.dealsAggregate?.[0]?.sum?.value || 0)}
      </Text>
    ))}
    />
      <Table.Column<Company>
    dataIndex ="id"
    title ="Actions"
    fixed = "right"
    render = {((value)=> (
      <Space>
       <EditButton hideText size = 'small' recordItemId = {value}/>
       <DeleteButton hideText size = 'small' recordItemId = {value}/>
      </Space>
    ))}
    />
   
       </Table>
      </List>
       {children}
       </div>
  )
}

 