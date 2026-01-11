'use client';
import { useFormStatus } from 'react-dom';

export function SubmitButton() {
    // This hook "listens" to the parent form
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className={`text-sm font-bold transition-colors ${
                pending ? 'text-slate-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-800'
            }`}
        >
            {pending ? 'Adding...' : 'Add'}
        </button>
    );
}