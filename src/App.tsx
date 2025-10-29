import { Authenticated, GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar,RefineKbarProvider } from "@refinedev/kbar";
import {Home, ForgotPassword, Login,Register} from "./pages";


import {
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import { Layout } from "./components/Layout";

import {dataProvider, authProvider, liveProvider} from "./provider";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp } from "antd";
import { BrowserRouter,Outlet,  Route, Routes } 
from "react-router-dom";
import { resources } from "./Config/resources";
import { CompanyListPage } from "./pages";
import { CreateCompany } from "./pages/CompanyList/CreateFile";
import {CompanyEdit, List} from "./pages";
import { EditTask } from "./pages/tasks/EditTask";
import { CreateTask } from "./pages/tasks/CreateTask";


// import { HomeFilled } from "@ant-design/icons";

function App() {
  return (
    <BrowserRouter>
     
      <RefineKbarProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
               dataProvider = {dataProvider}
               liveProvider = {liveProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources = {resources}
                // resources={[
                //   {
                //     name: "blog_posts",
                //     list: "/blog-posts",
                //     create: "/blog-posts/create",
                //     edit: "/blog-posts/edit/:id",
                //     show: "/blog-posts/show/:id",
                //     meta: {
                //       canDelete: true,
                //     },
                //   },
                //   {
                //     name: "categories",
                //     list: "/categories",
                //     create: "/categories/create",
                //     edit: "/categories/edit/:id",
                //     show: "/categories/show/:id",
                //     meta: {
                //       canDelete: true,
                //     },
                //   },
                // ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "bkCp2l-nuMOBO-FrXjcd",
                  liveMode: "auto",
                }}>
                <Routes>
              <Route path="/register" element ={<Register/>}/>
               <Route path="/login" element ={<Login/>}/>
              <Route path="/forgot-password" element ={<ForgotPassword/>}/>
              <Route element ={<Authenticated 
              key ="authenticated-layout" 
                fallback ={<CatchAllNavigate  to ="/login" /> }> 
                      <Layout>
                        <Outlet/>
                      </Layout>
                    </Authenticated> }>

                  <Route index element ={<Home/>}/>
                  <Route path ="/companies">
                  <Route index element={<CompanyListPage/>}/>
                  <Route path ="new" element = {<CreateCompany/>}/>
                  <Route path="edit/:id" element = {<CompanyEdit/>}/>
                  </Route>
                  <Route path = "/tasks"  element ={<List>
                         <Outlet/>
                  </List>
                }>
               </Route>
               <Route path = "new" element = {<CreateTask/>}/>
               <Route path = "edit/:id" element = {<EditTask/>}/>
                    </Route>
                       {/* <Route
                    element={
  <Authenticated key="authenticated-inner"
  fallback={<CatchAllNavigate to="/login" />}>
                        <ThemedLayoutV2
                          Header={Header}
                          Sider={(props) => <ThemedSiderV2 {...props} fixed />}
                        >
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                  
                    <Route
                      index
                      element={<NavigateToResource resource="blog_posts" />}
                    />

                
                  {/* <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                      path="/forgot-password"
                      element={<ForgotPassword />}
                    />
                  </Route>  */}
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        {/* </ColorModeContextProvider> */}
      </RefineKbarProvider> 
    </BrowserRouter>
  );
}

export default App;
