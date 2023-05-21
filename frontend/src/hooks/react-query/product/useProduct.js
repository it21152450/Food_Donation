import { useQuery } from 'react-query';
import ProductApi from '../../../api/ProductApi';

export const ProductQueryKey = 'Product';

export function useProduct(id, params) {
    return useQuery(
        [ProductQueryKey, id, params],
        () => ProductApi.getProductAsync(id,params),
        {
            enabled:false
        }
    )
}