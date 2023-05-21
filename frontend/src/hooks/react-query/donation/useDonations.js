import { useQuery } from 'react-query';
import DonationApi from '../../../api/DonationApi';

export const DonationsQueryKey = 'Donations';

export function useDonations(params) {
    return useQuery(
        [DonationsQueryKey, params],
        () => DonationApi.getDonationsAsync({
            ...params,
            expandManageByUser:'true',
            expandDonationItems: "true"
        }),
        {
            enabled:false
        }
    )
}