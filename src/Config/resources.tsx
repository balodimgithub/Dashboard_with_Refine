import { DashboardOutlined, ShopOutlined, ProjectOutlined } from "@ant-design/icons";
import { IResourceItem } from "@refinedev/core";

export const resources : IResourceItem[] = [

//A resource in refine performs all these actions.
// List : list of records retrieved (read)
//show: Records returned explicitly single recors (read)
//edit : Records updated (update)
//create: Records created (created)
//Delete: Records cloned
  {
    name : "dashboard",
    list : "/",
    meta : {
        label : "DASHBOARD",
        icon : <DashboardOutlined/>
    }
},
{name : "companies", 
    list :"/companies", 
    show : "companies/:id",
    create : "companies/new",
    edit : "companies/edit/:id",
    meta :{
        label : "COMPANY",
        icon : <ShopOutlined/>
    }
},
{name : "tasks", 
    list :"/tasks", 
    create : "tasks/new",
    edit : "task/edit/:id",
    meta :{
        label : "TASK",
        icon : <ProjectOutlined/>
    }
}
];