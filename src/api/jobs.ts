import axios from 'axios';
import { UseQueryOptions } from 'react-query';

export interface JobDTO {
  id: string;
  title: string;
  description: string;
  subItems: SubItemDTO[];
}

export interface SubItemDTO {
  itemId: string;
  jobId: string;
  title: string;
  description: string;
  status: string;
}

const GetJobsKey = 'GetJobs';

export const getJobs = (url: string | undefined, config?: UseQueryOptions<JobDTO[]>) => ({
  queryKey: GetJobsKey,
  queryFn: async () => {
    const { data } = await axios.get<JobDTO[]>(
      `${url}/api/jobs`
    );
    return data;
  },
  ...config,
});
