'use client';

import { checkToken, logout, setUser } from "@/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';
type Props = {
    children?: React.ReactNode;
};


function AuthGuard({children}: Props) {
    const dispatch = useAppDispatch();
    const { push } = useRouter();

    const token = useAppSelector(state => state.profile.token);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        dispatch(checkToken());
        if (!localStorage.getItem(btoa('token'))) {
            push('/auth');
            // will explain this in a moment
            dispatch(logout());
        } else {

            axios.get('/api/me', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem(btoa('token'))
                }
            }).then((res: any) => {
                dispatch(setUser(res.data));
                setIsLoading(false)
            }, (error) => error.code === "ERR_BAD_REQUEST" ? dispatch(logout()) : null)

        }
    }, [token, push]);

    if (isLoading) {
        return (
            <div className='flex w-screen h-screen items-center justify-center'>
                <div className="loader"></div>
            </div>
        );
    }

    return children;
}

export default AuthGuard;