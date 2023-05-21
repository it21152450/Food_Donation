import { useQuery } from 'react-query';
import ProductApi from '../../../api/ProductApi';

export const ProductsQueryKey = 'Products';

export function useProducts(params) {
    return useQuery(
        [ProductsQueryKey, params],
        () => ProductApi.getProductsAsync(params),
        {
            enabled:false
        }
    )
}