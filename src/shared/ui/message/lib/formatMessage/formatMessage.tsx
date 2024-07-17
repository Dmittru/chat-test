'use client'
import React from 'react';
import './format-message.scss'

export function formatMessage(text: string, onClick: (mention: string) => void): React.ReactNode {
    const parts = text.split(/(@\w+)/g);
    return parts.map((part, index) => {
        if (part.startsWith('@')) {
            return (
                <span
                    key={`${index}${part}`}
                    onClick={() => onClick(part)}
                    className={'formatted-message'}
                >
                    {part}
                </span>
            );
        }
        return part;
    });
}
