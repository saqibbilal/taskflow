'use client';

import {deleteProject} from '@/app/actions';

interface Props {
    projectId: number;
    projectName: string;
}

export default function DeleteProjectButton({projectId, projectName}: Props) {
    const handleDelete = async () => {
        // browser-native confirmation
        const confirmed = confirm(`Are you sure you want to delete "${projectName}"? This will remove all associated tasks.`);

        if (confirmed) {
            await deleteProject(projectId);
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="text-xs text-slate-400 hover:text-red-500 transition-colors font-medium px-2 py-1 rounded hover:bg-red-50"
            title="Delete Project"
        >
            Delete Project
        </button>
    );
}