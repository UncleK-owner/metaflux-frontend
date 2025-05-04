import { AddressJobData } from 'domain/entities/AddressJobData';
import { addressJobApi, useGetAllAddressJobsQuery, useGetAddressJobByIdQuery, useCreateAddressJobMutation, useUpdateAddressJobMutation, useDeleteAddressJobMutation } from '../../data/datasources/api/addressJobApi';

export const useAddressJobHooks = () => {
  const { data: allAddressJobs, isLoading: isGetAllAddressJobsLoading, isError: isGetAllAddressJobsError, error: getAllAddressJobsError, refetch: refetchAllAddressJobs } = useGetAllAddressJobsQuery();
  const [createAddressJob, { isLoading: isCreateAddressJobLoading, isError: isCreateAddressJobError, error: createAddressJobError }] = useCreateAddressJobMutation();
  const [updateAddressJob, { isLoading: isUpdateAddressJobLoading, isError: isUpdateAddressJobError, error: updateAddressJobError }] = useUpdateAddressJobMutation();
  const [deleteAddressJob, { isLoading: isDeleteAddressJobLoading, isError: isDeleteAddressJobError, error: deleteAddressJobError }] = useDeleteAddressJobMutation();
  const getAddressJobById = (id: string) => {    
      const { data: addressJob, isLoading: isGetAddressJobByIdLoading, isError: isGetAddressJobByIdError, error: getAddressJobByIdError, refetch: refetchGetAddressJobById } = useGetAddressJobByIdQuery(id);
    return {
      addressJob,
      isGetAddressJobByIdLoading,
      isGetAddressJobByIdError,
      getAddressJobByIdError,
      refetchGetAddressJobById
    };
  };
  const create = async(data:AddressJobData) => {
    return await createAddressJob(data).unwrap();
  }
  const update = async(data:AddressJobData) => {
    return await updateAddressJob(data).unwrap();
  }
  const deleteById = async(id:string) => {
    return await deleteAddressJob(id).unwrap();
  }
  return {
    allAddressJobs,
    isGetAllAddressJobsLoading,
    isGetAllAddressJobsError,
    getAllAddressJobsError,
    refetchAllAddressJobs,
    getAddressJobById,
    create,
    isCreateAddressJobLoading,
    isCreateAddressJobError,
    createAddressJobError,
    update,
    isUpdateAddressJobLoading,
    isUpdateAddressJobError,
    updateAddressJobError,
    deleteById,
    isDeleteAddressJobLoading,
    isDeleteAddressJobError,
    deleteAddressJobError,
  };
};
