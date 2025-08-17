import { useQuery } from '@tanstack/react-query';
import { api, Region, RegionData } from '../lib/api';

export const useRegions = () => {
    return useQuery({
        queryKey: ['regions'],
        queryFn: () => api.get<Region[]>('/regions/').then(res => res.data),
        staleTime: 5 * 60 * 1000, // 5 minutos
    });
};

export const useRegionData = (regionId: string | null) => {
    return useQuery({
        queryKey: ['region', regionId],
        queryFn: () => api.get<RegionData>(`/regions/${regionId}/`).then(res => res.data),
        enabled: !!regionId,
        staleTime: 2 * 60 * 1000, // 2 minutos
    });
};

export const useRegionSummary = (regionId: string | null) => {
    return useQuery({
        queryKey: ['region-summary', regionId],
        queryFn: () => api.get(`/regions/${regionId}/summary/`).then(res => res.data),
        enabled: !!regionId,
        staleTime: 5 * 60 * 1000, // 5 minutos
    });
}; 