import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import * as authService from "./auth.service";

export const useRegister = () => {
    return useMutation({
        mutationFn: (userData) => authService.register(userData),
        onSuccess: (data) => {
            console.log("Registered successfully", data);
        },
    });
};

export const useLogin = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (credentials) => authService.logIn(credentials),
        onSuccess: (userData) => {
            queryClient.setQueryData(["user"], userData);
        },
    });
};

export const useLogout = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: authService.logOut,
        onSuccess: () => {
            queryClient.removeQueries(["user"]);
        },
    });
};

export const useRefresh = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: authService.refresh,
        retry: false, 
        refetchOnWindowFocus: false,
    });
};