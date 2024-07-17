import React from 'react';
import './chat-error.scss'
import Link from "next/link";

export const ChatError = () => {
    return (
        <div className={'fullfilled flex-center error-container'}>
            <p className={'error-container__error-message'}>
                This chat isn&apos;t exist, or you are not a member
            </p>
            <Link
                href={'/chat'}
                className={'error-container__link'}
            >
                Go back
            </Link>
        </div>
    );
};