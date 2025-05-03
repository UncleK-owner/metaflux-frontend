import { useGetAllAddressJobsQuery, useGetAddressJobByIdQuery } from '../api/addressJobApi';

export const useAddressJobHooks = () => {
  const {
    data: allAddressJobs,
    isLoading: isGetAllAddressJobsLoading,
    isError: isGetAllAddressJobsError,
    error: getAllAddressJobsError,
    refetch: refetchAllAddressJobs,
  } = useGetAllAddressJobsQuery();

  const getAddressJobById = (id: string) => {
    const {
      data: addressJob,
      isLoading: isGetAddressJobByIdLoading,
      isError: isGetAddressJobByIdError,
      error: getAddressJobByIdError,
      refetch: refetchGetAddressJobById,
    } = useGetAddressJobByIdQuery(id);
    return {
      addressJob,
      isGetAddressJobByIdLoading,
      isGetAddressJobByIdError,
      getAddressJobByIdError,
      refetchGetAddressJobById,
    };
  };

  return {
    allAddressJobs,
    isGetAllAddressJobsLoading,
    isGetAllAddressJobsError,
    getAllAddressJobsError,
    refetchAllAddressJobs,
    getAddressJobById,
  };
};