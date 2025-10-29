import gql from "graphql-tag";

//Query to get Total Company, Conatct and Deal Counts
export const DASHBOARD_TOTAL_COUNTS_QUERY = gql`
query DashboardTotalCounts {
companies {
totalCount
}
contacts{
totalCount
}
deals {
totalCount
}

}`;

//Query to get Incoming events
export const DASHBOARD_CALENDAR_UPCOMINNG_EVENTS_QUERY = gql`
   query DashboardCalendarUpcomingEvents(
   $filter  : EventFilter!
   $sorting : [EventSort!]
   $paging : OffsetPaging!
   ){
   events(filter: $filter, sorting : $sorting, paging : $paging ){
   totalCount 
   nodes{
   id 
   title
   color
   startDate
   endDate
   }
   }
   }
`;

//Query to get deal chart
export const DASHBOARD_DEALS_CHART_QUERY = gql`
query  DashboardDealChart(
$filter : DealStageFilter!
$sorting : [DealStageSort!]
$paging : OffsetPaging
){
dealStages(filter : $filter,
 sorting : $sorting, paging : $paging){
# Get the total deal Stages
nodes{
id
title

# Get the sum of all deals in this stage and group by closeDateMonth and closeDateYear
dealsAggregate {
groupBy {
closeDateMonth
closeDateYear
}
sum {
value
}
}
}
 # Get the toal count of al deals in this stage
 totalCount
}
}
`;
// Query to get latest activity deals
export const DASHBOARD_LATEST_ACTIVITES_DEALS_QUERY = gql`
 query DashboardLatestActivitiesDeals(
 $filter : DealFilter!
 $sorting : [DealSort!]
 $paging : OffsetPaging
 ){
 deals(filter : $filter, sorting : $sorting, paging : $paging){
 totalCount 
 nodes{
 id 
 title
 stage{
 id
  title
  }
  company{
  id
  name
  avatarUrl
  }
  createdAt
 }
 }
 }
`;

//Query to get the latest activities audits
export const DASHBOARD_LATEST_ACTIVITES_AUDITS_QUERY = gql`
query  dashboardLatestActivitiesAudits(
 $filter : AuditFilter!
 $sorting : [AuditSort!]
 $paging : OffsetPaging!
){
 audits(filter : $filter, sorting : $sorting, paging : $paging){
   totalCount
   nodes{
   id
   action
   targetEntity
   targetId
   changes {
   field
   from 
   to
   }
   createdAt
   user{
   id
   name
   avatarUrl
   }
   }}
 }
 
`;

export const  COMPANY_LIST_QUERY = gql`
query  companyListQuery(
$filter : CompanyFilter
$sorting : [CompanySort!]
$paging : OffsetPaging!
){
companies(filter : $filter, sorting : $sorting, paging : $paging ){
totalCount # Get the total number of Companies
nodes{
id
name
avatarUrl
# Get the sum of all deals in this company
dealsAggregate {
sum  {
  value
}}
}

}
}
`
//Query to get users list
export const USERS_SELECT_QUERY = gql`
query  UsersSelect(
$filter : UserFilter
$sorting : [UserSort!]
$paging : OffsetPaging! 
){
users(filter : $filter, sorting : $sorting, paging :$paging){
totalCount # Get the total count of users
#Get specific fields for each user
nodes{
id
name
avatarUrl
}
}
}
`;
//Query to get the contacts associated with a company
export const COMPANY_CONTACT_TABLE_QUERY = gql`
query  companyContactsTable(
$filter : ContactFilter
$sorting : [ContactSort!]
$paging : OffsetPaging!
){
contacts(filter: $filter, sorting : $sorting, paging : $paging){
totalCount
nodes{
id
name
avatarUrl
jobTitle
email
phone
status
}
}
}
`;

//Query to get task stages list
export const TASK_STAGES_QUERY = gql`
query TaskStages(
$filter : TaskStageFilter
$sorting : [TaskStageSort!]
$paging : OffsetPaging!
){
taskStages(filter : $filter, sorting : $sorting, paging : $paging){
  totalCount # Get the total Count of the task stages
  nodes{
  id
  title
}
  
}
}
`;

//Query to get task list
export const TASKS_QUERY = gql`
query Tasks(
$filter : TaskFilter
$sorting : [TaskSort!]
$paging : OffsetPaging! ){
tasks(filter : $filter, sorting : $sorting, paging : $paging ){
totalCount # Get the total count of tasks
nodes{
id
title
description
dueDate
completed
stageId
# Get  users details associated with this task
users{
id
name
avatarUrl}
createdAt
updatedAt
}
}
}
`;

//Query to get task stages for select
export const TASK_STAGES_SELECT_QUERY = gql`
query  TaskStageSelect(
$filter : TaskStageFilter,
$sorting : [TaskStageSort!],
$paging: OffsetPaging!
){
taskStages(filter : $filter, sorting : $sorting, paging : $paging){
totalCount
nodes{
id
title
}
}
}
`;















