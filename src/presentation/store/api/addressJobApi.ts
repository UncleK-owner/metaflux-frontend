import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AddressJobData } from '../../../domain';

export const addressJobApi = createApi({
  reducerPath: 'addressJobApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }), // Replace with your actual base URL
  endpoints: (builder) => ({
    getAllAddressJobs: builder.query<AddressJobData[], void>({
      query: () => 'addressJobs', // Replace with your actual API endpoint
      // Simulate a delay for the API request
      async onCacheEntryAdded(
        arg,
        { cacheDataLoaded, cacheEntryRemoved, dispatch }
      ) {
        try {
          // wait for the `cacheDataLoaded` promise to resolve
          await cacheDataLoaded;
          await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (error) {
          console.log('Cache was not loaded or data was removed');
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved;
      },
      transformResponse: (response: any) => {
        // Simulate a response from the API
        return [
          {
            id: '1',
            jobName: 'Job 1',
            address: 'Address 1',
            description: 'Description 1',
          },
          {
            id: '2',
            jobName: 'Job 2',
            address: 'Address 2',
            description: 'Description 2',
          },
          {
            id: '3',
            jobName: 'Job 3',
            address: 'Address 3',
            description: 'Description 3',
          },
        ] as AddressJobData[];
      },
    }),
    getAddressJobById: builder.query<AddressJobData, string>({
      query: (id) => `addressJobs/${id}`, // Replace with your actual API endpoint
      // Simulate a delay for the API request
      async onCacheEntryAdded(
        arg,
        { cacheDataLoaded, cacheEntryRemoved, dispatch }
      ) {
        try {
          // wait for the `cacheDataLoaded` promise to resolve
          await cacheDataLoaded;
          await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (error) {
          console.log('Cache was not loaded or data was removed');
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved;
      },
      transformResponse: (response: any) => {
        // Simulate a response from the API
        return {
          id: '1',
          jobName: 'Job 1',
          address: 'Address 1',
          description: 'Description 1',
        } as AddressJobData;
      },
    }),
  }),
});

export const { useGetAllAddressJobsQuery, useGetAddressJobByIdQuery } =
  addressJobApi;