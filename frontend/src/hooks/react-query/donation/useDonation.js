import { useQuery } from 'react-query';
import DonationApi from '../../../api/DonationApi';

export const DonationQueryKey = 'Donation';

export function useDonation(id, params) {
    return useQuery(
        [DonationQueryKey, id, params],
        () => DonationApi.getDonationAsync(id,params),
        {
            enabled:false
        }
    )
}