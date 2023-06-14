'use client';
import { useState } from 'react';

export default function ViewCounter() {
    const [view, setView] = useState(123);

    return (
        <p>This website has been watched {view} times ✨</p>
    )
}