import { RecipientRemoteDataSource } from './RecipientRemoteDataSource';
import { Recipient } from '../../../domain/entities/RecipientData';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('RecipientRemoteDataSource', () => {
  let dataSource: RecipientRemoteDataSource; // Added semicolon here

  beforeEach(() => {
    // Reset fetch mock before each test
    fetchMock.resetMocks();
    dataSource = new RecipientRemoteDataSource();
  });

  test('should fetch recipients successfully', async () => {
    const dummyRecipients: Recipient[] = [
      { id: '1', name: 'Test Recipient 1' },
      { id: '2', name: 'Test Recipient 2' },
    ];

    // Mock the successful API response with a 'data' field
    fetchMock.mockResponseOnce(JSON.stringify({ data: dummyRecipients }), { status: 200 });

    const recipients = await dataSource.fetchRecipients();

    // Assert that the fetch function was called with the correct URL and headers
    expect(fetchMock).toHaveBeenCalledWith(
      'https://starkapin.duckdns.org/directus/items/address_normailize_job_failed_recipients',
      {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer GAgVtFNmNoAdyH3BQK3OZcBRaMGvQvxt',
          'Content-Type': 'application/json',
        },
      }
    );

    // Assert that the correct data was returned
    expect(recipients).toEqual(dummyRecipients);
  });

  test('should throw an error if the API response is not ok', async () => {
    // Mock an unsuccessful API response (e.g., 401 Unauthorized)
    fetchMock.mockResponseOnce('Unauthorized', { status: 401 });

    await expect(dataSource.fetchRecipients()).rejects.toThrow('HTTP error! status: 401, body: Unauthorized');

    // Assert that the fetch function was still called
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  test('should throw an error if the API response format is invalid (missing data field)', async () => {
    // Mock a successful API response with invalid data format (missing 'data' field)
    fetchMock.mockResponseOnce(JSON.stringify({ recipients: [] }), { status: 200 });

    await expect(dataSource.fetchRecipients()).rejects.toThrow('Invalid API response format: \'data\' array not found.');

    // Assert that the fetch function was still called
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  test('should throw an error on network error', async () => {
    const networkError = new Error('Failed to fetch');
    fetchMock.mockReject(networkError);

    await expect(dataSource.fetchRecipients()).rejects.toThrow('Network error: Failed to fetch');

    // Assert that the fetch function was still called
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

});