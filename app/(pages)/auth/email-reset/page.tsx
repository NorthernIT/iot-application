import EmailVerification from '@/components/EmailVerification';
import React from 'react';
import { Suspense } from 'react';

const EmailResetPage = () => {
    return (
        <main className="" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Suspense>
                <EmailVerification/>
            </Suspense>
        </main>
    )
}

export default EmailResetPage