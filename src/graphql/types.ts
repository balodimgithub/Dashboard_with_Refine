export type UpdateUserMutationVariables = Exact<{
  input: UpdateOneUserInput;
}>;

export type UpdateUserMutation = {
  updateOneUser: {
    id: string;
    name: string;
    avatarUrl?: string | null;
    email: string;
    phone?: string | null;
    jobTitle?: string | null;
  };
};

export type CreateCompanyMutationVariables = Exact<{
  input: CreateOneCompanyInput;
}>;

export type CreateCompanyMutation = {
  createOneCompany: { id: string; salesOwner: { id: string } };
};

export type UpdateCompanyMutationVariables = Exact<{
  input: UpdateOneCompanyInput;
}>;

export type UpdateCompanyMutation = {
  updateOneCompany: {
    id: string;
    name: string;
    totalRevenue?: number | null;
    industry?: Industry | null;
    companySize?: CompanySize | null;
    businessType?: BusinessType | null;
    country?: string | null;
    website?: string | null;
    avatarUrl?: string | null;
    salesOwner: { id: string; name: string; avatarUrl?: string | null };
  };
};

export type UpdateTaskMutationVariables = Exact<{
  input: UpdateOneTaskInput;
}>;

export type UpdateTaskMutation = {
  updateOneTask: {
    id: string;
    title: string;
    completed: boolean;
    description?: string | null;
    dueDate?: any | null;
    stage?: { id: string; title: string } | null;
    users: Array<{ id: string; name: string; avatarUrl?: string | null }>;
    checklist: Array<{ title: string; checked: boolean }>;
  };
};

export type UpdateTaskStageMutationVariables = Exact<{
  input: UpdateOneTaskInput;
}>;

export type UpdateTaskStageMutation = { updateOneTask: { id: string } };

export type DashboardTotalCountsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type DashboardTotalCountsQuery = {
  companies: { totalCount: number };
  contacts: { totalCount: number };
  deals: { totalCount: number };
};

export type DashboardCalendarUpcomingEventsQueryVariables = Exact<{
  filter: EventFilter;
  sorting?: InputMaybe<Array<EventSort> | EventSort>;
  paging: OffsetPaging;
}>;

export type DashboardCalendarUpcomingEventsQuery = {
  events: {
    totalCount: number;
    nodes: Array<{
      id: string;
      title: string;
      color: string;
      startDate: any;
      endDate: any;
    }>;
  };
};

export type DashboardDealChartQueryVariables = Exact<{
  filter: DealStageFilter;
  sorting?: InputMaybe<Array<DealStageSort> | DealStageSort>;
  paging?: InputMaybe<OffsetPaging>;
}>;

export type DashboardDealChartQuery = {
  dealStages: {
    totalCount: number;
    nodes: Array<{
      id: string;
      title: string;
      dealsAggregate: Array<{
        groupBy?: {
          closeDateMonth?: number | null;
          closeDateYear?: number | null;
        } | null;
        sum?: { value?: number | null } | null;
      }>;
    }>;
  };
};

export type DashboardLatestActivitiesDealsQueryVariables = Exact<{
  filter: DealFilter;
  sorting?: InputMaybe<Array<DealSort> | DealSort>;
  paging?: InputMaybe<OffsetPaging>;
}>;

export type DashboardLatestActivitiesDealsQuery = {
  deals: {
    totalCount: number;
    nodes: Array<{
      id: string;
      title: string;
      createdAt: any;
      stage?: { id: string; title: string } | null;
      company: { id: string; name: string; avatarUrl?: string | null };
    }>;
  };
};

export type DashboardLatestActivitiesAuditsQueryVariables = Exact<{
  filter: AuditFilter;
  sorting?: InputMaybe<Array<AuditSort> | AuditSort>;
  paging: OffsetPaging;
}>;

export type DashboardLatestActivitiesAuditsQuery = {
  audits: {
    totalCount: number;
    nodes: Array<{
      id: string;
      action: string;
      targetEntity: string;
      targetId: number;
      createdAt: any;
      changes: Array<{
        field: string;
        from?: string | null;
        to?: string | null;
      }>;
      user?: { id: string; name: string; avatarUrl?: string | null } | null;
    }>;
  };
};

export type CompanyListQueryQueryVariables = Exact<{
  filter?: InputMaybe<CompanyFilter>;
  sorting?: InputMaybe<Array<CompanySort> | CompanySort>;
  paging: OffsetPaging;
}>;

export type CompanyListQueryQuery = {
  companies: {
    totalCount: number;
    nodes: Array<{
      id: string;
      name: string;
      avatarUrl?: string | null;
      dealsAggregate: Array<{ sum?: { value?: number | null } | null }>;
    }>;
  };
};

export type UsersSelectQueryVariables = Exact<{
  filter?: InputMaybe<UserFilter>;
  sorting?: InputMaybe<Array<UserSort> | UserSort>;
  paging: OffsetPaging;
}>;

export type UsersSelectQuery = {
  users: {
    totalCount: number;
    nodes: Array<{ id: string; name: string; avatarUrl?: string | null }>;
  };
};

export type CompanyContactsTableQueryVariables = Exact<{
  filter?: InputMaybe<ContactFilter>;
  sorting?: InputMaybe<Array<ContactSort> | ContactSort>;
  paging: OffsetPaging;
}>;

export type CompanyContactsTableQuery = {
  contacts: {
    totalCount: number;
    nodes: Array<{
      id: string;
      name: string;
      avatarUrl?: string | null;
      jobTitle?: string | null;
      email: string;
      phone?: string | null;
      status: ContactStatus;
    }>;
  };
};

export type TaskStagesQueryVariables = Exact<{
  filter?: InputMaybe<TaskStageFilter>;
  sorting?: InputMaybe<Array<TaskStageSort> | TaskStageSort>;
  paging: OffsetPaging;
}>;

export type TaskStagesQuery = {
  taskStages: {
    totalCount: number;
    nodes: Array<{ id: string; title: string }>;
  };
};

export type TasksQueryVariables = Exact<{
  filter?: InputMaybe<TaskFilter>;
  sorting?: InputMaybe<Array<TaskSort> | TaskSort>;
  paging: OffsetPaging;
}>;

export type TasksQuery = {
  tasks: {
    totalCount: number;
    nodes: Array<{
      id: string;
      title: string;
      description?: string | null;
      dueDate?: any | null;
      completed: boolean;
      stageId?: string | null;
      createdAt: any;
      updatedAt: any;
      users: Array<{ id: string; name: string; avatarUrl?: string | null }>;
    }>;
  };
};

export type TaskStageSelectQueryVariables = Exact<{
  filter?: InputMaybe<TaskStageFilter>;
  sorting?: InputMaybe<Array<TaskStageSort> | TaskStageSort>;
  paging: OffsetPaging;
}>;

export type TaskStageSelectQuery = {
  taskStages: {
    totalCount: number;
    nodes: Array<{ id: string; title: string }>;
  };
};
