import { JobDTO, SubItemDTO } from "../api/jobs";

export interface TableRow extends Omit<JobDTO, 'subItems'> {
    isSubItem: boolean
    subItem?: SubItemDTO
}

export const flattenSubItems = (jobs: JobDTO[]): TableRow[] => {
    const rows = jobs.reduce<TableRow[]>((prev, curr) => {

        const subItemRows = curr.subItems.map(item => ({
            ...curr,
            subItem: { ...item },
            isSubItem: true
        }));

        return [...prev, { ...curr, isSubItem: false }, ...subItemRows];
    }, [])

    return rows;
}


export const getStatusColour = (status: string) => {
    switch (status) {
        case "Pending":
            return "orange";
        case "Completed":
            return "green";
        case "InProgress":
            return "yellow"
        default:
            return ''
    }
}