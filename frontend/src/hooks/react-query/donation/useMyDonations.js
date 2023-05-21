import { useQuery } from 'react-query';
import DonationApi from '../../../api/DonationApi';

export const MyDonationsQueryKey = 'MyDonations';

export function useMyDonations(params) {
    return useQuery(
        [MyDonationsQueryKey, params],
        () => DonationApi.getDonationsAsync({
            ...params,
            expandManageByUser:'true',
            myDonations:'true',
            expandDonationItems: "true"
        }),
        {
            enabled:false
        }
    )
}