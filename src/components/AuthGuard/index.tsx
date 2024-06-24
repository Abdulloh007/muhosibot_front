'use client';

import { setCashbox } from "@/lib/features/cashboxSlice";
import { setOrganisation } from "@/lib/features/organisationSlice";
import { setPaymentAccount } from "@/lib/features/paymentAccountSlice";
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
                dispatch(setOrganisation(res.data.primary_organization))
                dispatch(setPaymentAccount(res.data.payment_accounts[0]))
                dispatch(setCashbox(res.data.cashboxes[0]))
                setIsLoading(false)
            }, (error) => {
                if (error.code === "ERR_BAD_REQUEST" ) {
                    push('/auth');
                    dispatch(logout())
                }
            })

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